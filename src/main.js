// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (navToggle && mobileNav) {
  const closeNav = () => {
    mobileNav.classList.add('hidden');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  };
  navToggle.addEventListener('click', () => {
    const isHidden = mobileNav.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', String(!isHidden));
    document.body.classList.toggle('overflow-hidden', !isHidden);
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

// Sticky nav appearance on scroll past hero
const nav = document.getElementById('site-nav');
if (nav) {
  const stickyClasses = ['bg-ink-900/95', 'backdrop-blur', 'border-b', 'border-ink-line', 'shadow-lg', 'shadow-black/30'];
  const updateNav = () => {
    if (window.scrollY > 80) {
      nav.classList.add(...stickyClasses);
    } else {
      nav.classList.remove(...stickyClasses);
    }
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// Copy-to-clipboard for the account number
const copyBtn = document.getElementById('copy-account');
const copyTarget = document.getElementById('account-number');
if (copyBtn && copyTarget) {
  const label = copyBtn.querySelector('.copy-label');
  copyBtn.addEventListener('click', async () => {
    const text = copyTarget.textContent.trim().replace(/\s+/g, '');
    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        success = document.execCommand('copy');
      } catch (_) {}
      document.body.removeChild(ta);
    }
    if (success && label) {
      const original = label.textContent;
      label.textContent = 'Copied!';
      copyBtn.classList.add('text-gold-soft');
      setTimeout(() => {
        label.textContent = original;
        copyBtn.classList.remove('text-gold-soft');
      }, 1800);
    }
  });
}

// Animate the progress bar on scroll-into-view
const progressBar = document.getElementById('progress-fill');
if (progressBar) {
  const targetPct = progressBar.dataset.percent || '13.3';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBar.style.width = targetPct + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(progressBar);
}

// Reveal-on-scroll for elements with [data-reveal]
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700', 'ease-out');
    revealObs.observe(el);
  });
}

// Vision videos: autoplay on scroll-into-view, pause when out, tap to toggle
const visionVideos = document.querySelectorAll('video[data-vision-video]');
if (visionVideos.length) {
  const tryPlay = (v) => {
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked — keep poster */ });
  };

  const updateHint = (v) => {
    const frame = v.closest('[data-video-frame]');
    const hint = frame && frame.querySelector('[data-play-hint]');
    if (hint) hint.style.opacity = v.paused ? '1' : '0';
  };

  visionVideos.forEach((v) => {
    updateHint(v);
    v.addEventListener('play', () => updateHint(v));
    v.addEventListener('pause', () => updateHint(v));

    const frame = v.closest('[data-video-frame]');
    if (frame) {
      frame.addEventListener('click', () => {
        if (v.paused) tryPlay(v);
        else v.pause();
      });
    }
  });

  if ('IntersectionObserver' in window) {
    const visionObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) tryPlay(entry.target);
        else entry.target.pause();
      });
    }, { threshold: 0.35 });
    visionVideos.forEach((v) => visionObs.observe(v));
  }

  // Don't keep playing on hidden tabs
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) visionVideos.forEach((v) => v.pause());
  });
}

// Current year in footer
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

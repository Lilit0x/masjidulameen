# Masjidul Ameen — Landing Page

Static landing page for [masjidulameen.com](https://masjidulameen.com) — a fundraising and information site for **Masjidul Ameen, Osogbo, Nigeria**.

## Stack

- Plain HTML (`index.html`) — single-page site.
- Tailwind CSS (CLI build) — compiled to `dist/style.css`.
- Vanilla JavaScript (`src/main.js`) — sticky nav, copy-to-clipboard, scroll reveals.
- No framework, no server, no database.

## Local development

```sh
npm install
npm run dev      # watch-build Tailwind into dist/style.css
npm run serve    # serve the site at http://localhost:8080
```

Open `http://localhost:8080` in a browser.

## Production build

```sh
npm run build   
```

Then upload `index.html`, `dist/`, `src/main.js`, `public/`, and `images/` to any static host. The site is fully static.

## Deployment (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `/` (project root)
- Node version: 20

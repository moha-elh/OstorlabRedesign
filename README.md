# Ostorlab landing page redesign

The confirmed design for the new ostorlab.co landing page, and the guide for building it.

- `design/reference/index.html` — the confirmed design, working, at 1440px. Open it in a browser.
- `design/screenshots/` — full page and one screenshot per section.
- `IMPLEMENTATION.md` — how to build each section to match, and how to commit.

Stack: Next.js (App Router) + TypeScript, CSS Modules, CSS custom properties for tokens.

- `app/` — layout (font, global styles, tokens) and the page.
- `components/` — one component per section (`Hero`, `FreeScan`, …), each with its own `.module.css`.
- `public/assets/` — images copied from `design/reference/assets/`, same names.

Run: `npm install`, then `npm run dev` (http://localhost:3000). Production: `npm run build && npm start`.

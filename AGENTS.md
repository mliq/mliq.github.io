# Agent Guide (Up‑to‑Date)

Last updated: 2025-08-14 · See also: PRD.md (product requirements), TODO.md (live backlog)

Purpose: Keep this static portfolio tight, fast, and accessible. Iterate by rendering the site locally, capturing review artifacts, and updating `TODO.md` as the single source of work.

Iteration loop
- Open `index.html` with Playwright MCP at `file:///Users/mliquori/mliq.github.io/index.html`.
- Capture full‑page screenshots at common breakpoints to `artifacts/` (e.g., 375×812, 768×1024, 1280×800, 1440×900).
- Compare against `PRD.md` (acceptance criteria) and `TODO.md`; tighten copy, a11y, and visuals.
- Update `TODO.md`: check off verified items, add new ones, and remove completed ones.

Current state snapshot (post cd5086fa)
- Theme: Dark, editor‑inspired palette authored in plain CSS (`public/styles/site.css`). No SCSS build step is active.
- Markup: Semantic `header`/`main`/`section`/`footer`; one `<h1>`; section `<h2>`s; skip link present.
- Navigation: IntersectionObserver sets `aria-current="page"` for “Projects” when in view.
- Media: All images include descriptive `alt`, explicit `width`/`height`, and `loading="lazy"` (non‑hero).
- IA: Project order is AI Enablement, Flambé/HVG, Petfinder, CaringBridge, 3M, Predictor.
- Assets: Review screenshots live under `artifacts/`.
- Note: `#contact` currently sits outside `<main>`; see TODO to relocate for landmark consistency.

What changed since cd5086fa72f9c4a32cc4f07f754a9e42b423e644
- Styles moved from SCSS (`public/styles/custom.scss`) to a single plain CSS file (`public/styles/site.css`).
- Build/watch are no‑ops; the site serves as static HTML/CSS.
- Vendor theming (Bootswatch/Animate.css) is not referenced by `index.html`.
- Playwright capture workflow added, with artifacts checked into `artifacts/`.
- PRD still references SCSS and Bootswatch; defer alignment or update PRD to match the current CSS‑only approach.

Evergreen guidelines
- Verify visual quality across XS/SM/MD/LG after each change.
- Author styles in `public/styles/site.css` (plain CSS). Keep utilities small; respect `prefers-reduced-motion`.
- Maintain visible `:focus-visible` rings. Keep skip link focusable and high‑contrast.
- Prefer precise alt text; use empty `alt=""` for decorative images.
- Keep diffs small and targeted; don’t edit `public/vendor/*` unless intentionally updating from upstream.

Project structure
- `index.html`: Main page.
- `public/styles/site.css`: All site styles (single file).
- `public/img/`, `public/svg/`: Images and icons.
- `public/vendor/`: Bootswatch/Font Awesome/Animate (legacy; not currently used by `index.html`).
- `tests/`: Playwright specs for captures and social cards.
- `artifacts/`: Saved review screenshots.

Commands
- Install Playwright: `npm run playwright:install`
- Serve locally: `npm run serve` then open `http://localhost:8000` (or open `index.html` directly)
- E2E smoke (captures/social): `npm run test:e2e`
- Petfinder capture (desktop): `npm run capture:petfinder`
- Petfinder capture (mobile): `npm run capture:petfinder:mobile`
- Export Petfinder animated assets: `npm run webp:petfinder` or `npm run gif:petfinder`
- Bulk WebP conversion: `npm run webp:images`

Linkbacks
- Product requirements and acceptance criteria: see `PRD.md` (Accessibility & Performance, IA, Metadata).
- Backlog and current iteration scope: see `TODO.md`.

A11y & performance checks (quick pass each PR)
- One `<h1>`; each major section has an `<h2>` with `aria-labelledby` where applicable.
- Keyboard: visible focus on links/buttons/cards; skip link jumps to `#main`.
- Motion: hover lifts/zoom disabled under `prefers-reduced-motion`.
- Media: all non‑hero images have `loading="lazy"` and explicit `width`/`height`.
- Lighthouse (mobile): target ≥90 for Performance, A11y, Best Practices, SEO; compress images as needed.

Conventions
- HTML: semantic tags; attributes in double quotes; 4‑space indentation.
- CSS: small utilities; kebab‑case class names; keep selectors shallow.
- JS: minimal; place small helpers at the end of `index.html`.

PRs & commits
- Commits: short, imperative (e.g., `fix mobile viewport`, `add skip link`).
- PRs: include screenshots at two breakpoints and a brief verification checklist.

Security & assets
- No secrets; static site only. Use relative paths under `public/`.
- Optimize images before committing; prefer WebP where possible.

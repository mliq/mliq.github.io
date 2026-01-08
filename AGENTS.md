# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single-page site entrypoint; inline scripts live here.
- `public/styles/site.css` holds all styles, organized with section headers and CSS variables.
- `public/` stores assets (images, video, svg) used by the page.
- `tests/` contains Playwright specs (`*.spec.ts`) that validate layout, SEO, and accessibility.
- `scripts/` includes asset utilities like `ingest-video.js`; `playwright.config.ts` configures tests.

## Build, Test, and Development Commands
- `npm run serve`: run a local static server at `http://localhost:8000` (no build step required).
- `npm run test` or `npm run test:e2e`: execute Playwright tests against `index.html`.
- `npm run playwright:install`: install the Chromium browser used by Playwright.
- `npm run lh:run`: run Lighthouse on the local server; outputs to `artifacts/` (gitignored).
- `npm run video:assets`: regenerate poster and WebP assets from existing media.
- `node scripts/ingest-video.js /path/to/recording.mov`: ingest a new demo recording and update assets.

## Coding Style & Naming Conventions
- Use 4-space indentation in HTML and CSS; follow existing line wrapping for long attributes.
- Keep CSS grouped with section comments and variables defined at the top of the file.
- Name assets in lowercase kebab-case (matches `public/img` and `public/video` patterns).
- Keep changes minimal and readable; prefer plain HTML/CSS over new tooling.

## Testing Guidelines
- Framework: Playwright (`@playwright/test`) with desktop, mobile, and landscape projects.
- Test files live in `tests/` and use the `*.spec.ts` naming convention.
- Run tests for any layout, SEO, accessibility, or media updates.

## Commit & Pull Request Guidelines
- Commits are short and imperative; many use prefixes like `feat:` or `chore:`. Follow that style when possible.
- PRs should describe intent, impact, and any user-visible changes.
- Include before/after screenshots or videos for UI updates, and note test commands run.

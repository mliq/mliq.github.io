# Repository Guidelines

▌using the playwright MCP look at the page you have created at file:///Users/mliquori/mliq.github.io/index.html.using the playwright MCP look at the page you have created at file:///Users/mliquori/mliq.github.io/index.html. Deeply think about all the messiness and problems and how it doesn't match the PRD or TODO and rewrite those so we can iterate to perfection
▌Site Review & Iteration Plan

After reviewing index.html, here are the key mismatches and areas for improvement compared to the PRD and TODO:

1. Visual Revamp & IA
	- 'Work' heading lacks a distinctive W or custom font.
	- Project card spacing and animation affordances need refinement; may not match custom.scss or Animate.css.
	- Color scale tokens and accessible hover/focus states are missing.
	- IA improvements needed: reorder projects, add intro sentence, optimize resume link placement.

2. Petfinder Quiz Capture
	- GIF is not the main homepage image; video is WebM, not MP4/GIF as primary.
	- Cookie banner dismissal and form selection interaction are not shown in preview.
	- Caption for live link volatility is present.

3. Legacy Projects Restoration
	- Legacy projects listed, but demo links may be dead; concise cards/notes about Heroku are missing.

4. Resume Alignment
	- Resume link present, but themes and artifacts are not surfaced.

5. Content & Copy Polish
	- Summaries are concise, but alt text could be more descriptive.
	- Social links for Instagram/SoundCloud are placeholders.
	- Meta description and social cards are present.

6. Build, Tooling, and Quality Gates
	- No visible build/tooling info on page (should be in README).

7. Accessibility & Performance
	- Skip link present, but keyboard navigation, focus outlines, and reduced motion support need verification.
	- Image compression and Lighthouse scores are not visible.

Next Steps for Iteration:
- Update 'Work' heading with custom font and style.
- Refine project card layout, spacing, and add subtle animations.
- Implement color tokens and accessible states in CSS.
- Reorder projects and add a short intro sentence.
- Make GIF the main homepage image for Petfinder demo; show form interaction and cookie banner dismissal in preview.
- Curate legacy project cards, update links, and add Heroku notes.
- Surface resume themes and link to supporting artifacts.
- Improve alt text for all images.
- Add working social links for Instagram/SoundCloud.
- Verify accessibility features and optimize performance (Lighthouse, image compression).

Iterate on these areas to move the site toward PRD/TODO perfection.
This repository powers a lightweight, static site for mliq.github.io. Keep contributions simple, fast, and readable, with minimal dependencies and clear structure.

## Project Structure & Module Organization
- `index.html`: Main page and markup.
- `public/styles/custom.scss` ➜ compiled to `public/styles/custom.css`.
- `public/img/`, `public/svg/`: Images and icons.
- `public/vendor/`: Third‑party CSS/themes (Bootswatch “Readable”, Font Awesome, Animate.css). Avoid editing vendor files; update from upstream as needed.
- `package.json`: Scripts and dependencies.

## Build, Test, and Development Commands
- `npm install`: Install local dependencies.
- `npm run build`: Compile SCSS in `public/styles/` to CSS via Sass.
- `npx sass --watch public/styles`: Optional watch mode during development.
- `python3 -m http.server`: Serve the repo locally at `http://localhost:8000/` (or open `index.html` directly).

## Coding Style & Naming Conventions
- **Indentation**: 4 spaces for HTML/SCSS (match existing files).
- **CSS/SCSS**: Use variables (see `custom.scss`), limit nesting to 1–2 levels, prefer small utility classes. Class names in kebab-case (e.g., `project-card`, `section-title`).
- **HTML**: Use semantic tags (`header`, `main`, `section`, `footer`); attributes in double quotes.
- **JavaScript**: None today; if added, use camelCase for functions/variables and PascalCase for components.

## Testing Guidelines
- No automated tests currently. For UI changes, include manual verification steps and before/after screenshots in PRs.
- If introducing tests, prefer lightweight browser smoke tests (e.g., Playwright). Name files like `tests/*.spec.{js,ts}` and document run commands in the PR.

## Commit & Pull Request Guidelines
- **Commits**: Short, imperative messages (e.g., "fix mobile viewport", "add alert banner"). Keep commits focused.
- **PRs**: Clear description, linked issues, screenshots for visual changes, and local verification steps. Keep diffs small; avoid formatting-only churn.

## Security & Configuration Tips
- Do not commit secrets or API keys; this is a static site.
- Use relative asset paths under `public/`.
- Optimize images before adding (`public/img/`), prefer SVGs where possible (`public/svg/`).


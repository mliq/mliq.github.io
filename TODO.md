# TODO

Purpose: Turn PRD into concrete, verifiable work. Tasks are grouped into workstreams with acceptance criteria, blockers, and questions for you.

## WS1 — Visual Revamp & IA
- Audit current UI vs. older "Work" layout; list components to keep/retire.
- Reintroduce "Work" heading with a distinctive W (Google Font or custom). Acceptance: visible at 48–64px, crisp on mobile, no CLS.
- Add project card system (image, title, subtitle, summary, actions). Acceptance: matches spacing in `public/styles/custom.scss`, mobile-first.
- Restore subtle animation affordances (Animate.css or CSS keyframes) without motion sickness. Acceptance: reduced motion respects `prefers-reduced-motion`.
- Create color scale tokens from $navy/$blue/$red; add accessible hover/focus states. Acceptance: AA contrast for text, focus outline visible.
- Improve IA: reorder projects, add short intro sentence, and place resume link prominently (header or intro).

Questions
- Which font do you want for the “Work” W? Example options: Playfair Display, Libre Baskerville, or previous brand font (name?).
- Keep Bootswatch “Readable”, or switch theme? Any brand colors to add?

## WS2 — Petfinder Pet Quiz Capture
- Create Playwright capture script to record a guided flow of the quiz.
  - Add dev deps: `npm i -D @playwright/test playwright` and `npx playwright install chromium`.
  - Add `playwright.config.ts` to record video (`recordVideo: { size: 1280x720 }`), screenshots on each step, and trace.
  - Script steps using the working link you provided; stop before login if required.
  - Export: MP4 (primary), GIF (secondary, compressed), and step screenshots.
- Add a lightweight gallery on the site: thumbnail(s) link to MP4; include a caption explaining live link volatility.
- Store assets under `public/img/petfinder-demo/` and `public/video/` (or Git LFS if >50MB). Document sizes and compression.
  - After capture, set `index.html` poster `public/img/petfinder-demo/cover.png` from a key screenshot.
  - Optional: generate GIF preview via `npm run gif:petfinder` (requires ffmpeg).
improvement requests to the video:

1. dismiss the Cookie banner at bottom before starting recording
2. make a selection where it says SELECT to show the interaction of the form.
3. Turn this into an animated GIF so the user never needs to watch a video and use that as the main image on the homepage.

Acceptance Criteria
- One animated GIF that shows the flow.
- A site section explaining how to test the flow live, with the volatile URL and caveats.

Blockers / Questions
- Do you have demo credentials for Petfinder to pass the login step? If not, OK to end recording right before login?
- Confirm permission to record and show this flow publicly.
- Target resolution/aspect for video? (Default 1280x720.)

## WS3 — Legacy Projects Restoration (Heroku offline)
- Curate static assets: pull best stills/GIFs of International Sales Derby; preserve the “horse” animation.
  - Source ideas: old repo screenshots, local archives, Wayback Machine, or rebuild minimal animation (CSS keyframes) over `horse_and_flag.png`.
- Migrate older section copy (bullets, tech stack) into concise cards.
- Replace dead demo links with: Video, Code link, and a note “Formerly hosted on Heroku”.

Acceptance Criteria
- Each legacy project has: 1 hero image/GIF, 1–2 sentence summary, and 2 action buttons (Demo video, Code).
- No broken links in Lighthouse.

Questions
- Any other legacy projects to include beyond Derby and Predictor?
- Approve short copy rewrite to reduce legacy bullet verbosity.

## WS4 — Resume Alignment
- Review resume themes (leadership, accessibility, performance, design systems) and ensure portfolio projects demonstrate each with concrete artifacts (e.g., A11y checklist, perf budgets, DS tokens).
- Add a short “What I Do” blurb + links to 2–3 artifacts (e.g., a11y checklist PDF, perf audit screenshot, DS token file).
- Link `Michael Liquori Resume CV 2025.pdf` prominently with accessible label.

Acceptance Criteria
- Each resume theme is represented by at least one on-site artifact or case-study snippet.

Open Questions
- Which resume themes should be emphasized first for Principal FE roles? Rank top 3.

## WS5 — Content & Copy Polish
- Write concise summaries for each project (<= 25 words), showcase outcomes and role.
- Add alt text for all images/screengrabs describing purpose, not pixels.
- Add meta description and social cards (Open Graph/Twitter) for the homepage.
- Add social links for Instagram and SoundCloud in footer and header.

Acceptance Criteria
- Footer includes working links to Instagram and SoundCloud with icons and accessible labels.
- Header or intro includes a small nav with a Resume link and social shortcuts.
 - `public/img/social-card.png` generated (1200x630), referenced by meta tags.

## WS6 — Build, Tooling, and Quality Gates
- Document existing build and tooling commands in README.
- Add `npm run watch` for Sass: `sass --watch public/styles`.
- Add simple local server script: `npm run serve` -> `python3 -m http.server`.
- Optional: Add `@playwright/test` tasks: `npm run capture:petfinder`.
- Add a pre-commit formatter (if desired) or keep manual discipline.

Acceptance Criteria
- One-command watch and serve workflows; README updates.

## WS7 — Accessibility & Performance
- A11y: keyboard navigation for all actions, visible focus, headings outline, color contrast checks, reduce motion support, descriptive link text.
- Verify skip link jumps to main content.
- Perf: compress images (WebP where helpful), defer non-critical CSS, verify Lighthouse >= 95 on Mobile.

## Implementation Plan (suggested order)
1) WS1 visual revamp scaffold
2) WS2 Petfinder capture (time-sensitive)
3) WS3 legacy assets & copy
4) WS4 resume alignment artifacts
5) WS5 content polish + meta
6) WS6 tooling scripts + README
7) WS7 a11y/perf pass

## Risks & Mitigations
- Volatile external links: Prefer recorded media + clear disclaimer, keep code links.
- Large media size: Use MP4 (H.264) + GIF only for preview, consider Git LFS.
- Theme drift: Lock tokens in SCSS variables; avoid editing vendor CSS.

## OPEN QUESTIONS
- Petfinder creds: Provide demo email/password to use for the capture? Store only in local env (never committed) as `PETFINDER_EMAIL` and `PETFINDER_PASSWORD`.
- Capture scope: Which exact steps should the video include (e.g., pre-quiz screen, 2–3 questions, reach login prompt), target duration (20–40s?), and preferred resolution (1280×720 default OK?).
- PII policy: Confirm it’s acceptable to mask inputs (email/name/phone) in screenshots and avoid recording any sensitive data.
- Hosting media: Should videos/GIFs live in-repo (`public/video/`, Git LFS if large) or be hosted externally (e.g., GitHub Releases, Cloudflare R2, S3)? Any size budget per asset?
- “Work” heading: Keep the original Raleway look for the W (current plan) or try an alternate serif just for the initial letter? Any preferences for letter-spacing/weight?
- Theme: Keep Bootswatch Readable or adjust typography/colors to better emphasize leadership/excellence/scale/impact? Any brand palette to add beyond $navy/$blue/$red?
- Legacy assets: Do you have higher-resolution images/GIFs for the horse animation or permission to reconstruct as CSS animation? OK to reference Wayback captures if needed?
- Resume emphasis: Top 3 artifacts to surface (e.g., accessibility checklist PDF, performance audit screenshot, design token file)?
- Automation: Should we add a GitHub Actions job to run Playwright capture (requires hosting access and stable target), or keep it local-only due to external-site variability?
- Social handles: What are the Instagram and SoundCloud URLs/handles to use? Any preferred labels (e.g., “Instagram”, “SoundCloud”, or brand icons only)?

# Historical Timeline & Portfolio

Below is a chronological timeline of past work/projects, serving as a resume portfolio. Each entry includes the year, project name, brief description, tech stack, and links (if available).

---

## 2024 — Petfinder Quiz Capture
- Automated browser capture of Petfinder quiz flow using Playwright.
- Tech: TypeScript, Playwright, ffmpeg, Sass.
- [Demo GIF](public/video/petfinder-demo.webm) | [Code](tests/petfinder.capture.spec.ts)

## 2022 — International Sales Derby (Heroku)
- Animated horse race dashboard for sales teams, formerly hosted on Heroku.
- Tech: Node.js, Express, CSS keyframes, Heroku.
- [Hero Image](public/img/3mhorses/horse_and_flag.png) | [Code](https://github.com/mliq/sales-derby)

## 2020 — Predictor
- Interactive prediction tool with animated visualizations.
- Tech: JavaScript, D3.js, CSS, Webpack.
- [Demo GIF](public/img/predictor/predictor14.gif)

## 2018 — Portfolio Redesign
- Major visual overhaul, introduced card-based layout and custom SCSS tokens.
- Tech: HTML, SCSS, Animate.css, Bootswatch.

## 2016 — Early Work
- Initial portfolio, static HTML/CSS, basic project gallery.
- Tech: HTML, CSS, jQuery.

---

*For more details, see the README or contact for archived demos/code.*

# Refinement Suggestions

- Consider prioritizing tasks by impact and urgency (e.g., time-sensitive captures first).
- Break down larger tasks into smaller, actionable steps for easier tracking.
- Use consistent formatting for acceptance criteria and blockers/questions.
- Add estimated completion dates or effort levels for each workstream if possible.
- Ensure all links and references are up-to-date and working.

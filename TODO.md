# 2025 Portfolio — Iteration Plan (Crisp)

Purpose: Align the site to PRD and fix mismatches. Tasks are grouped by workstream with acceptance criteria.

Incoming Todos
- [x] this site should look amazing at every breakpoint - add that to evergreen instructions. (Added to AGENTS.md; mobile gutters refined)
- [x] I'm not completely sure yet if I want to include the resume, so let's make that easy to comment out without disrupting the design. (Comment block added)
- [x] Change "Work" to "What I've Made" (Updated)
- [x] "Leadership • Excellence • Scale • Impact" at top… that rings hollow. I want to show this through my work not to just state it like this. Remove it. (Removed header tagline)
- [x] It seems like you are using the README.md like PRD.md and AGENTS.md. Do not. README is user-facing (at the github repo homepage). It should stay minimal. Decide on a better structure for these files that suits GPT-5 workflow best and stick to it. (Probably AGENTS.md?). (README trimmed; guidance moved to AGENTS.md)


WS1 — Visual & IA
- [x] Update “Work” heading styling and intro sentence placement.
- [x] Refine project-card spacing, hover/active/focus states, and reduced-motion behavior.
- [x] Reorder projects: Petfinder, Predictor, International Sales Derby.
- Acceptance: Cards align to PRD, correct order, visible focus rings.

WS2 — Petfinder Capture & Media
- [x] Confirm Playwright flow: dismiss cookie banner, show form selection, stop before login. (Capture script exists; GIF/WebM linked)
- [ ] Export optimized GIF (homepage primary) and WebM; document sizes.
- Acceptance: `public/img/petfinder-demo/preview.gif` and `public/video/petfinder-demo.webm` present; preview section shows GIF + volatility note.

WS3 — Legacy Projects
- [x] Add concise summaries and “Formerly hosted on Heroku” note where needed.
- [x] Verify/replace dead links with code/video alternatives.
- Acceptance: No broken links; cards concise and informative.

WS4 — Resume Alignment
- [x] Keep resume link prominent; add short “What I Do” blurb if approved. (Intro lead present; CTA in header)
- [ ] Optionally surface 1–2 artifacts (a11y/perf/design tokens).
- Acceptance: Resume CTA accessible label present; artifact links (if any) resolve.

WS5 — Content & Social
- [x] Improve alt text across images for purpose-based descriptions.
- [x] Replace placeholder Instagram/SoundCloud with real links or remove. (Removed placeholders)
- Acceptance: All alts descriptive; footer links are working or intentionally omitted.

WS6 — Build & Tooling
- [x] Confirm `npm run build`, `npm run watch`, `npm run serve` documented.
- [x] Note: Edit `custom.scss`; compiled `custom.css` is generated — do not hand-edit. (README note)
- Acceptance: README quickstart reflects the above.

WS7 — Accessibility & Performance
- [x] Keyboard navigation pass; ensure focus order and outlines are consistent.
- [ ] Compress heavy images; validate with Lighthouse (target ≥90 on mobile).
- Acceptance: Document scores and any follow-up items.

Open Questions
- Final heading font choice? Keep current or switch to Playfair.
- Provide Instagram/SoundCloud URLs?
- Any additional legacy projects to restore?

Added Items
- [x] Replace “Preview/Case Study” with playful “Deep Dive” language throughout.
- [x] Add CaringBridge Deep Dive and a project card linking to it.
- [x] Capture external screenshots with Playwright (CaringBridge, Petfinder) and save under `artifacts/`.
- [ ] Generate WebP variants for heavy PNGs and wire `<picture>` sources.
- [ ] Add optional “Behind the Build” sections with technical highlights where appropriate.

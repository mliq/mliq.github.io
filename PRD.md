GOAL
- Ship a professional, modern portfolio for 2025 that showcases design, engineering, and leadership with a crisp, accessible, fast static site.

NON-GOALS
- Heavy JS personalization or any backend. Keep dependencies minimal and the site purely static.

---

PRODUCT REQUIREMENTS

- Visual System: Cohesive typography (current: Noto Sans JP with a distinctive Raleway treatment for the “Work” label), consistent spacing, clean card layout.
- Project Cards: Image/GIF, title, subtitle, short summary, and actions; keyboard-focusable and clear hover/focus states.
- Animations: Subtle, accessible CSS keyframes; honor prefers-reduced-motion.
- Color Tokens: Use named tokens (navy/blue/red) with accessible hover/focus outlines and visited states.
- Metadata: Open Graph and Twitter Card present and pointing to `public/img/social-card.png`.
- IA: Short intro sentence beneath “Work”; resume link placed near the top; project order by impact (Petfinder, Predictor, International Sales Derby).

PETFINDER QUIZ DEMO
- Capture: Playwright script records a short flow dismissing cookie banner and showing form selection; stop before login.
- Media: Export WebM and an optimized animated GIF. The GIF is the primary visual for the homepage card and preview section.
- Preview Section: Thumbnail/GIF, link to WebM, and a “Live (volatile)” link with a disclaimer.
- Assets: Store under `public/img/petfinder-demo/` and `public/video/`; keep sizes reasonable for web.

LEGACY PROJECTS
- Content: Concise 1–2 sentence summaries with tech context.
- Links: Replace dead demos with code or video links; include “Formerly hosted on Heroku” notes where applicable.
- Curation: Keep the strongest examples (3–4) and ensure all links resolve.

RESUME ALIGNMENT
- Visibility: Prominent, accessible link to the PDF resume.
- Themes: Reinforce leadership, accessibility, performance, and design systems via copy and artifacts where available.

ACCESSIBILITY & PERFORMANCE
- A11y: Skip link, visible focus rings, keyboard navigation for all actions, descriptive alt text, reduced-motion support.
- Perf: Compressed media, optimized GIF (lower fps + scaled), Lighthouse ≥90 on mobile/desktop for Performance, Accessibility, Best Practices, and SEO.

BUILD & TOOLING
- Styles: Author in `public/styles/custom.scss`; compile to CSS via `npm run build` or `npm run watch`.
- Capture: Keep Playwright test and capture scripts; document usage in README.

ACCEPTANCE CRITERIA
- Three polished project cards in the specified order; Petfinder uses GIF-first media.
- All images have descriptive alt text; focus is visible for links and buttons; reduced motion respected.
- Legacy cards have working links or clearly labeled notes for retired demos.
- README documents build, watch, serve, and capture commands.
- Lighthouse scores meet or exceed targets on mobile.

OPEN QUESTIONS
- Final heading font (keep Noto Sans JP + Raleway accent vs. switch to a serif like Playfair)?
- Keep Bootswatch “Readable” or adjust the theme further?
- Instagram and SoundCloud profile URLs to use?

# 2025 Portfolio — Iteration Plan (Crisp)

Purpose: Keep this a tasteful, visual one‑pager that reads like an enhanced resume.

Incoming Todos (active only)
- [ ] Predictor GIF display is too zoomed in/cropped so you can't see what it is doing. fix this.
- [ ] CaringBridge thumbnail: replace the graphic with a real public‑safe still (or confirm current graphic is acceptable).
- [ ] Petfinder media: run updated Ezra flow capture; regenerate animated WebP at 720px/18fps; ensure no cookie banner; commit assets.

- [ ] Lighthouse (mobile): compress any heavy images; document scores ≥90 (Perf, A11y, Best Practices, SEO).
- [ ] Card copy pass: standardize Role · Problem · Approach · Outcome (short, outcome‑first); badges ≤ 4 and high‑signal.
- [ ] Fonts: use a more interesting font not just system fonts.finalize strategy — preload Inter with `display=swap`. Can use Google Fonts.

Media & Assets
- [ ] Petfinder: record fresh .webm (updated script), then run `npm run webp:petfinder` (preferred) or `npm run gif:petfinder`.
- [ ] Bulk image conversion: run `npm run webp:images` for remaining PNG/JPG and wire additional `<picture>` sources where useful.

Accessibility & Performance
- [ ] Verify a11y: single `<h1>`, section headings present, correct `alt` (decoratives `alt=""`).
- [ ] Reduced motion: confirm hover zoom/transitions respect prefers‑reduced‑motion.
- [ ] Validate CLS is stable after adding image dimensions.

Open Questions
- Heading font: keep current stack or try a display serif accent for titles?
- Provide CaringBridge/public thumbnail?
- Any additional legacy projects worth a small card?

# TODO — Drop resume stats into the site (copy-only, ready for Codex CLI)

> All numbers below are pulled from your resume. Each block shows exactly what to paste into the card body inside `.project-content` (replace the existing `<p>` + `<ul>`). Keep badges as-is.

---

## Hero / About

* [ ] Update **hero subtitle** (mention scale & scope):

  ```html
  <p class="subtitle">Principal Front-End Engineer. I lead teams to ship fast, accessible, well-tested web experiences at scale (serving ~450K MAU). Org-level enablement, design systems, performance.</p>
  ```
* [ ] Replace **About** text with impact-first summary:

  ```html
  <ul class="hero-bullets">
    <li>AI enablement that saves real hours</li>
    <li>Test suites that stop flaking</li>
    <li>Design systems that teams adopt</li>
  </ul>
  ```

## About section copy

* [ ] Replace the About paragraph with a tighter, impact-forward version:

  ```html
  <p>I turn gnarly front-end problems into crisp, testable components and repeatable playbooks. Recent focus areas: AI enablement (MCP, Copilot), test modernization (Enzyme → RTL with Hook-View-Glue), performance profiling, and BFF contracts. I care about the craft, the result, and leaving teams stronger.</p>
  ```
* [ ] Add a single sentence that names scope explicitly:

  ```html
  <p>Operating at Senior Staff scope: org-level adoption, cross-team coaching, and guardrails that stick.</p>
  ```

---

## Projects

### 1) AI Enablement at Grubhub

* [ ] Replace copy with outcome → role → problem → approach (add year chip `2024–2025` if you like):

  ```html
  <p><strong>Outcome:</strong> Projected to save <strong>3,000+ developer hours</strong> (≈2+ years) as adoption scales. Targets <strong>5,000+ files</strong>; <strong>250+</strong> already migrated.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Senior Staff · Org enablement</li>
    <li><strong>Problem:</strong> High AI interest but uneven adoption</li>
    <li><strong>Approach:</strong> MCP & Copilot pilots, playbooks, guardrails, usage telemetry</li>
  </ul>
  ```

### 2) Enzyme → RTL “Flambé” & HVG

* [ ] Swap text for these resume metrics:

  ```html
  <p><strong>Outcome:</strong> <strong>38%</strong> increase in release velocity (<strong>1.3→1.8</strong>/week), <strong>66%</strong> fewer E2E failures (<strong>7k→2.4k</strong>) with no increase in prod bugs.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Tech lead · Frontend platform</li>
    <li><strong>Approach:</strong> Codemods, staged Enzyme→RTL migration, Hook-View-Glue, CI guardrails</li>
    <li><strong>Ops:</strong> SLO response time <strong>2h→10m</strong>; runbooks across <strong>55 SLOs / 11 apps</strong></li>
  </ul>
  ```

### 3) Petfinder Pet Quiz (Nestlé Purina)

* [ ] Insert performance & accessibility stats:

  ```html
  <p><strong>Outcome:</strong> Site performance improved by <strong>66%</strong> (Time-to-Interactive). WCAG 2.1 AA achieved for a property serving <strong>110M users</strong>.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Lead engineer · Consumer experience</li>
    <li><strong>Approach:</strong> Perf audit & tuning, modern stack migration; accessible, low-friction quiz UX</li>
  </ul>
  ```

### 4) CaringBridge

* [ ] Replace body with engagement & a11y results:

  ```html
  <p><strong>Outcome:</strong> <strong>+70% user engagement</strong> (lower bounce, higher activation & return) while reaching <strong>WCAG 2.1 AA</strong> on a property with <strong>42M users</strong>.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Front-end lead</li>
    <li><strong>Approach:</strong> Performance budgets, accessibility audits, UX modernization (Next.js/React/GraphQL)</li>
  </ul>
  ```

### 5) 3M Sales Derby

* [ ] Keep succinct and outcome-first:

  ```html
  <p><strong>Outcome:</strong> Delivered under budget; praised for “Apple-like” UX. Animated dashboard for a global sales incentive challenge.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Full-stack · Client delivery</li>
    <li><strong>Approach:</strong> Lightweight motion; responsive SPA; secure Excel upload</li>
  </ul>
  ```

### 6) Predictor!

* [ ] Lock in metrics inline:

  ```html
  <p><strong>Outcome:</strong> ≈<strong>15%</strong> next-word accuracy; <strong><2s</strong> response on low-spec devices; <strong><10MB</strong> memory.</p>
  <ul class="project-details">
    <li><strong>Role:</strong> Solo · JHU capstone</li>
    <li><strong>Approach:</strong> Compact n-gram models with pruning; R/Shiny on AWS</li>
  </ul>
  ```
* [ ] Make the **badges** purposeful. Keep ≤4 per card, all high-signal. Example for AI Enablement: `MCP`, `Copilot`, `Playbooks`, `Guardrails`.
* [ ] Add small CTAs for modern projects:

  ```html
  <div class="project-actions">
    <a class="btn secondary" href="/case-studies/ai-enablement.html">Overview</a>
    <a class="btn secondary" href="/case-studies/flambe-rtl.html">Case study</a>
  </div>
  ```
* [ ] Add **year chips** to every card for quick recency parsing.

## Ordering and scannability

* [ ] Order by relevance and recency: AI Enablement, Flambé/HVG, Petfinder, CaringBridge, 3M, Predictor.
* [ ] Keep card copy to \~45–70 words each. Outcomes go first.

## Contact and footer

* [ ] Make the Contact CTA explicit:

  ```html
  <p class="call">Open to Principal Front-End leadership roles. Let’s talk.</p>
  ```
* [ ] Add a “Download resume” link in Contact as a secondary CTA.
* [ ] Ensure icons have visible focus styles and text labels for screen readers (you already have `aria-label`, keep it).

## Accessibility

* [ ] Keep **one** `<h1>` on the page. Ensure each section has an `<h2>` with `aria-labelledby` (already good).
* [ ] Add `aria-current="page"` to the “Projects” link when `#portfolio` is in view (IntersectionObserver).
* [ ] Ensure all images have informative `alt`. If purely decorative, use empty `alt=""`.
* [ ] Add `loading="lazy"` to non-hero images:

  ```html
  <img src="..." alt="..." width="..." height="..." loading="lazy">
  ```
* [ ] Set explicit `width` and `height` on images to avoid layout shift.

## Performance

* [ ] Inline critical CSS for above-the-fold. Defer the rest or keep a single minified CSS file.
* [ ] If keeping Google Fonts, add `&display=swap` and preload:

  ```html
  <link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/..." as="font" type="font/woff2" crossorigin>
  ```

  Or switch to a system font stack to remove remote dependency.
* [ ] Compress hero and project images to WebP; keep GIF only as a fallback.
* [ ] Defer any noncritical JS; avoid layout-thrashing scripts.
* [ ] Add `rel="preconnect"` to `www.googletagmanager.com` and `fonts.gstatic.com` (already present for fonts).

## Analytics and privacy

* [ ] Respect Do-Not-Track and provide a lightweight opt-out:

  ```html
  <script>
    if (navigator.doNotTrack === '1') { window['ga-disable-G-640Q4NQ24V'] = true; }
  </script>
  ```
* [ ] Consider Plausible or Fathom for a privacy-friendly, no-cookie option.

## SEO and social

* [ ] Add canonical URL:

  ```html
  <link rel="canonical" href="https://mliq.github.io/">
  ```
* [ ] Ensure `og:image` and `twitter:image` are absolute URLs:

  ```html
  <meta property="og:image" content="https://mliq.github.io/public/img/social-card.png">
  ```
* [ ] Add `meta name="theme-color"` to match the dark palette.
* [ ] Add structured data (JSON-LD) for Person and WebSite:

  ```html
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Person",
    "name":"Michael Liquori",
    "jobTitle":"Principal Front-End Engineer",
    "url":"https://mliq.github.io/",
    "sameAs":["https://www.linkedin.com/in/liquori/","https://github.com/mliq"]
  }
  </script>
  ```

## Navigation and micro-interactions

* [ ] Keep the skip link visible on focus. Ensure focus ring meets contrast.
* [ ] Smooth-scroll with `scroll-margin-top` on section headings to avoid hiding under sticky nav.
* [ ] Add small hover and active states for buttons and project cards, consistent with your VS Code palette.

## Code and semantics

* [ ] Move `<section id="contact">` inside `<main>` or adjust semantics by wrapping it in a `<footer>` sub-section for consistency.
* [ ] Ensure only one `<h1>` appears. If any card uses an `<h3>` without an `<h2>` context, keep the section `<h2>` visible for assistive tech (already present).
* [ ] Keep lists short and parallel. Avoid repeating “Stack:” labels; use badges for that information.

## Optional “Writing” strip (big credibility boost)

* [ ] Add three short links that echo your strengths:

  * “How to kill flaky tests without boiling the ocean”
  * “A practical playbook for AI enablement”
  * “BFF contracts that speed up front-ends”
* [ ] Each link goes to a single page with 3–5 short sections.

## Finishing touches

* [ ] Replace any placeholder “Overview/Case study/Demo” with live URLs or remove the button.
* [ ] Add numbers where you comfortably can:

  * AI enablement: adoption rate, hours saved in quarter
  * Flambé: percent flake reduction, CI time delta
  * Petfinder: completion rate, CTR to listings, LCP
* [ ] Proof tone for consistency with your voice: short, direct, positive, no fluff.

# TODO — Improve portfolio (copy, UX, a11y, SEO, perf)

## Hero / header

* [ ] **Tighten value prop** in hero subtitle (clear, benefits-first).
  In `index.html` replace the `<p class="subtitle">…</p>` with:

  ```html
  <p class="subtitle">Principal Front-End Engineer. I lead teams to ship fast, accessible, well-tested web experiences at scale. Focus: AI enablement, design systems, performance.</p>
  ```
* [ ] **Add hero CTAs** (Email · LinkedIn · Resume) under the intro.

  ```html
  <div class="hero-cta">
    <a class="btn primary" href="mailto:liquori@gmail.com">Email me</a>
    <a class="btn" href="https://www.linkedin.com/in/liquori/">LinkedIn</a>
    <a class="btn" href="public/Michael_Liquori_Resume.pdf">Resume</a>
  </div>
  ```
* [ ] **Add 3 micro-bullets** for instant scannability (keep under 6 words each).

  ```html
  <ul class="hero-bullets">
    <li>AI that saves real hours</li>
    <li>Tests that stop flaking</li>
    <li>Design systems teams adopt</li>
  </ul>
  ```
* [ ] **Style** the new elements in `public/styles/site.css`:

  ```css
  .hero-cta{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.75rem}
  .btn{padding:.55rem .9rem;border-radius:.65rem;border:1px solid var(--surface-3);text-decoration:none}
  .btn.primary{background:linear-gradient(90deg,var(--accent),var(--accent2));border:none;color:#fff}
  .hero-bullets{display:flex;flex-wrap:wrap;gap:.75rem;margin:.75rem 0 0;padding:0;list-style:none}
  .hero-bullets li{background:var(--surface-2);border:1px solid var(--surface-3);padding:.35rem .6rem;border-radius:999px;font-size:.9rem}
  ```

## About copy

* [ ] Replace About paragraph with impact-first version:

  ```html
  <p>I turn gnarly front-end problems into crisp, testable components and repeatable playbooks. Recent focus: AI enablement (MCP, Copilot), test modernization (Enzyme → RTL with Hook-View-Glue), performance profiling, and BFF contracts. I care about the craft, the outcome, and leaving teams stronger.</p>
  ```
* [ ] Add scope line:

  ```html
  <p>Operating at Senior Staff scope: org-level adoption, cross-team coaching, and durable guardrails.</p>
  ```

## Projects — copy & structure

* [ ] **Reorder cards** by relevance/recency:

  1. AI Enablement, 2) Enzyme→RTL “Flambé” & HVG, 3) Petfinder, 4) CaringBridge, 5) 3M, 6) Predictor.
* [ ] **Standardize card content** to: **Outcome → Role → Problem → Approach** (short lines; numbers first).

  * **AI Enablement (update)**:

    ```html
    <p><strong>Outcome:</strong> Thousands of developer hours saved across multiple teams.</p>
    <ul class="project-details">
      <li><strong>Role:</strong> Senior Staff · Org enablement</li>
      <li><strong>Problem:</strong> High interest in AI; uneven adoption</li>
      <li><strong>Approach:</strong> MCP/Copilot pilots, playbooks, guardrails, usage telemetry</li>
    </ul>
    ```
  * **Flambé/HVG (update)**:

    ```html
    <p><strong>Outcome:</strong> Fewer flakes; faster CI; simpler components.</p>
    <ul class="project-details">
      <li><strong>Role:</strong> Tech lead · Frontend platform</li>
      <li><strong>Problem:</strong> Brittle Enzyme tests; slow feedback</li>
      <li><strong>Approach:</strong> Codemods + staged migration to RTL; Hook-View-Glue; CI guardrails</li>
    </ul>
    ```
  * **Petfinder (update)**:

    ```html
    <p><strong>Outcome:</strong> High quiz completion and click-through to live listings.</p>
    <ul class="project-details">
      <li><strong>Role:</strong> Lead engineer · Consumer experience</li>
      <li><strong>Problem:</strong> Help adopters find matches quickly</li>
      <li><strong>Approach:</strong> Fast, accessible UI; shareable results; Playwright capture → WebP</li>
    </ul>
    ```
  * **CaringBridge (update)**:

    ```html
    <p><strong>Outcome:</strong> Faster pages; clearer flows across a large nonprofit platform.</p>
    <ul class="project-details">
      <li><strong>Role:</strong> Front-end lead</li>
      <li><strong>Approach:</strong> Accessibility audits, performance budgets, UX modernization</li>
    </ul>
    ```
  * **3M Sales Derby (trim)**: keep 1–2 bullets max; put “Delivered under budget; praised for ‘Apple-like’ UX” in the paragraph.
  * **Predictor! (clarify)**: keep metrics together (≈15% accuracy; sub-2s response; low-spec devices).
* [ ] **Add case-study/overview links** to the first two cards (placeholders OK):

  ```html
  <div class="project-actions">
    <a class="btn secondary" href="/case-studies/ai-enablement.html">Overview</a>
    <a class="btn secondary" href="/case-studies/flambe-rtl.html">Case study</a>
  </div>
  ```
* [ ] **Make entire card clickable** (except buttons) for quicker exploration (wrap content in `<a class="card-link" …>` and style `display:block`).
* [ ] **Consistent badges** (≤4; title-case or all-caps consistently). Replace “UX Eng” with “UX Engineering” or “UX”.

## Visual/UI polish

* [ ] **Add year chips** to the two top projects for parity (`2024–2025` and `2022–2024`).
* [ ] **Normalize punctuation** in bullet lists (either all with periods or none; pick one).
* [ ] **Increase tap targets** for social icons and buttons to ≥44×44px; add visible hover & focus states.
* [ ] **Add subtle card hover** (lift or border glow) to improve affordance.
* [ ] **Add `scroll-margin-top`** on section headings so anchor jumps don’t hide under sticky header:

  ```css
  section[id]{scroll-margin-top: 80px;}
  ```

## Accessibility

* [ ] Keep **one `<h1>`** (“Hi, I’m Michael.”). Ensure each major section has an `<h2>` (already good).
* [ ] **Alt text audit**:

  * Decorative thumbs: `alt=""`
  * Meaningful previews: concise, action-oriented alt (“Preview of Petfinder quiz results UI”).
* [ ] **Add `loading="lazy"` and explicit `width`/`height`** to all non-hero images to prevent layout shift.
* [ ] **Keyboard**: visible `:focus-visible` styles for links, buttons, and cards.
* [ ] **ARIA**: give the current nav link `aria-current="page"` when its section is in view (small script below).

  ```html
  <script>
    const links=[...document.querySelectorAll('.nav a[href^="#"]')];
    const map=new Map(links.map(a=>[a.getAttribute('href'),a]));
    const obs=new IntersectionObserver(es=>{
      es.forEach(e=>{
        const id="#"+e.target.id;
        const a=map.get(id);
        if(!a) return;
        if(e.isIntersecting){ a.setAttribute('aria-current','page'); }
        else if(a.getAttribute('aria-current')==='page'){ a.removeAttribute('aria-current'); }
      });
    },{rootMargin:"-50% 0px -45% 0px",threshold:0});
    document.querySelectorAll('main section[id]').forEach(s=>obs.observe(s));
  </script>
  ```

## Performance

* [ ] **Compress/convert images**: use WebP for all thumbnails; keep GIF only where necessary; ensure sizes ≤ \~120KB each.
* [ ] **Add explicit sizes** to `<source>`/`<img>` elements. Example:

  ```html
  <img src="public/img/3mhorses/horse_and_flag.webp" width="640" height="360" loading="lazy" alt="3M Sales Derby dashboard preview">
  ```
* [ ] **Font strategy**: already using Inter via Google; add `&display=swap` to the import and a system-font fallback in CSS.
* [ ] **Defer analytics with DNT respect**:

  ```html
  <script>
    if (navigator.doNotTrack === '1') { window['ga-disable-G-640Q4NQ24V'] = true; }
  </script>
  ```

## SEO / Social

* [ ] **Canonical URL** in `<head>`:

  ```html
  <link rel="canonical" href="https://mliq.github.io/">
  ```
* [ ] **Absolute social image URLs**:

  ```html
  <meta property="og:image" content="https://mliq.github.io/public/img/social-card.png">
  <meta name="twitter:image" content="https://mliq.github.io/public/img/social-card.png">
  ```
* [ ] **Theme color**:

  ```html
  <meta name="theme-color" content="#0f1216">
  ```
* [ ] **Structured data (JSON-LD)**:

  ```html
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"Person",
    "name":"Michael Liquori",
    "jobTitle":"Principal Front-End Engineer",
    "url":"https://mliq.github.io/",
    "sameAs":["https://www.linkedin.com/in/liquori/","https://github.com/mliq"]
  }
  </script>
  ```

## Code organization

* [ ] Move `<section id="contact">` **inside `<main>`** (or mark as `<footer>` sub-section) for semantic consistency.
* [ ] Create `/case-studies/` folder with stub pages for **AI Enablement** and **Flambé/HVG**; link from card CTAs.
* [ ] Add `/public/Michael_Liquori_Resume.pdf`; wire the hero + contact buttons.

## Optional “Writing” strip (high return)

* [ ] Insert above Contact:

  ```html
  <section id="writing" class="container" aria-labelledby="writing-title">
    <h2 id="writing-title">Writing</h2>
    <ul class="links">
      <li><a href="/notes/ai-enablement-playbook.html">A practical playbook for AI enablement</a></li>
      <li><a href="/notes/kill-flaky-tests.html">How to kill flaky tests without boiling the ocean</a></li>
      <li><a href="/notes/bff-contracts.html">BFF contracts that speed up front-ends</a></li>
    </ul>
  </section>
  ```

## Content to gather (numbers make it pop)

* [ ] **AI Enablement**: adoption %, weekly active users, hours saved/quarter.
* [ ] **Flambé/HVG**: flake reduction %, CI runtime delta, test execution speedup.
* [ ] **Petfinder**: quiz completion rate, CTR to listings, LCP.
* [ ] Add 1–2 short quotes (EM/VP) as pull-quotes under Projects or About.

---

When these are in, you’ll have tighter copy, clearer outcomes, better a11y/SEO, and stronger recruiter signal—without adding bloat.

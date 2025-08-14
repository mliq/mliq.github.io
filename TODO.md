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

Here’s a refined **`TODOs.md`** you can drop in. I merged everything from your current list, tightened the wording, and added concrete, high-impact tasks (copy, media, a11y, SEO, perf, and metrics pulled from your resume and CaringBridge slides).

---

# 2025 Portfolio — Killer One-Pager Plan

Goal: a tasteful, fast, single-page portfolio that highlights your **org-level impact** with crisp data and credible visuals so hiring managers can say “yes” in 30 seconds.

---

## 🔴 Ship-blockers (do these first)

* [ ] **Petfinder capture**

  * Record fresh `.webm` of the Ezra flow (no cookie banner; signed-out state).
  * Generate 720p, \~18fps **animated WebP** and a lightweight poster image.
  * Wire `<picture>` with `type="image/webp"` and fallback GIF only if needed.
* [ ] **CaringBridge thumbnail**

  * Export a public-safe still: “Performance | Time to Interactive” chart from slides 43–56.
  * Save as `public/img/caringbridge-tti.png` (16:9, 1200×675) with alt:
    *“CaringBridge performance: Time to Interactive improvement after removing render-blocking resources.”*
* [ ] **Predictor GIF**

  * Recreate capture so the UI is readable (zoom out; add 1200×675 canvas).
  * Replace `public/img/predictor/predictor14.gif` with WebP animation + poster.
* [ ] **Lighthouse (mobile)** ≥90 across Perf, A11y, Best Practices, SEO.

  * Compress any heavy images; ensure `loading="lazy"` and explicit `width/height`.

---

## ✍️ Copy upgrades (outcomes first, numbers up front)

* [ ] **Hero subtitle** (clarify scope + scale):

  ```html
  Principal Front-End Engineer. I lead teams to ship fast, accessible, well-tested web experiences at scale (serving ~450K MAU). Org enablement, design systems, and performance.
  ```
* [ ] **About** (impact-forward):

  ```html
  I turn gnarly front-end problems into crisp, testable components and repeatable playbooks. Recent wins: AI enablement, Enzyme→RTL with Hook-View-Glue, performance profiling, and BFF contracts — with measurable impact.
  ```
* [ ] **Project cards — standardize** to **Outcome → Role → Approach** (≤70 words). Keep badges ≤4.

### Project copy (paste into each `.project-content`)

* [ ] **AI Enablement at Grubhub**
  Outcome: **3,000+ developer hours saved** projected as adoption scales; target **5,000+ files** ( **250+ migrated**).
  Role: Senior Staff (org enablement).
  Approach: MCP & Copilot pilots, playbooks, guardrails, usage telemetry.

* [ ] **Enzyme → RTL “Flambé” & HVG**
  Outcome: **+38%** release cadence (**1.3→1.8/wk**), **–66%** E2E failures (**7k→2.4k**) with no prod bug increase; SLO response **2h→10m**; runbooks across **55 SLOs / 11 apps**.
  Role: Tech lead, Frontend platform.
  Approach: codemods + staged Enzyme→RTL, Hook-View-Glue, CI guardrails.

* [ ] **Petfinder Pet Quiz (Nestlé Purina)**
  Outcome: **+66%** Time-to-Interactive improvement; **WCAG 2.1 AA** for a property serving **110M users**.
  Role: Lead engineer, consumer experience.
  Approach: perf audit & tuning, modern stack, accessible low-friction quiz.

* [ ] **CaringBridge**
  Outcome: **+70% user engagement** (lower bounce, higher activation & return) and **WCAG 2.1 AA** on a platform with **42M users**.
  Role: Front-end lead.
  Approach: performance budgets, a11y audits, UX modernization (Next.js/React/GraphQL).

* [ ] **3M Sales Derby**
  Outcome: delivered under budget; praised for **“Apple-like” UX**; animated dashboard for a global sales challenge.
  Role: Full-stack, client delivery.
  Approach: lightweight motion; responsive SPA; secure Excel upload.

* [ ] **Predictor!**
  Outcome: ≈**15%** next-word accuracy; **<2s** response on low-spec devices; **<10MB** memory.
  Role: Solo, JHU capstone.
  Approach: compact n-gram models with pruning; R/Shiny on AWS.

> CaringBridge slides 43–56 — add these to the CaringBridge **case study** page or a sub-bullet on the card:
>
> * **Render-blocking JS 176 KB → 23.1 KB** (≈87% cut) and CSS down to **\~3.2 KB**.
> * **Activations/day 116 → 192 (+65%)**, **bounces 8,000 → 2,400 (–70%)**.
> * Added **visual regression testing** to prevent UI drift.

---

## 🖼 Media & assets

* [ ] Bulk convert PNG/JPG to WebP (`npm run webp:images`); keep originals as fallbacks in `<picture>`.
* [ ] Ensure every `<img>`/`<source>` has explicit `width`/`height`; keep hero avatar non-lazy.
* [ ] Replace “CaringBridge” SVG placeholder with `caringbridge-tti.png` (above).
* [ ] Normalize all badges to consistent style and casing; rename “UX Eng” → “UX” or “UX Engineering”.

---

## 🧭 Information architecture

* [ ] Add `/case-studies/ai-enablement.html` and `/case-studies/flambe-rtl.html` (stub now, 3–5 short sections each).

  * CTA buttons: **Overview** (AI Enablement) and **Case study** (Flambé) on cards.
* [ ] Optional **Writing** strip above Contact with three short links:

  * A practical playbook for AI enablement
  * How to kill flaky tests without boiling the ocean
  * BFF contracts that speed up front-ends

---

## ♿ Accessibility (keep it AAA-clean where possible)

* [ ] Confirm a single `<h1>`; each section has `<h2>` and `aria-labelledby`.
* [ ] Alt text audit: decorative thumbs `alt=""`; previews get action-oriented alt.
* [ ] Keyboard: strong `:focus-visible` on links, buttons, cards; visible skip link.
* [ ] Respect `prefers-reduced-motion` (disable hover lifts/animations).
* [ ] Add `aria-current="page"` to nav when sections intersect (already scaffolded; verify thresholds).

---

## ⚡ Performance

* [ ] Font strategy: preload Inter with `display=swap`; add system fallback; consider local hosting later.
* [ ] Keep total JS minimal; analytics deferred; zero layout-thrashing JS.
* [ ] Image budgets: hero ≤90KB; cards ≤120KB each; animated WebP ≤1.5MB.
* [ ] Validate CLS (no shift) via explicit dimensions and `font-display: swap`.
* [ ] Re-run Lighthouse and record scores in `README` (screenshot + numbers).

---

## 🔐 Analytics & privacy

* [ ] Respect DNT: set `window['ga-disable-G-640Q4NQ24V']=true` when `navigator.doNotTrack==='1'`.
* [ ] Consider swapping GA for Plausible/Fathom (no cookies, lighter script).
* [ ] Add a tiny “Privacy” note in footer linking to an `/about-analytics` blurb.

---

## 🔎 SEO & social

* [ ] Ensure canonical `<link rel="canonical" href="https://mliq.github.io/">`.
* [ ] Absolute OG/Twitter images (already done); create a clean **social card** with your headshot + title.
* [ ] Add `<meta name="theme-color" content="#0f1216">`.
* [ ] Add JSON-LD `Person` (+ optional `WebSite`) schema with LinkedIn & GitHub.

---

## 🎯 UX polish

* [ ] Make entire project card clickable (except buttons); add subtle hover lift.
* [ ] Year chips for all cards: `2024–2025`, `2022–2024`, `2020–2022`, `2019–2020`, `2015`, `2014`.
* [ ] Normalize bullet punctuation (pick none or periods; keep consistent).
* [ ] Increase social icon hit areas to ≥44×44; ensure hover + focus states.
* [ ] `scroll-margin-top: 80px` for all anchored sections (sticky nav offset).

---

## 🧱 Code & semantics

* [ ] Move `#contact` inside `<main>` (landmarks: header → main → footer).
* [ ] Keep scripts at the end and minimal; no blocking resources above the fold.
* [ ] Add small utility classes documented in `public/styles/site.css` (buttons, chips, actions).

---

## 📄 Assets to collect (from resume/decks)
* [ ] CaringBridge: export a **second** still (engagement deltas) for a case study image.

---

## ✅ QA checklist (before push)

* [ ] Manual pass on iPhone SE, iPhone 14 Pro, Pixel 7, and a small laptop viewport.
* [ ] VoiceOver/NVDA basic flow: nav → projects → contact; headings read correctly.
* [ ] Links and CTAs keyboard-accessible; skip link jumps to `#main`.
* [ ] Lighthouse ≥90 four categories (note scores in README).

---

## 💡 Nice-to-haves (after ship)

* [ ] Add a “light theme” toggle (CSS `data-theme` attribute).
* [ ] “Print resume” friendly CSS for the case studies.
* [ ] Tiny email obfuscation for scrapers (JS or HTML entities).

totally—years don’t have to be “chips.” Here’s a tiny, PR-ready TODO to switch to a subtle, typographic treatment that reads cleanly and feels more professional.

# TODO — Make years subtle (no chips)

## 1) Replace any `year-chip` markup with a meta line that uses `<time>`

* [ ] In each project card, **remove** `<span class="year-chip">…</span>`.
* [ ] **Add** a single meta line under the `<h3>` (preferred pattern):

  ```html
  <p class="meta">
    <time datetime="2024">2024</time>–<time datetime="2025">2025</time> · Senior Staff · Org enablement
  </p>
  ```

  * For single years:

    ```html
    <p class="meta"><time datetime="2015">2015</time> · Full-stack · Client delivery</p>
    ```

## 2) Add/adjust CSS for the new meta line

* [ ] In `public/styles/site.css`, **delete** any `.year-chip` rules.
* [ ] **Add/ensure** this meta style (muted, compact, not chip-like):

  ```css
  .project-content .meta{
    margin:.15rem 0 .4rem;
    font-size:.9rem;
    color:var(--subtle, #9aa3ad);
    letter-spacing:.01em;
  }
  .project-card h3{ margin-bottom:.1rem; } /* tighten spacing above the meta line */
  ```

## 3) Apply pattern to all cards (examples to paste)

* **AI Enablement at Grubhub**

  ```html
  <h3>AI Enablement at Grubhub</h3>
  <p class="meta"><time datetime="2024">2024</time>–<time datetime="2025">2025</time> · Senior Staff · Org enablement</p>
  ```
* **Enzyme → RTL “Flambé” & HVG**

  ```html
  <h3>Enzyme → RTL “Flambé” & HVG</h3>
  <p class="meta"><time datetime="2022">2022</time>–<time datetime="2024">2024</time> · Tech lead · Frontend platform</p>
  ```
* **Petfinder Pet Quiz**

  ```html
  <h3>Petfinder Pet Quiz</h3>
  <p class="meta"><time datetime="2020">2020</time>–<time datetime="2022">2022</time> · Lead engineer · Consumer experience</p>
  ```
* **CaringBridge**

  ```html
  <h3>CaringBridge</h3>
  <p class="meta"><time datetime="2019">2019</time>–<time datetime="2020">2020</time> · Front-end lead</p>
  ```
* **3M Sales Derby**

  ```html
  <h3>3M Sales Derby</h3>
  <p class="meta"><time datetime="2015">2015</time> · Full-stack · Client delivery</p>
  ```
* **Predictor!**

  ```html
  <h3>Predictor!</h3>
  <p class="meta"><time datetime="2014">2014</time> · Solo · JHU capstone</p>
  ```

## 4) (Optional) Put years in the heading instead (if you like that look)

* [ ] Alternate pattern—year as a quiet suffix:

  ```html
  <h3>Enzyme → RTL “Flambé” & HVG <span class="meta-year">· 2022–2024</span></h3>
  ```

  ```css
  .meta-year{ font-weight:400; font-size:.9rem; color:var(--subtle, #9aa3ad) }
  ```

  Use this only if you want to save vertical space; the meta line is usually more readable.

## 5) SEO/A11y niceties (since we’re touching years anyway)

* [ ] Keep the `<time datetime="YYYY">` elements for machine-readable dates.
* [ ] If you make case-study pages later, add JSON-LD with `datePublished`/`dateModified` using those years.

Great question. For tiny card thumbnails, **dense charts die** and **one giant number sings**. From your CaringBridge slides (43–56), the clearest, high-signal stat at glance is:

**“Activations/day +65% (116 → 192)”**

That’s positive, easy to parse, and credible. “Bounce −70%” also works, but positive framing usually lands better.

Here are two winning options—pick one:

## Option A (recommended): Big-stat tile

Use a custom stat tile instead of a chart. One short line, huge number.

* Text: **“CaringBridge — Activations/day +65%”**
* Subtext (tiny): “After perf & a11y overhaul”
* Works at 160–220px width; strong at a glance.

**Drop-in SVG (save as `public/img/caringbridge-card.svg`):**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b2130"/>
      <stop offset="1" stop-color="#0f1216"/>
    </linearGradient>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c792ea"/>
      <stop offset="1" stop-color="#82aaff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <!-- Accent bar -->
  <rect x="48" y="60" width="240" height="10" rx="5" fill="url(#a)" opacity=".9"/>
  <text x="48" y="120" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="40" fill="#c9d6e2" letter-spacing=".02em">
    CaringBridge
  </text>

  <!-- Big metric -->
  <text x="48" y="340" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-weight="700" font-size="96" fill="#e6eef6" letter-spacing="-.5px">
    Activations/day +65%
  </text>
  <text x="48" y="420" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="46" fill="#a6b2c3">
    116 → 192
  </text>

  <!-- Tiny caption -->
  <text x="48" y="560" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="28" fill="#9aa3ad">
    After performance & accessibility overhaul
  </text>
</svg>
```

**Alt text to use:**

> CaringBridge: Activations per day increased 116 → 192 (+65%) after performance and accessibility overhaul.

## Option B: Minimal “before → after” bars (still tiny-friendly)

* Two horizontal bars, “116” and “192,” with a rightward arrow and **+65%** label.
* Keep labels large; no axes, no gridlines.

If you want that instead, crop just the numeric bars—no full slide—so it reads at card size.

---

### Wire it into your card

```html
<picture>
  <source srcset="public/img/caringbridge-card.svg" type="image/svg+xml">
  <img src="public/img/caringbridge-card.svg"
       alt="CaringBridge: Activations per day increased 116 → 192 (+65%) after performance and accessibility overhaul."
       width="1200" height="675" loading="lazy">
</picture>
```

### Why this will sing

* **One idea** per image (no tiny text).
* **Huge, credible number** from the slide set.
* **Positive framing** that tracks to business value.
* **Brand-agnostic** styling that matches your site’s VS-Code palette.

If you want, I can also generate a second variant for “Bounce −70%” and you can A/B which pops more in your grid.

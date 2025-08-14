POSSIBLE TODOS

- Export lighter media
  - Convert `public/img/petfinder-demo/cover.png` and `public/img/3mhorses/horse_and_flag.png` to WebP and wire into `<picture>` with `type="image/webp"` source.
  - Re-encode `public/video/petfinder-demo.webm` at a smaller bitrate; ensure the GIF is short and low FPS for weight.

- Add artifact micro-blurb
  - Below the intro, add a one-line “What I Do” with 2–3 links (a11y checklist PDF, performance audit, design tokens).
  - If artifacts are large, host under `public/artifacts/` and link from the blurb.

- Trim unused CSS
  - Consider removing unused parts of the Bootswatch theme or moving to a minimal baseline to reduce CSS weight.

- Picture `srcset`
  - Provide 1x/2x image sources for high-DPI displays, especially for hero logos and key thumbnails.

- Additional a11y checks
  - Ensure focus order remains logical on mobile; verify skip link visibility with various zoom levels.
  - Add `lang`/`dir` checks if content expands.

- Meta/SEO refinements
  - Add canonical link; refine meta description if copy changes.
  - Add JSON-LD Person schema for richer previews.

- Automation
  - Add a simple script to generate WebP and compress images (e.g., `cwebp`) and to convert WebM/GIF via `ffmpeg`.

- Visual polish
  - Evaluate a serif accent option for the section label (“What I’ve Made”) and test alternatives to Raleway.
  - Add a subtle card entrance animation respecting reduced motion.


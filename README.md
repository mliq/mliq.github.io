# [mliq.github.io](http://mliq.github.io)

Michael Liquori — Principal Software Engineer.

Quickstart
- Serve locally: `npm run serve` then open `http://localhost:8000`.
  - If `python3` is not installed, you can use: `python -m SimpleHTTPServer 8000` (legacy) or `npx http-server -p 8000`.
- Tests: `npm run test:e2e` (Playwright desktop + mobile). Baseline checks include canonical, JSON‑LD, heading semantics, image dimensions, layout, and interactions.
- Lighthouse: `npm run lh:run` writes JSON to `artifacts/` (gitignored).

Media (Petfinder demo)
- Ingest your own screen recording and generate assets:
  - `node scripts/ingest-video.js /path/to/recording.mov`
  - Or regenerate poster assets: `npm run video:assets`
- Outputs:
  - `public/video/petfinder-demo.webm`
  - `public/img/petfinder-demo/cover.png` and `cover.webp`

Notes
- Plain HTML/CSS; styles live in `public/styles/site.css`.

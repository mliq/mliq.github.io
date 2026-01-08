# Petfinder Capture Guide

This guide explains how to record a short demo of the Petfinder quiz and produce assets (video + poster) for the site.

## Prereqs
- Node.js 18+
- Playwright browsers: `npm run playwright:install`
- Optional for GIF: ffmpeg installed and on PATH

## Prepare your clip (preferred)
Record a short screen capture of the Petfinder flow (external tool), then ingest it locally:

1) Transcode your recording to WebM and generate poster assets:

   node scripts/ingest-video.js /path/to/recording.mov

   - Outputs:
     - `public/video/petfinder-demo.webm`
     - `public/img/petfinder-demo/cover.png` (poster)
     - `public/img/petfinder-demo/cover.webp`

2) If needed, re-run poster generation:

   npm run video:assets

## Publish assets
- Copy or move the selected MP4 to `public/video/petfinder-demo.mp4`.
- Choose a representative screenshot as poster and save to `public/img/petfinder-demo/cover.png`.

## Notes
- We no longer automate the remote flow capture here; the manual clip gives you control and stability.
- Keep recordings free of PII.

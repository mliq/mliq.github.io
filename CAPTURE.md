# Petfinder Capture Guide

This guide explains how to record a short demo of the Petfinder quiz using Playwright and produce assets (video, screenshots, optional GIF) for the site.

## Prereqs
- Node.js 18+
- Playwright browsers: `npm run playwright:install`
- Optional for GIF: ffmpeg installed and on PATH

## Run the capture
1. Set demo credentials (optional; used if the flow prompts login):
   - macOS/Linux:
     - `export PETFINDER_EMAIL="demo@example.com"`
     - `export PETFINDER_PASSWORD="demo-password"`
   - Windows (PowerShell):
     - `$env:PETFINDER_EMAIL="demo@example.com"`
     - `$env:PETFINDER_PASSWORD="demo-password"`
2. Run the capture:
   - `npm run capture:petfinder`
3. Artifacts are saved to `playwright-artifacts/` (video, screenshots, trace).

## Publish assets
- Copy or move the selected MP4 to `public/video/petfinder-demo.mp4`.
- Choose a representative screenshot as poster and save to `public/img/petfinder-demo/cover.png`.
- Optional preview GIF (requires ffmpeg): `npm run gif:petfinder`.

## Notes
- The live link is volatile; the recorded demo is the canonical showcase.
- Screenshots mask PII fields (email/name/phone/password). Avoid using personal accounts.

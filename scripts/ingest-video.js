const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/ingest-video.js /path/to/recording.(mov|mp4|mkv)');
  console.log('Converts input to public/video/petfinder-demo.webm and generates poster assets via npm scripts.');
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function hasFfmpeg() {
  try { execSync('ffmpeg -version', { stdio: 'ignore' }); return true; } catch { return false; }
}

(async function main() {
  const src = process.argv[2];
  if (!src) { usage(); process.exit(1); }
  if (!fs.existsSync(src)) { console.error(`Input not found: ${src}`); process.exit(1); }
  if (!hasFfmpeg()) { console.error('ffmpeg not found on PATH. Install ffmpeg to continue.'); process.exit(1); }

  const destDir = path.resolve(process.cwd(), 'public', 'video');
  const imgDir = path.resolve(process.cwd(), 'public', 'img', 'petfinder-demo');
  ensureDir(destDir); ensureDir(imgDir);

  const outWebm = path.join(destDir, 'petfinder-demo.webm');

  // Transcode to WebM VP9, scale within 1200x675 and pad to that canvas for consistent aspect
  // Use good quality and reasonable speed settings
  const vf = "scale=w=trunc(iw*min(1200/iw\\,675/ih)/2)*2:h=trunc(ih*min(1200/iw\\,675/ih)/2)*2:flags=lanczos,pad=w=1200:h=675:x=(1200-iw)/2:y=(675-ih)/2:color=black";
  const cmd = `ffmpeg -y -i ${JSON.stringify(src)} -c:v libvpx-vp9 -crf 28 -b:v 0 -vf "${vf}" -an ${JSON.stringify(outWebm)}`;
  console.log('Transcoding to WebM...');
  execSync(cmd, { stdio: 'inherit' });
  console.log('WebM written:', outWebm);

  // Generate poster + webp assets via npm scripts (best-effort)
  try {
    console.log('Generating poster and webp assets...');
    execSync('npm run -s video:assets', { stdio: 'inherit' });
  } catch (e) {
    console.warn('Asset generation failed (optional).');
  }
})();

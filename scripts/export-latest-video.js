const fs = require('fs');
const path = require('path');

function findAll(dir, ext, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const st = fs.statSync(p);
    if (st.isDirectory()) findAll(p, ext, found);
    else if (p.toLowerCase().endsWith(ext)) found.push(p);
  }
  return found;
}

function newest(paths) {
  return paths
    .map(p => ({ p, m: fs.statSync(p).mtimeMs }))
    .sort((a, b) => b.m - a.m)[0]?.p;
}

const roots = [
  path.resolve(process.cwd(), 'test-results'),
  path.resolve(process.cwd(), 'playwright-report'),
  path.resolve(process.cwd(), 'playwright-artifacts'),
  path.resolve(process.cwd())
];

let candidates = [];
for (const r of roots) candidates = findAll(r, '.webm', candidates);

if (!candidates.length) {
  console.error('No .webm files found to export.');
  process.exit(1);
}

const latest = newest(candidates);
const destDir = path.resolve(process.cwd(), 'public', 'video');
const dest = path.join(destDir, 'petfinder-demo.webm');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(latest, dest);
console.log(`Copied latest video to ${dest}`);


import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('homepage renders and is captured', async ({ page }) => {
  const fileUrl = 'file://' + path.resolve(process.cwd(), 'index.html');
  await page.goto(fileUrl);
  await page.waitForLoadState('load');
  // Give fonts/images a moment (best-effort for local file loads)
  await page.waitForTimeout(500);

  const artifactsDir = path.resolve(process.cwd(), 'artifacts');
  if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);

  await page.screenshot({ path: path.join(artifactsDir, 'homepage.png'), fullPage: true });
  expect(fs.existsSync(path.join(artifactsDir, 'homepage.png'))).toBeTruthy();
});


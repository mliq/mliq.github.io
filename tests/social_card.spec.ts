import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('render social card 1200x630', async ({ page }) => {
  const fileUrl = 'file://' + path.resolve(process.cwd(), 'public', 'social-card.html');
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(fileUrl);
  await page.waitForLoadState('load');
  const out = path.resolve(process.cwd(), 'public', 'img', 'social-card.png');
  await page.screenshot({ path: out, fullPage: false });
  expect(fs.existsSync(out)).toBeTruthy();
});


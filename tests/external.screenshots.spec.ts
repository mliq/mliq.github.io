import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function dismissCommonCookieBanners(page) {
  const candidates = [
    'text=/^accept all$/i',
    'text=/^accept$/i',
    'text=/^agree$/i',
    'text=/^got it$/i',
    'text=/^ok$/i',
    'role=button[name=/accept/i]',
    'role=button[name=/agree/i]',
    'button:has-text("Accept")',
  ];
  for (const sel of candidates) {
    try {
      const el = await page.locator(sel).first();
      if (await el.count()) {
        await el.click({ timeout: 1500 });
        break;
      }
    } catch {}
  }
}

test('capture CaringBridge homepage', async ({ page }) => {
  const outDir = path.resolve(process.cwd(), 'artifacts');
  await ensureDir(outDir);

  await page.goto('https://www.caringbridge.org/', { waitUntil: 'load' });
  await dismissCommonCookieBanners(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'caringbridge-home.png'), fullPage: true });
});

test('capture Petfinder demo page', async ({ page }) => {
  const outDir = path.resolve(process.cwd(), 'artifacts');
  await ensureDir(outDir);
  const url = process.env.PLAYWRIGHT_CAPTURE_URL || 'https://www.petfinder.com/user/profile/create/?experience=loginAtEnd&source=adoptionInquiry&animalId=75122044';

  await page.goto(url, { waitUntil: 'load' });
  await dismissCommonCookieBanners(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'petfinder-demo.png'), fullPage: true });
});


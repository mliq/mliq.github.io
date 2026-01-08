import { test, expect } from '@playwright/test';
import path from 'path';

function fileUrl() {
  return 'file://' + path.resolve(process.cwd(), 'index.html');
}

test.describe('Profile behavior (calm, LinkedIn-like)', () => {
  test('Experience section exists and nav points to it', async ({ page }) => {
    await page.goto(fileUrl());
    await expect(page.locator('#experience')).toHaveCount(1);
    const navHref = await page.locator('nav a[href="#experience"]').getAttribute('href');
    expect(navHref).toBe('#experience');
  });

  test('External new-tab links use rel="noopener noreferrer"', async ({ page }) => {
    await page.goto(fileUrl());
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const rel = await links.nth(i).getAttribute('rel');
      expect(rel).toBeTruthy();
      expect(rel?.includes('noopener')).toBeTruthy();
      expect(rel?.includes('noreferrer')).toBeTruthy();
    }
  });

  test('Theme toggle updates aria-checked state', async ({ page }) => {
    await page.goto(fileUrl());
    const toggle = page.locator('.theme-toggle');
    await expect(toggle).toHaveCount(1);
    const before = await toggle.getAttribute('aria-checked');
    await toggle.click();
    const after = await toggle.getAttribute('aria-checked');
    expect(after).not.toBe(before);
  });
});


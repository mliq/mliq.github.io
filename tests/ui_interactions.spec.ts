import { test, expect } from '@playwright/test';
import path from 'path';

function fileUrl() {
  return 'file://' + path.resolve(process.cwd(), 'index.html');
}

test.describe('UI interactions and a11y affordances (minimal)', () => {
  test('skip link exists and targets main', async ({ page }) => {
    await page.goto(fileUrl());
    const skip = page.locator('a.skip-link[href="#main"]');
    await expect(skip).toHaveCount(1);
  });

  test('CTAs visible and actionable', async ({ page }) => {
    await page.goto(fileUrl());
    await expect(page.locator('#home a[href*="linkedin.com/in/liquori"]').first()).toBeVisible();
    await expect(page.locator('a[href*="github.com/mliq"]').first()).toBeVisible();
  });
});

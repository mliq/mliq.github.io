import { test, expect } from '@playwright/test';
import path from 'path';

function fileUrl() {
  return 'file://' + path.resolve(process.cwd(), 'index.html');
}

test('nav aria-current updates on scroll for Experience and About', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(fileUrl());
  await page.waitForLoadState('load');

  // Initially near top; Experience may not yet be current
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await expect(page.locator('nav a[href="#experience"][aria-current="page"]')).toHaveCount(1);

  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await expect(page.locator('nav a[href="#about"][aria-current="page"]')).toHaveCount(1);
});


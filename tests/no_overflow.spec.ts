import { test, expect } from '@playwright/test';
import path from 'path';

async function assertNoHorizontalOverflow(page: any) {
  // wait for fonts/images to settle
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(150);
  const hasOverflow = await page.evaluate(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
    const clientW = Math.max(docEl.clientWidth, body.clientWidth);
    return scrollW > clientW + 1; // allow 1px for subpixel rounding
  });
  expect(hasOverflow, 'No horizontal overflow should occur').toBeFalsy();
}

for (const theme of ['dark', 'light']) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
  const fileUrl = 'file://' + path.resolve(process.cwd(), 'index.html');
  await page.goto(fileUrl);
      await page.evaluate((mode) => {
        document.documentElement.setAttribute('data-theme', mode);
      }, theme);
    });

    test('desktop no horizontal overflow', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await assertNoHorizontalOverflow(page);
    });

    test('tablet no horizontal overflow', async ({ page }) => {
      await page.setViewportSize({ width: 820, height: 900 });
      await assertNoHorizontalOverflow(page);
    });

    test('mobile no horizontal overflow', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await assertNoHorizontalOverflow(page);
    });
  });
}

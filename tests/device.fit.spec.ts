import { test, expect } from '@playwright/test';
import path from 'path';

function fileUrl() {
  return 'file://' + path.resolve(process.cwd(), 'index.html');
}

const viewports = [
  { name: 'desktop', size: { width: 1280, height: 900 } },
  { name: 'tablet', size: { width: 820, height: 900 } },
  { name: 'mobile', size: { width: 375, height: 812 } },
];

for (const theme of ['dark', 'light']) {
  test.describe(`${theme} theme`, () => {
    for (const vp of viewports) {
      test.describe(`${vp.name}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize(vp.size);
          await page.goto(fileUrl());
          await page.waitForLoadState('load');
          await page.evaluate((mode) => {
            document.documentElement.setAttribute('data-theme', mode);
          }, theme);
        });

        test('Petfinder device fits card and animation fills frame', async ({ page }) => {
          const card = page.locator('article.project-card.project-split.petfinder');
          await expect(card).toBeVisible();
          await card.scrollIntoViewIfNeeded();

          const device = card.locator('.device-iphone, .device-tablet, .device-blackberry');
          const frame = device.locator('.device-screen');
          const media = frame.locator('img, video');

          await device.scrollIntoViewIfNeeded();
          await frame.scrollIntoViewIfNeeded();
          await media.first().scrollIntoViewIfNeeded();
          await expect(device).toBeVisible();
          await expect(frame).toBeVisible();
          await expect(media.first()).toBeVisible();

          const cardBox = await card.boundingBox();
          const deviceBox = await device.boundingBox();
          const frameBox = await frame.boundingBox();
          const mediaBox = await media.first().boundingBox();

          expect(cardBox && deviceBox && frameBox && mediaBox).toBeTruthy();
          const tol = 2; // px tolerance

          // Device must sit fully within the card bounds
          expect((deviceBox as any).x).toBeGreaterThanOrEqual((cardBox as any).x - tol);
          expect((deviceBox as any).x + (deviceBox as any).width).toBeLessThanOrEqual((cardBox as any).x + (cardBox as any).width + tol);

          // Media element should fill the frame box (size-wise)
          expect(Math.abs((mediaBox as any).width - (frameBox as any).width)).toBeLessThanOrEqual(1 + tol);
          expect(Math.abs((mediaBox as any).height - (frameBox as any).height)).toBeLessThanOrEqual(1 + tol);
        });

        // Predictor card removed from site; keeping Petfinder-only visual fit checks.
      });
    }
  });
}

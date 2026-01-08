import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Petfinder card layout', () => {
  test('device is on the right of content on desktop', async ({ page }) => {
    // Use file:// so no server dependency
    const fileUrl = 'file://' + path.resolve(process.cwd(), 'index.html');
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto(fileUrl);
    await page.waitForLoadState('load');
    await page.waitForTimeout(200);

  const card = page.locator('article.project-card.project-split.petfinder');
  await expect(card).toBeVisible();

  const content = page.locator('article.project-card.project-split.petfinder > .project-content');
  const device = page.locator('article.project-card.project-split.petfinder .device-iphone, article.project-card.project-split.petfinder .device-tablet');

  // Wait for either iPhone or tablet variant to be present (current site uses tablet)
  await page.waitForSelector('article.project-card.project-split.petfinder .device-iphone, article.project-card.project-split.petfinder .device-tablet', { state: 'attached', timeout: 5000 });

  await expect(content).toBeVisible();
  await expect(device).toBeVisible({ timeout: 5000 });

  const contentBox = await content.boundingBox();
  const deviceBox = await device.boundingBox();

    expect(contentBox).not.toBeNull();
    expect(deviceBox).not.toBeNull();

    // Assert the device column is to the right of the content column
    expect((deviceBox as any).x).toBeGreaterThan((contentBox as any).x + (contentBox as any).width / 2);

    // No actions block required; card focuses on content + media
  });
});

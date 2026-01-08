import { test, expect } from '@playwright/test';
import path from 'path';

function fileUrl() {
  return 'file://' + path.resolve(process.cwd(), 'index.html');
}

test.describe('Card alignment and media column consistency', () => {
  test('media columns align across non-Petfinder cards (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(fileUrl());
    await page.waitForLoadState('load');

    const cards = page.locator('article.project-card.project-split:not(.petfinder)');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    const widths: number[] = [];
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      // Right column media container (which contains the actual media)
      const mediaChild = card.locator('> .project-media').first();
      await mediaChild.scrollIntoViewIfNeeded();
      const box = await mediaChild.boundingBox();
      expect(box).toBeTruthy();
      widths.push(Math.round((box as any).width));
    }
    const maxW = Math.max(...widths);
    const minW = Math.min(...widths);
    expect(maxW - minW).toBeLessThanOrEqual(6); // within 6px tolerance
  });
});


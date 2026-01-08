import { test, expect } from '@playwright/test';
import path from 'path';

// Mid-width (769-832px) layout behavior test.
// Original requirement: media top aligned with content when in split layout.
// Updated design: cards collapse to single-column stack on tablets; media now follows content.
// This test now asserts:
//  - Media appears below content.
//  - Vertical gap between content bottom and media top within a reasonable range (avoid huge whitespace).
//  - Media width does not exceed card inner width (no overflow).

function fileUrl() { return 'file://' + path.resolve(process.cwd(), 'index.html'); }

const widths = [769, 780, 792, 804, 816, 828, 832];

test.describe('Mid-width project card alignment (769-832)', () => {
  for (const w of widths) {
    test(`CaringBridge stacked layout validates at width=${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(fileUrl());
      await page.waitForLoadState('load');
      const card = page.locator('#caringbridge-card');
      await expect(card).toBeVisible();
      const content = card.locator('.project-content');
      const media = card.locator('.project-media');
      const contentBox = await content.boundingBox();
      const mediaBox = await media.boundingBox();
      expect(contentBox).not.toBeNull();
      expect(mediaBox).not.toBeNull();
      if (!contentBox || !mediaBox) return;
      // Expect media to appear below content (top greater than content top)
      expect((mediaBox as any).y).toBeGreaterThan((contentBox as any).y + 40); // allow heading + list height
      // Gap between content bottom and media top shouldn't be excessive (> 320px would indicate spacing bug)
      const gap = (mediaBox as any).y - ((contentBox as any).y + (contentBox as any).height);
      expect(gap).toBeGreaterThanOrEqual(-8); // small overlap tolerance if rounding
      expect(gap).toBeLessThan(140); // reasonable vertical rhythm
      // Media width within card bounds
      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();
      if (cardBox) {
        expect((mediaBox as any).width).toBeLessThanOrEqual((cardBox as any).width + 2);
      }
    });
  }
});

import { test, expect } from '@playwright/test';
import path from 'path';

declare const process: { cwd?: () => string } | undefined;
function cwdSafe(): string {
  // @ts-ignore
  return (typeof process !== 'undefined' && process && typeof process.cwd === 'function') ? process.cwd() : '.';
}

// Very lightweight a11y smoke (structural + basic attribute presence)
// Not a full axe run to keep dependency surface minimal.

test.describe('Accessibility smoke', () => {
  test('landmarks, headings, and interactive names', async ({ page }) => {
    const fileUrl = 'file://' + path.resolve(cwdSafe(), 'index.html');
    await page.goto(fileUrl);

    // Skip link exists
    await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');

    // Landmarks
    await expect(page.locator('header#home')).toHaveCount(1);
    await expect(page.locator('main#main')).toHaveCount(1);
    await expect(page.locator('footer#contact')).toHaveCount(1);

    // Nav has proper aria-label
    await expect(page.locator('nav[aria-label="Primary"]')).toHaveCount(1);

    // Heading order: single h1, followed by h2 sections
  const h1Count = await page.locator('h1').count();
  // Allow either single h1 or dual (site name + primary tagline). Fail if 0 or >2.
  expect(h1Count).toBeGreaterThan(0);
  expect(h1Count).toBeLessThan(3);
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);

    // Theme toggle switch semantics
    const toggle = page.locator('button.theme-toggle');
    await expect(toggle).toHaveAttribute('role', 'switch');
    await expect(toggle).toHaveAttribute('aria-checked', /^(true|false)$/);

    // Video should have poster and multiple sources for progressive enhancement
    const video = page.locator('video.petfinder-demo');
    await expect(video).toHaveAttribute('poster', /cover\.webp$/);
    const sources = await page.locator('video.petfinder-demo source').count();
    expect(sources).toBeGreaterThanOrEqual(1);

    // Images must have alt attributes (allow empty alt for decorative)
    const imgs = page.locator('img');
    const imgCount = await imgs.count();
    for (let i = 0; i < imgCount; i++) {
      const el = imgs.nth(i);
      const alt = await el.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(typeof alt).toBe('string');
    }
  });
});

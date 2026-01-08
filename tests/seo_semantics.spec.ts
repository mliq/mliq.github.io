import { test, expect } from '@playwright/test';
import path from 'path';
// Minimal Node process typings to avoid needing @types/node
declare const process: { cwd?: () => string } | undefined;
function cwdSafe(): string {
  // @ts-ignore
  return (typeof process !== 'undefined' && process && typeof process.cwd === 'function') ? process.cwd() : '.';
}

test.describe('Semantics & SEO', () => {
  test('canonical link is absolute and top-level landmark/branding present', async ({ page }) => {
    const fileUrl = 'file://' + path.resolve(cwdSafe(), 'index.html');
    await page.goto(fileUrl);

    // canonical exists and is absolute
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalHref).toBeTruthy();
    expect(canonicalHref?.startsWith('http')).toBeTruthy();

    // Prefer a single h1. If none (design choice), ensure main landmark and site branding exist.
    const h1Count = await page.locator('h1').count();
    if (h1Count === 0) {
      await expect(page.locator('main#main')).toHaveCount(1);
      await expect(page.locator('header .logo')).toHaveText(/Michael\s+Liquori/i);
    } else {
      expect(h1Count).toBe(1);
    }
  });

  test('JSON-LD for Person and WebSite present', async ({ page }) => {
  const fileUrl = 'file://' + path.resolve(cwdSafe(), 'index.html');
    await page.goto(fileUrl);
    const ldJsonHandles = await page.locator('script[type="application/ld+json"]').all();
    expect(ldJsonHandles.length).toBeGreaterThan(0);
    const contents = await Promise.all(ldJsonHandles.map(h => h.textContent()));
    const joined = contents.filter(Boolean).join('\n');
    expect(joined).toContain('"@type": "Person"');
    expect(joined).toContain('"@type": "WebSite"');
  });

  test('all inline images declare intrinsic dimensions', async ({ page }) => {
    const fileUrl = 'file://' + path.resolve(cwdSafe(), 'index.html');
    await page.goto(fileUrl);
    const imgs = page.locator('img');
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const el = imgs.nth(i);
      await expect(el).toHaveAttribute('width', /.+/);
      await expect(el).toHaveAttribute('height', /.+/);
    }
  });
});

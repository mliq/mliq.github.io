import { test, expect } from '@playwright/test';
import path from 'path';

declare const process: { cwd?: () => string } | undefined;
function cwdSafe(): string {
  // @ts-ignore
  return (typeof process !== 'undefined' && process && typeof process.cwd === 'function') ? process.cwd() : '.';
}

test.describe('Structured Data', () => {
  test('Person & WebSite JSON-LD validity', async ({ page }) => {
    const fileUrl = 'file://' + path.resolve(cwdSafe(), 'index.html');
    await page.goto(fileUrl);
    const handles = await page.locator('script[type="application/ld+json"]').all();
    expect(handles.length).toBeGreaterThan(0);
    const jsonBlocks: any[] = [];
    for (const h of handles) {
      const txt = (await h.textContent()) || '';
      try {
        const parsed = JSON.parse(txt);
        if (Array.isArray(parsed)) jsonBlocks.push(...parsed); else jsonBlocks.push(parsed);
      } catch (e) {
        // Ignore parse errors for non-JSON LD scripts
      }
    }
    const person = jsonBlocks.find(j => j['@type'] === 'Person');
    const site = jsonBlocks.find(j => j['@type'] === 'WebSite');
    expect(person).toBeTruthy();
    expect(site).toBeTruthy();
    if (person) {
      expect(person.name).toBeTruthy();
      expect(person.url).toMatch(/^https?:\/\//);
      expect(Array.isArray(person.sameAs)).toBeTruthy();
    }
    if (site) {
      expect(site.name).toBeTruthy();
      expect(site.url).toMatch(/^https?:\/\//);
    }
  });
});

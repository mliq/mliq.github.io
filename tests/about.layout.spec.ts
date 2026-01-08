import { test, expect } from '@playwright/test';
import path from 'path';
// Mirror helper pattern from other specs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any;
function fileUrl(){ return 'file://' + path.resolve(process.cwd(), 'index.html'); }

// Guardrails for the closing About (footer-like) section.
test.describe('About layout', () => {
  test('closing about measure and spacing', async ({ page }) => {
  await page.goto(fileUrl());
    await page.setViewportSize({ width: 1300, height: 900 });
    const about = page.locator('#about.about-terminal');
    await about.scrollIntoViewIfNeeded();

    const lead = about.locator('.about-terminal-lead');
    await expect(lead).toBeVisible();

    const width = await lead.evaluate(el => el.getBoundingClientRect().width);
    const fontSize = await lead.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    const approxChars = width / (fontSize * 0.55);
    expect.soft(approxChars).toBeLessThanOrEqual(74); // guard upper measure
    expect.soft(approxChars).toBeGreaterThanOrEqual(48); // readable lower bound

    // Heading should precede paragraph and have modest margin.
    const h2 = about.locator('h2');
    const mb = await h2.evaluate(h => parseFloat(getComputedStyle(h).marginBottom));
    expect.soft(mb).toBeLessThanOrEqual(24);
    expect.soft(mb).toBeGreaterThanOrEqual(8);

    // Section has top border line for separation.
    const hasBorder = await about.evaluate(sec => getComputedStyle(sec).borderTopWidth !== '0px');
    expect.soft(hasBorder).toBeTruthy();
  });
});

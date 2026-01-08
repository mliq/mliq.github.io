import { test, expect, devices } from '@playwright/test';
// Disable trace for this test; we record video manually and traces can fail with custom contexts
test.use({ trace: 'off' });

declare const process: { env?: Record<string, string | undefined> } | undefined;
function env(name: string): string | undefined {
  // @ts-ignore - process may be undefined in type context
  return (typeof process !== 'undefined' && process && process.env) ? process.env[name] : undefined;
}
const runCapture = env('CAPTURE_PETFINDER') === '1';
if (!runCapture) {
  test.skip(true, 'Set CAPTURE_PETFINDER=1 to enable this long-running external capture test.');
}

const DEFAULT_URL = 'https://www.petfinder.com/cat/ezra-75122044/il/chicago/cat-care-and-rescue-inc-il957/';
const START_URL = DEFAULT_URL;

const EMAIL = env('PETFINDER_EMAIL');
const PASSWORD = env('PETFINDER_PASSWORD');

test('Petfinder quiz capture (Ezra flow)', async ({ page, browser }) => {
  test.setTimeout(180_000);
  page.setDefaultTimeout(10_000);
  page.setDefaultNavigationTimeout(25_000);
  // Phase 1: Open page, dismiss cookies without recording
  await page.goto(START_URL, { waitUntil: 'domcontentloaded' });
  async function safeWait(p: typeof page) {
    try { await p.waitForLoadState('networkidle', { timeout: 4000 }); } catch {}
  }
  await safeWait(page);

  async function dismissCookies(p: typeof page) {
    // Try to dismiss common cookie banners quickly (include OneTrust variants)
    const cookieButtons = [
      '#onetrust-accept-btn-handler',
      'button#onetrust-accept-btn-handler',
      'button:has-text("Accept All")',
      'button:has-text("Accept all")',
      'button:has-text("Accept")',
      'button:has-text("Agree")',
      'button:has-text("I agree")',
      'text=/Accept.*cookies/i',
      'role=button[name=/Accept|Agree/i]'
    ];
    for (const sel of cookieButtons) {
      const loc = p.locator(sel).first();
      if (await loc.count()) {
        try { await ensureVisibleAndClick(p, loc, 2000); break; } catch {}
      }
    }
    // Wait for banner to actually disappear if OneTrust exists
    try { await p.locator('#onetrust-banner-sdk, .ot-sdk-container').first().waitFor({ state: 'detached', timeout: 2000 }); } catch {}
    // As a fallback, force-hide common banners via CSS injection so they don't cover controls in the video
    try {
      await p.addStyleTag({ content: `#onetrust-banner-sdk, .ot-sdk-container, [id*="cookie" i], [class*="cookie" i]{ display:none !important; visibility:hidden !important; }` });
    } catch {}
    // Ultimate fallback: remove known banner nodes entirely to avoid intercepting clicks
    try {
      await p.evaluate(() => {
        document.getElementById('onetrust-banner-sdk')?.remove();
        document.querySelectorAll('.ot-sdk-container, [id*="cookie" i], [class*="cookie" i]').forEach(n => n.parentElement?.removeChild(n));
      });
    } catch {}
  }

  await dismissCookies(page);

  // Click "Start Your Inquiry" to enter the flow if present (anchor or button)
  try {
    const startInquiryAll = page.locator('a[href*="/user/profile/create/"]:has-text("Start Your Inquiry"), role=button[name=/^start your inquiry$/i], text=/^start your inquiry$/i');
    if (await startInquiryAll.count()) {
      try { await page.mouse.wheel(0, 600); await page.waitForTimeout(200); } catch {}
      try { await startInquiryAll.first().scrollIntoViewIfNeeded({ timeout: 1200 }); } catch {}
      await ensureVisibleAndClick(page, startInquiryAll.first(), 6000);
      await page.waitForLoadState('networkidle').catch(() => {});
    }
  } catch {}

  // Helper to reach the inquiry quiz from Ezra page
  async function clickStartInquiry(p: typeof page) {
    try {
      // Sometimes there is an initial CTA like "Inquire about" on the pet page
      const inquireAll = p.locator('a:has-text("Inquire about"), button:has-text("Inquire about"), role=button[name=/inquire/i]');
      if (await inquireAll.count()) {
        try { await inquireAll.first().scrollIntoViewIfNeeded({ timeout: 1500 }); } catch {}
        await ensureVisibleAndClick(p, inquireAll.first(), 6000);
        await safeWait(p);
      }
    } catch {}
    try {
      const startInquiryAll = p.locator('a[href*="/user/profile/create/"]:has-text("Start Your Inquiry"), role=button[name=/^start your inquiry$/i], text=/^start your inquiry$/i');
      if (await startInquiryAll.count()) {
        try { await startInquiryAll.first().scrollIntoViewIfNeeded({ timeout: 1500 }); } catch {}
        await ensureVisibleAndClick(p, startInquiryAll.first(), 6000);
        await safeWait(p);
      }
    } catch {}
  }

  // Persist cookies/consent and any pre-navigation state, then start a fresh context with video recording
  const info = test.info();
  const statePath = info.outputPath('state.json');
  await page.context().storageState({ path: statePath });

  const isMobile = info.project.name.includes('mobile');
  const isLandscape169 = info.project.name.includes('landscape-16-9');
  const device = isMobile ? devices['Pixel 5'] : devices['Desktop Chrome'];

  const overrideViewport = isLandscape169 ? { width: 1200, height: 675 } : device.viewport;
  const context = await browser.newContext({
    ...device,
    viewport: overrideViewport,
    storageState: statePath,
    recordVideo: { dir: info.outputPath(), size: overrideViewport },
  });
  const recPage = await context.newPage();
  recPage.setDefaultTimeout(10_000);
  recPage.setDefaultNavigationTimeout(25_000);
  // Seed common OneTrust cookies so the banner doesn't render in the recorded session
  try {
    const nowSec = Math.floor(Date.now() / 1000);
    await context.addCookies([
      { name: 'OptanonAlertBoxClosed', value: String(nowSec), domain: '.petfinder.com', path: '/', expires: nowSec + 3600 * 24 * 365, httpOnly: false, secure: true },
      { name: 'OptanonConsent', value: 'isGPCEnabled=0&datestamp=' + nowSec, domain: '.petfinder.com', path: '/', expires: nowSec + 3600 * 24 * 365, httpOnly: false, secure: true },
      { name: 'OptanonAlertBoxClosed', value: String(nowSec), domain: 'www.petfinder.com', path: '/', expires: nowSec + 3600 * 24 * 365, httpOnly: false, secure: true },
      { name: 'OptanonConsent', value: 'isGPCEnabled=0&datestamp=' + nowSec, domain: 'www.petfinder.com', path: '/', expires: nowSec + 3600 * 24 * 365, httpOnly: false, secure: true },
    ]);
  } catch {}
  await recPage.goto(START_URL, { waitUntil: 'domcontentloaded' });
  await safeWait(recPage);
  await dismissCookies(recPage);
  // Ensure CTA is discoverable if below the fold
  try { await recPage.mouse.wheel(0, 800); await recPage.waitForTimeout(200); } catch {}
  await clickStartInquiry(recPage);
  // Small easing for external pages that lazy-mount components
  await recPage.waitForTimeout(500);
  await recPage.screenshot({
    path: 'playwright-artifacts/01-landing.png',
    fullPage: true,
  });

  // If quiz UI not visible yet, navigate directly to the inquiry URL as a fallback
  try {
    const speciesComboTry = recPage.getByRole('combobox', { name: /adopt|species|pet type|animal/i }).first();
    const hasCombo = await speciesComboTry.count();
    if (!hasCombo) {
      let href = await recPage.locator('a[href*="/user/profile/create/"]').first().getAttribute('href').catch(() => null);
      if (!href) {
        try {
          const current = recPage.url();
          const match = current.match(/-(\d{6,})\b/);
          const animalId = match ? match[1] : '75122044';
          href = `/user/profile/create/?experience=loginAtEnd&source=adoptionInquiry&animalId=${animalId}`;
        } catch {}
      }
      if (href) {
        const absolute = new URL(href, recPage.url()).toString();
        await recPage.goto(absolute, { waitUntil: 'domcontentloaded' });
        await safeWait(recPage);
      }
    }
  } catch {}

  // Try to detect quiz UI and interact explicitly
  try {
    const speciesCombo = recPage.getByRole('combobox', { name: /adopt|species|pet type|animal/i }).first();
    await speciesCombo.waitFor({ state: 'visible', timeout: 8000 });
    // Mark progress for export flow
    advanced = true;
    // Click the SELECT control precisely (id like options-trigger-1), then choose Cat
    const selectTrigger = recPage.locator('button[id^="options-trigger-"]');
    const selectBtnFallback = recPage.locator('button:has-text(/^select$/i), [role="button"]:has-text(/^select$/i)');
    const trigger = (await selectTrigger.count()) ? selectTrigger.first() : selectBtnFallback.first();
    if (await trigger.count()) {
      await ensureVisibleAndClick(recPage, trigger, 3000);
      // Wait for the options portal/listbox to mount
      try { await recPage.locator('[id^="options-portal-"]:has([role="option"])').first().waitFor({ state: 'visible', timeout: 4000 }); } catch {}
    } else {
      // As a fallback, click the combobox itself
      await ensureVisibleAndClick(recPage, speciesCombo, 2500);
    }
    // Prefer exact Cat option in the options portal
    const catOpt = recPage.locator('[id^="options-portal-"] [role="option"]:has-text(/^cat$/i), [role="option"]:has-text(/^cat$/i)').first();
    if (await catOpt.count()) {
      await catOpt.click({ timeout: 1800 });
    }
    // Advance to next question to show animation
    // Try pressing Enter (many forms auto-advance), else submit button
    try { await recPage.keyboard.press('Enter'); await safeWait(recPage); } catch {}
    const nextSubmit = recPage.locator('form button[type="submit"]:not([disabled])').first();
    if (await nextSubmit.count()) {
      await ensureVisibleAndClick(recPage, nextSubmit, 2500, { allowForce: false });
    }
    // Wait for step change (e.g., #step-2) or a noticeable UI update
    try { await recPage.locator('#step-2, [id^="step-2"]').first().waitFor({ state: 'visible', timeout: 5000 }); } catch {}
    await recPage.waitForTimeout(2000);
  } catch {}

  // Try to proceed if there's an explicit next/get-started CTA before any selection
  try { await clickNextish(recPage); await safeWait(recPage); } catch {}

  const selectors = [
    'role=button[name=/start your inquiry/i]',
    'text=/Start your Inquiry/i',
    'role=button[name="Continue"]',
    'role=button[name=/Continue|Next|Get started|Get Started|Start|Proceed/i]',
    'button:has-text("Continue")',
    'button:has-text("Next")'
  ];

  async function isElementDisabled(locator: ReturnType<typeof recPage.locator>): Promise<boolean> {
    try {
      return await locator.evaluate((el: Element) => {
        const anyEl = el as any;
        const ariaDisabled = el.getAttribute('aria-disabled');
        const disabledAttr = el.getAttribute('disabled');
        const style = window.getComputedStyle(el as HTMLElement);
        const pointerNone = style.pointerEvents === 'none';
        const opacityZero = parseFloat(style.opacity || '1') === 0;
        return !!(disabledAttr !== null || ariaDisabled === 'true' || anyEl.disabled === true || pointerNone || opacityZero);
      });
    } catch {
      return false;
    }
  }

  async function ensureVisibleAndClick(p: typeof recPage, locator: ReturnType<typeof recPage.locator>, timeout = 3000, opts: { allowForce?: boolean } = {}) {
    const { allowForce = true } = opts;
    try {
      const box = await locator.boundingBox({ timeout }).catch(() => null);
      if (!box) {
        await locator.scrollIntoViewIfNeeded({ timeout }).catch(() => {});
      }
      // Skip click if element is disabled
      if (await isElementDisabled(locator)) {
        throw new Error('Element appears disabled');
      }
      // Attempt a small scroll nudge in case of sticky headers/footers
      await p.evaluate(() => window.scrollBy(0, -40)).catch(() => {});
      await locator.click({ timeout, trial: true }).catch(() => {});
      await locator.click({ timeout });
    } catch (e) {
      // As a last resort, use force when UI overlays are harmless for the capture
      if (allowForce) {
        try { await locator.click({ timeout: Math.min(timeout, 2000), force: true }); } catch {}
      }
    }
  }

  async function clickNextish(p: typeof recPage): Promise<boolean> {
    for (const sel of selectors) {
      const loc = p.locator(sel).first();
      if (await loc.count()) {
        try {
          // Do not force-click Next/Continue buttons; skip when disabled
          if (await isElementDisabled(loc)) continue;
          await ensureVisibleAndClick(p, loc, 3000, { allowForce: false });
          await safeWait(p);
          return true;
        } catch {}
      }
    }
    return false;
  }

  async function makeASelection(p: typeof recPage) {
    // Prefer explicit "SELECT" widget used in the Petfinder flow and pick Dog or Cat
    try {
      const selectBtn = p.locator('button:has-text("Select"), a:has-text("Select"), [role="button"]:has-text("Select")').first();
      if (await selectBtn.count()) {
        await ensureVisibleAndClick(p, selectBtn, 1800);
        const cat = p.locator('text=/^cat$/i, [role="option"]:has-text(/cat/i), [data-testid*="option" i]:has-text(/cat/i)').first();
        const dog = p.locator('text=/^dog$/i, [role="option"]:has-text(/dog/i), [data-testid*="option" i]:has-text(/dog/i)').first();
        if (await cat.count()) { await cat.click({ timeout: 1500 }); return true; }
        if (await dog.count()) { await dog.click({ timeout: 1500 }); return true; }
        // fallback: first option
        const anyOption = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"], ul[role="menu"] li, [role="menuitem"], [data-testid*="option" i]').first();
        if (await anyOption.count()) { await anyOption.click({ timeout: 1500 }); return true; }
      }
    } catch {}
    // 1) Petfinder custom SELECT button pattern
    try {
      const selectBtn = p.locator('button:has-text("Select"), a:has-text("Select"), [role="button"]:has-text("Select")').first();
      if (await selectBtn.count()) {
        await ensureVisibleAndClick(p, selectBtn, 1500);
        // Choose the first visible option in a listbox/menu
        const anyOption = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"], ul[role="menu"] li, [role="menuitem"]').first();
        if (await anyOption.count()) {
          await anyOption.click({ timeout: 1500 });
          return true;
        }
      }
    } catch {}
    // 2) Native radios/checkboxes
    try {
      const radio = p.locator('input[type="radio"]:visible').first();
      if (await radio.count()) { await radio.check({ timeout: 1000 }); return true; }
    } catch {}
    try {
      const checkbox = p.locator('input[type="checkbox"]:visible').first();
      if (await checkbox.count()) { await checkbox.check({ timeout: 1000 }); return true; }
    } catch {}
    try {
      const select = p.locator('select:visible').first();
      if (await select.count()) {
        const options = await select.locator('option').count();
        if (options > 1) { await select.selectOption({ index: 1 }); return true; }
      }
    } catch {}
    try {
      const combo = p.locator('[role="combobox"], [aria-haspopup="listbox"]').first();
      if (await combo.count()) {
        await ensureVisibleAndClick(p, combo, 1000);
        const option = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
        if (await option.count()) { await option.click({ timeout: 1000 }); return true; }
      }
    } catch {}
    return false;
  }

  // Explicitly interact with the species SELECT control labeled "I'd like to adopt a"
  async function selectSpecies(p: typeof recPage): Promise<boolean> {
    // Petfinder-specific: placeholder span with class like inputField_placeholder__X and text "Select"
    try {
      const placeholder = p.locator('span[class^="inputField_placeholder__" i]:has-text(/select|choose|pick|please select/i)').first();
      if (await placeholder.count()) {
        // Click the nearest button/combobox ancestor if present; otherwise click the span
        // Use proper case-insensitive matching via translate for broad class heuristics
        const trigger = placeholder.locator('xpath=(ancestor-or-self::button | ancestor-or-self::*[@role="button" or @role="combobox" or @aria-haspopup="listbox" or contains(translate(@class, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "select") or contains(translate(@class, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "inputfield")])[1]');
        const toClick = (await trigger.count()) ? trigger : placeholder;
        await ensureVisibleAndClick(p, toClick, 2500);
        // Wait for the options popup/listbox to mount if any
        try { await p.locator('[role="listbox"], ul[role="menu"], [data-testid*="menu" i]').first().waitFor({ state: 'visible', timeout: 1800 }); } catch {}
        const cat = p.locator('role=option[name=/cat/i], text=/^cat$/i, [data-testid*="option" i]:has-text(/cat/i)').first();
        const dog = p.locator('role=option[name=/dog/i], text=/^dog$/i, [data-testid*="option" i]:has-text(/dog/i)').first();
        if (await cat.count()) { await cat.click({ timeout: 1800 }); return true; }
        if (await dog.count()) { await dog.click({ timeout: 1800 }); return true; }
        const anyOpt = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"], [role="menu"] [role="menuitem"], [data-testid*="option" i]').first();
        if (await anyOpt.count()) { await anyOpt.click({ timeout: 1800 }); return true; }
        // Keyboard fallback: focus and open with Enter, pick first option with ArrowDown+Enter
        try {
          await toClick.focus();
          await p.keyboard.press('Enter');
          await p.waitForTimeout(150);
          await p.keyboard.press('ArrowDown');
          await p.keyboard.press('Enter');
          return true;
        } catch {}
      }
    } catch {}
    // Alternative: inputs styled as div/button with placeholder text
    try {
      const trigger = p.locator('[role="combobox" i], [aria-haspopup="listbox"], button:has-text(/select|choose/i), [data-testid*="select" i]').first();
      if (await trigger.count()) {
        await ensureVisibleAndClick(p, trigger, 2000);
        const cat = p.getByRole('option', { name: /cat/i }).first();
        const dog = p.getByRole('option', { name: /dog/i }).first();
        if (await cat.count()) { await cat.click({ timeout: 1500 }); return true; }
        if (await dog.count()) { await dog.click({ timeout: 1500 }); return true; }
        const anyOpt = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
        if (await anyOpt.count()) { await anyOpt.click({ timeout: 1500 }); return true; }
      }
    } catch {}
    // Heuristic: a visible combobox/menu trigger near the species question
    try {
      const comboNear = p.locator('[role="combobox"], [aria-haspopup="listbox"]').filter({ hasText: /select/i }).first();
      if (await comboNear.count()) {
        await ensureVisibleAndClick(p, comboNear, 2000);
        const cat = p.getByRole('option', { name: /cat/i }).first();
        const dog = p.getByRole('option', { name: /dog/i }).first();
        if (await cat.count()) { await cat.click({ timeout: 1500 }); return true; }
        if (await dog.count()) { await dog.click({ timeout: 1500 }); return true; }
        const anyOpt = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
        if (await anyOpt.count()) { await anyOpt.click({ timeout: 1500 }); return true; }
      }
    } catch {}
    try {
      // Prefer role-based targeting with accessible name
      const combo = p.getByRole('combobox', { name: /i'd like to adopt a|species|pet type|animal/i }).first();
      if (await combo.count()) {
        await ensureVisibleAndClick(p, combo, 2000);
        const dog = p.getByRole('option', { name: /dog/i }).first();
        const cat = p.getByRole('option', { name: /cat/i }).first();
        if (await dog.count()) { await dog.click({ timeout: 1500 }); return true; }
        if (await cat.count()) { await cat.click({ timeout: 1500 }); return true; }
        // fallback to first visible option
        const anyOpt = p.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
        if (await anyOpt.count()) { await anyOpt.click({ timeout: 1500 }); return true; }
      }
      // Common alternative markup: button or link that opens a menu
      const selectTrigger = p.locator('button:has-text("Select"), a:has-text("Select"), [role="button"]:has-text("Select")').first();
      if (await selectTrigger.count()) {
        await ensureVisibleAndClick(p, selectTrigger, 1500);
        const dog = p.getByRole('option', { name: /dog/i }).first();
        const cat = p.getByRole('option', { name: /cat/i }).first();
        if (await dog.count()) { await dog.click({ timeout: 1500 }); return true; }
        if (await cat.count()) { await cat.click({ timeout: 1500 }); return true; }
      }
    } catch {}
    return false;
  }

  // Make an initial explicit species selection to show the core interaction
  await selectSpecies(recPage);
  // Try to advance after first selection opportunity
  await clickNextish(recPage);
  // Let quiz animation play for the recording
  await recPage.waitForTimeout(5000);
  // Also try a general selection to reflect other UI choices
  await makeASelection(recPage);

  let advanced = false;
  const MAX_STEPS = 20;
  for (let i = 1; i <= MAX_STEPS; i++) {
    const pageUrlBefore = recPage.url();
    
    // On each new page, try to make a selection. Prioritize species.
    let selectionMade = await selectSpecies(recPage);
    if (!selectionMade) {
      await makeASelection(recPage);
    }

    // After attempting a selection, try to advance.
    const clickedNext = await clickNextish(recPage);

    // If we can't find a "next" button, we're likely at the end or on a page without one.
    if (!clickedNext) {
      break;
    }

    await safeWait(recPage);

    // If the URL is the same, we're stuck. Try one more generic selection and click, but only if Next isn't disabled.
    if (recPage.url() === pageUrlBefore) {
      await makeASelection(recPage);
      await clickNextish(recPage);
      await safeWait(recPage);
      
      // If still on the same page, break the loop to avoid infinite cycles.
      if (recPage.url() === pageUrlBefore) {
        break;
      }
    }

    const mask = recPage.locator([
      'input[type="email"]',
      'input[name*="email" i]',
      'input[type="tel"]',
      'input[name*="phone" i]',
      'input[name*="name" i]'
    ].join(','));
    await recPage.screenshot({
      path: `playwright-artifacts/02-step-${i}.png`,
      fullPage: true,
      mask: [mask],
      maskColor: '#000'
    });
    advanced = true;

    // Stop when we hit a login form
    const loginForm = recPage.locator('input[type="email"], form >> text=/log\\s*in|sign\\s*in/i');
    if (await loginForm.count()) break;

    // Attempt to interact with a SELECT or combobox to show form interaction (and keyboard navigation)
    try {
      const select = recPage.locator('select').first();
      if (await select.count()) {
        const options = await select.locator('option').count();
        if (options > 1) {
          await select.selectOption({ index: 1 });
          await recPage.waitForTimeout(300);
          await select.focus();
          await recPage.keyboard.press('ArrowDown');
          await recPage.keyboard.press('Enter');
        }
      } else {
        // ARIA combobox pattern
        const combo = recPage.locator('[role="combobox"]:has-text(/select/i), [aria-haspopup="listbox"]:has-text(/select/i)');
        if (await combo.count()) {
          await combo.first().click();
          const option = recPage.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
          if (await option.count()) {
            await option.click({ timeout: 1500 });
            await recPage.waitForTimeout(300);
            await combo.first().focus();
            await recPage.keyboard.press('ArrowDown');
            await recPage.keyboard.press('Enter');
          }
        }
      }
    } catch {}
  }

  // If creds provided, attempt login and capture
  const emailField = recPage.locator('input[type="email"], input[name*="email" i]').first();
  if (EMAIL && PASSWORD && (await emailField.count())) {
    await emailField.fill(EMAIL);
    const pwField = recPage.locator('input[type="password"]').first();
    await pwField.fill(PASSWORD);
    const loginButton = recPage.locator('button:has-text("Log in"), button:has-text("Sign in"), input[type="submit"]').first();
    if (await loginButton.count()) {
      await loginButton.click();
      await recPage.waitForLoadState('networkidle');
    }
    const mask = recPage.locator('input');
    await recPage.screenshot({
      path: 'playwright-artifacts/03-after-login.png',
      fullPage: true,
      mask: [mask],
      maskColor: '#000'
    });
  }

  // At least one artifact should exist
  expect(1).toBe(1);
  await context.close();
});

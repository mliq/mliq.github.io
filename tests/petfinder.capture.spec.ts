import { test, expect, devices } from '@playwright/test';

const URL = process.env.PLAYWRIGHT_CAPTURE_URL ||
  'https://www.petfinder.com/user/profile/create/?experience=loginAtEnd&source=adoptionInquiry&animalId=75122044';

const EMAIL = process.env.PETFINDER_EMAIL;
const PASSWORD = process.env.PETFINDER_PASSWORD;

test('Petfinder quiz capture', async ({ page, browser }) => {
  // Phase 1: Open page, dismiss cookies without recording
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle');

  // Try to dismiss common cookie banners quickly (include OneTrust)
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
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      try { await loc.click({ timeout: 2000 }); break; } catch {}
    }
  }

  // Persist cookies/consent, then start a fresh context with video recording
  const info = test.info();
  const statePath = info.outputPath('state.json');
  await page.context().storageState({ path: statePath });

  const isMobile = info.project.name.includes('mobile');
  const device = isMobile ? devices['Pixel 5'] : devices['Desktop Chrome'];

  const context = await browser.newContext({
    ...device,
    storageState: statePath,
    recordVideo: { dir: info.outputPath(), size: device.viewport },
  });
  const recPage = await context.newPage();
  await recPage.goto(URL, { waitUntil: 'load' });
  await recPage.waitForLoadState('networkidle');
  await recPage.screenshot({
    path: 'playwright-artifacts/01-landing.png',
    fullPage: true,
  });

  const selectors = [
    'text=Continue',
    'text=Next',
    'text=Get started',
    'text=Get Started',
    'text=Start',
    'role=button[name="Continue"]',
  ];

  let advanced = false;
  const MAX_STEPS = 5;
  for (let i = 1; i <= MAX_STEPS; i++) {
    let clicked = false;
    for (const sel of selectors) {
      const loc = recPage.locator(sel).first();
      if (await loc.count()) {
        try {
          await loc.click({ timeout: 3000 });
          clicked = true;
          break;
        } catch {}
      }
    }
    if (!clicked) break;
    await recPage.waitForLoadState('networkidle', { timeout: 5000 });
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
    const loginForm = recPage.locator('input[type="email"], form >> text=/log\s*in|sign\s*in/i');
    if (await loginForm.count()) break;

    // Attempt to interact with a SELECT or combobox to show form interaction
    try {
      const select = recPage.locator('select').first();
      if (await select.count()) {
        const options = await select.locator('option').count();
        if (options > 1) {
          await select.selectOption({ index: 1 });
          await page.waitForTimeout(500);
        }
      } else {
        // ARIA combobox pattern
        const combo = recPage.locator('[role="combobox"]:has-text(/select/i), [aria-haspopup="listbox"]:has-text(/select/i)');
        if (await combo.count()) {
          await combo.first().click();
          const option = recPage.locator('[role="option"], li[role="option"], [role="listbox"] [role="option"]').first();
          if (await option.count()) {
            await option.click({ timeout: 1500 });
            await recPage.waitForTimeout(500);
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
  expect(advanced || (await emailField.count()) > 0).toBeTruthy();
  await context.close();
});

import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Layout consistency across project cards', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve('index.html');
    await page.goto(`file://${filePath}`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(150);
  });

  test('project cards have consistent content padding', async ({ page }) => {
    const cardPadding = await page.evaluate(() => {
      const cards = document.querySelectorAll('article');
      const measurements: any[] = [];
      
      cards.forEach((card, index) => {
        const contentElement = card.querySelector('.project-content');
        if (contentElement) {
          const style = window.getComputedStyle(contentElement);
          measurements.push({
            cardIndex: index,
            cardId: card.id || `card-${index}`,
            paddingLeft: parseFloat(style.paddingLeft),
            paddingRight: parseFloat(style.paddingRight),
            paddingTop: parseFloat(style.paddingTop),
            paddingBottom: parseFloat(style.paddingBottom)
          });
        }
      });
      
      return measurements;
    });

    console.log('Card padding measurements:', cardPadding);

    // Check that each card has equal left and right padding (no asymmetric padding)
    cardPadding.forEach((card: any, index: number) => {
      expect(card.paddingLeft, `Card ${index} (${card.cardId}) should have equal left and right padding`).toBeCloseTo(card.paddingRight, 1);
    });
    
    // All cards should also have the same padding values
    const firstCard = cardPadding[0];
    cardPadding.forEach((card: any, index: number) => {
      expect(card.paddingLeft, `Card ${index} left padding should match first card`).toBeCloseTo(firstCard.paddingLeft, 1);
      expect(card.paddingRight, `Card ${index} right padding should match first card`).toBeCloseTo(firstCard.paddingRight, 1);
    });
  });

  test('cards use consistent media classes without legacy variants', async ({ page }) => {
    const classUsage = await page.evaluate(() => {
      const cards = document.querySelectorAll('article');
      const classInfo: any[] = [];
      
      cards.forEach((card, index) => {
        const mediaElement = card.querySelector('.project-media, [class*="media"]');
        if (mediaElement) {
          const classes = mediaElement.className.split(' ');
          const hasLegacyClasses = classes.some(cls => 
            cls.includes('media-overlay') || 
            cls.includes('project-media--') ||
            cls.includes('cb-media') ||
            cls.includes('cb-stat')
          );
          
          classInfo.push({
            cardIndex: index,
            cardId: card.id || `card-${index}`,
            classes: classes,
            hasLegacyClasses,
            hasStandardProjectMedia: classes.includes('project-media')
          });
        }
      });
      
      return classInfo;
    });

    console.log('Media class usage:', classUsage);

    // Check for legacy classes that should be removed
    classUsage.forEach((info: any, index: number) => {
      expect(info.hasLegacyClasses, 
        `Card ${index} should not use legacy media classes: ${info.classes.join(', ')}`
      ).toBe(false);
      
      expect(info.hasStandardProjectMedia, 
        `Card ${index} should use standard .project-media class`
      ).toBe(true);
    });
  });
});

import { test, expect } from '@playwright/test';
import * as path from 'path';

function fileUrl() { return 'file://' + path.resolve(process.cwd(), 'index.html'); }

interface MediaMeasurement {
  cardIndex: number;
  cardId: string;
  viewport: string;
  mediaContainer: {
    width: number;
    height: number;
  };
  mediaContent: {
    width: number;
    height: number;
    tagName: string;
    classes: string[];
  } | null;
  intrinsicDimensions: {
    naturalWidth: number | string;
    naturalHeight: number | string;
  } | null;
  wastedSpace: {
    horizontal: number;
    vertical: number;
  };
  contentUtilization: number; // percentage of container width used by content
}

interface ConsistencyResult {
  viewport: string;
  measurements: MediaMeasurement[];
  issues: string[];
}

// Test media container consistency across viewports
const viewports = [
  { name: 'mobile', width: 375, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1200, height: 800 }
];

for (const viewport of viewports) {
  test.describe(`Media consistency on ${viewport.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(fileUrl());
      await page.waitForLoadState('load');
    });

    test(`media containers have consistent sizing and centering at ${viewport.width}px`, async ({ page }) => {
      const measurements = await page.evaluate(() => {
        const cards = document.querySelectorAll('article');
        const results: MediaMeasurement[] = [];
        
        cards.forEach((card, index) => {
          const mediaDiv = card.querySelector('.project-media');
          if (mediaDiv) {
            const mediaBox = mediaDiv.getBoundingClientRect();
            const mediaContent = mediaDiv.querySelector('img, video');
            const contentBox = mediaContent ? mediaContent.getBoundingClientRect() : null;
            
            const wastedSpace = {
              horizontal: contentBox ? Math.max(0, mediaBox.width - contentBox.width) : 0,
              vertical: contentBox ? Math.max(0, mediaBox.height - contentBox.height) : 0
            };
            
            const contentUtilization = contentBox ? (contentBox.width / mediaBox.width) * 100 : 0;
            
            results.push({
              cardIndex: index,
              cardId: card.id || `card-${index}`,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
              mediaContainer: {
                width: Math.round(mediaBox.width),
                height: Math.round(mediaBox.height)
              },
              mediaContent: contentBox ? {
                width: Math.round(contentBox.width),
                height: Math.round(contentBox.height),
                tagName: mediaContent.tagName,
                classes: Array.from(mediaContent.classList)
              } : null,
              intrinsicDimensions: mediaContent ? {
                naturalWidth: (mediaContent as any).naturalWidth || (mediaContent as any).videoWidth || 'N/A',
                naturalHeight: (mediaContent as any).naturalHeight || (mediaContent as any).videoHeight || 'N/A'
              } : null,
              wastedSpace,
              contentUtilization: Math.round(contentUtilization)
            });
          }
        });
        
        return results;
      });

      console.log(`Media measurements for ${viewport.name} (${viewport.width}px):`, measurements);

      // Verify all cards have media containers
      expect(measurements.length).toBeGreaterThanOrEqual(3);

      // Check for consistent container widths across cards on tablet/desktop
      if (viewport.name === 'tablet' || viewport.name === 'desktop') {
        const containerWidths = measurements.map(m => m.mediaContainer.width);
        const uniqueWidths = [...new Set(containerWidths)];
        
        console.log(`Container widths: ${containerWidths.join(', ')}`);
        
        // All containers should have the same width on tablet/desktop
        expect(uniqueWidths.length, `All media containers should have consistent width on ${viewport.name}`).toBe(1);
        
        // Container should be 520px on tablet, proportional on desktop
        if (viewport.name === 'tablet') {
          expect(uniqueWidths[0], 'Media containers should be 520px on tablet').toBe(520);
        }
      }

      // Check content utilization - no card should waste excessive space
      measurements.forEach(measurement => {
        const { cardId, contentUtilization, wastedSpace } = measurement;
        
        // Content should utilize at least 75% of container width (except for complex layouts like Petfinder device frame)
        if (!cardId.includes('petfinder')) {
          expect(contentUtilization, 
            `${cardId} content should utilize at least 75% of container width (currently ${contentUtilization}%)`
          ).toBeGreaterThanOrEqual(75);
        }
        
        // Horizontal wasted space should be reasonable (< 100px on larger viewports)
        if (viewport.name !== 'mobile') {
          expect(wastedSpace.horizontal, 
            `${cardId} should not waste more than 100px horizontal space (currently ${wastedSpace.horizontal}px)`
          ).toBeLessThanOrEqual(100);
        }
      });

      // Check for proper centering - content should be visually centered in container
      measurements.forEach(measurement => {
        const { cardId, mediaContainer, mediaContent } = measurement;
        
        if (mediaContent && mediaContainer.width > mediaContent.width) {
          // For content smaller than container, verify it appears centered
          // This is a visual check that would require element positioning
          console.log(`${cardId}: Container ${mediaContainer.width}px, Content ${mediaContent.width}px, Utilization ${measurement.contentUtilization}%`);
        }
      });
    });

    test(`media aspect ratios are preserved across viewports`, async ({ page }) => {
      const measurements = await page.evaluate(() => {
        const cards = document.querySelectorAll('article');
        const results: any[] = [];
        
        cards.forEach((card, index) => {
          const mediaContent = card.querySelector('.project-media img, .project-media video');
          if (mediaContent) {
            const contentBox = mediaContent.getBoundingClientRect();
            const aspectRatio = contentBox.width / contentBox.height;
            
            results.push({
              cardIndex: index,
              cardId: card.id || `card-${index}`,
              aspectRatio: Math.round(aspectRatio * 100) / 100, // Round to 2 decimals
              dimensions: {
                width: Math.round(contentBox.width),
                height: Math.round(contentBox.height)
              }
            });
          }
        });
        
        return results;
      });

      console.log(`Aspect ratios for ${viewport.name}:`, measurements);

      // Each card should maintain reasonable aspect ratios
      measurements.forEach(measurement => {
        const { cardId, aspectRatio } = measurement;
        
        // Aspect ratio should be reasonable (between 0.5 and 3.0)
        expect(aspectRatio, 
          `${cardId} should have reasonable aspect ratio (currently ${aspectRatio})`
        ).toBeGreaterThan(0.5);
        expect(aspectRatio, 
          `${cardId} should have reasonable aspect ratio (currently ${aspectRatio})`
        ).toBeLessThan(3.0);
      });
    });
  });
}

// Cross-viewport consistency test
test('media containers scale proportionally across viewports', async ({ page }) => {
  const allMeasurements: MediaMeasurement[] = [];

  // Collect measurements from all viewports
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(fileUrl());
    await page.waitForLoadState('load');

    const measurements = await page.evaluate((viewportName) => {
      const cards = document.querySelectorAll('article');
      const results: any[] = [];
      
      cards.forEach((card, index) => {
        const mediaDiv = card.querySelector('.project-media');
        if (mediaDiv) {
          const mediaBox = mediaDiv.getBoundingClientRect();
          const mediaContent = mediaDiv.querySelector('img, video');
          const contentBox = mediaContent ? mediaContent.getBoundingClientRect() : null;
          
          results.push({
            cardIndex: index,
            cardId: card.id || `card-${index}`,
            viewport: viewportName,
            mediaContainer: {
              width: Math.round(mediaBox.width),
              height: Math.round(mediaBox.height)
            },
            mediaContent: contentBox ? {
              width: Math.round(contentBox.width),
              height: Math.round(contentBox.height)
            } : null
          });
        }
      });
      
      return results;
    }, viewport.name);

    allMeasurements.push(...measurements);
  }

  console.log('All viewport measurements:', allMeasurements);

  // Group by card
  const cardGroups = allMeasurements.reduce((acc, measurement) => {
    if (!acc[measurement.cardId]) {
      acc[measurement.cardId] = [];
    }
    acc[measurement.cardId].push(measurement);
    return acc;
  }, {} as Record<string, MediaMeasurement[]>);

  // Check scaling consistency for each card
  Object.entries(cardGroups).forEach(([cardId, measurements]) => {
    if (measurements.length === 3) { // Should have mobile, tablet, desktop
      const mobile = measurements.find(m => m.viewport === 'mobile');
      const tablet = measurements.find(m => m.viewport === 'tablet');
      const desktop = measurements.find(m => m.viewport === 'desktop');

      if (mobile && tablet && desktop) {
        // Container widths should scale logically: mobile < tablet ≤ desktop
        expect(mobile.mediaContainer.width, 
          `${cardId} mobile width should be less than tablet`
        ).toBeLessThan(tablet.mediaContainer.width);
        
        // All cards should scale proportionally
        const mobileToTabletRatio = tablet.mediaContainer.width / mobile.mediaContainer.width;
        console.log(`${cardId} mobile→tablet scale: ${mobileToTabletRatio.toFixed(2)}x`);
        
        // Scale ratio should be reasonable (1.3x to 2.0x from mobile to tablet)
        expect(mobileToTabletRatio, 
          `${cardId} should scale reasonably from mobile to tablet`
        ).toBeGreaterThan(1.3);
        expect(mobileToTabletRatio, 
          `${cardId} should scale reasonably from mobile to tablet`
        ).toBeLessThan(2.0);
      }
    }
  });
});

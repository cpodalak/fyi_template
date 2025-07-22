import { expect, test } from '@playwright/test';

test.describe('Content Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should display reading widget with content from reading.json', async ({ page }) => {
    // Check if the reading widget is present
    const readingWidget = page.locator('h3:has-text("Reading Journey & Book Notes")');
    await expect(readingWidget).toBeVisible();

    // Check for reading tabs
    await expect(page.locator('button:has-text("Currently Reading")')).toBeVisible();
    await expect(page.locator('button:has-text("Completed")')).toBeVisible();
    await expect(page.locator('button:has-text("Want to Read")')).toBeVisible();

    // Check for book content from reading.json
    // This should show content from the JSON file, not hardcoded data
    const bookTitle = page.locator('h4:has-text("Designing Data-Intensive Applications")');
    await expect(bookTitle).toBeVisible();

    // Check for author
    const authorText = page.locator('text=Martin Kleppmann');
    await expect(authorText).toBeVisible();

    // Check for progress bar
    const progressText = page.locator('text=65%');
    await expect(progressText).toBeVisible();

    // Test tab switching functionality
    await page.click('button[data-tab="read"]');
    await expect(page.locator('text=Atomic Habits')).toBeVisible();
    await expect(page.locator('text=James Clear')).toBeVisible();

    await page.click('button[data-tab="wishlist"]');
    await expect(page.locator('text=Fundamentals of Software Architecture')).toBeVisible();
  });

  test('should display gists widget with content from gists.json', async ({ page }) => {
    // Check if the gists widget is present
    const gistsWidget = page.locator('h3:has-text("Code Snippets & Gists")');
    await expect(gistsWidget).toBeVisible();

    // Check for gist content from gists.json
    const gistTitle = page.locator('text=React Custom Hooks Collection');
    await expect(gistTitle).toBeVisible();

    // Check for language tags
    const typeScriptTag = page.locator('text=TypeScript');
    await expect(typeScriptTag).toBeVisible();

    // Check for file names
    const fileName = page.locator('code:has-text("useLocalStorage.ts")');
    await expect(fileName).toBeVisible();

    // Test language filter functionality
    await page.selectOption('#language-filter', 'TypeScript');
    await expect(gistTitle).toBeVisible();

    await page.selectOption('#language-filter', 'CSS');
    // TypeScript gist should be hidden, CSS gist should be visible
    const cssGist = page.locator('text=CSS Grid Layout Utilities');
    await expect(cssGist).toBeVisible();
  });

  test('should display templates widget with content from templates.json', async ({ page }) => {
    // Check if the templates widget is present
    const templatesWidget = page.locator('h3:has-text("Templates & Frameworks")');
    await expect(templatesWidget).toBeVisible();

    // Check for template content from templates.json
    const templateTitle = page.locator('text=Project Planning Template');
    await expect(templateTitle).toBeVisible();

    // Check for category tags
    const categoryTag = page.locator('text=Project Management');
    await expect(categoryTag).toBeVisible();

    // Test template expansion
    const expandButton = page.locator('button:has-text("View Template")').first();
    await expandButton.click();

    // Check if template content is shown
    const templateContent = page.locator('pre:has-text("# Project Planning Template")');
    await expect(templateContent).toBeVisible();

    // Test category filter
    await page.selectOption('#category-filter', 'Development');
    const devTemplate = page.locator('text=Technical Design Document');
    await expect(devTemplate).toBeVisible();
  });

  test('should display contact widget with content from contact.json', async ({ page }) => {
    // Check if the contact widget is present
    const contactWidget = page.locator('h3:has-text("Connect & Collaborate")');
    await expect(contactWidget).toBeVisible();

    // Check for contact methods from contact.json
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();

    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toBeVisible();

    // Check for organizations if they exist
    const activeInSection = page.locator('h4:has-text("Active In")');
    if (await activeInSection.isVisible()) {
      const orgName = page.locator('text=Open Source Community');
      await expect(orgName).toBeVisible();
    }
  });

  test('should handle empty/missing content gracefully', async ({ page }) => {
    // Go to a page that might have missing content
    await page.goto('/learnings');

    // Check that the page loads without errors
    await expect(page.locator('h1').first()).toBeVisible();

    // Widget should show empty state if no content
    const widgets = page.locator('.card');
    await expect(widgets.first()).toBeVisible();
  });

  test('should display navigation from site config', async ({ page }) => {
    // Check header navigation (use first() to avoid strict mode violation)
    const projectsLink = page.locator('nav a[href="/projects"]').first();
    await expect(projectsLink).toBeVisible();

    const learningsLink = page.locator('nav a[href="/learnings"]').first();
    await expect(learningsLink).toBeVisible();

    const resumeLink = page.locator('nav a[href="/resume"]');
    await expect(resumeLink).toBeVisible();

    const articlesLink = page.locator('nav a[href="/articles"]');
    await expect(articlesLink).toBeVisible();

    // Test mobile menu
    const mobileMenuButton = page.locator('#mobile-menu-toggle');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();

      // Check mobile navigation links
      const mobileProjectsLink = page.locator('#mobile-menu a[href="/projects"]');
      await expect(mobileProjectsLink).toBeVisible();
    }
  });

  test('should use profile data in header', async ({ page }) => {
    // Check if site name is displayed from profile data
    const siteName = page.locator('header a[href="/"]');
    await expect(siteName).toBeVisible();

    // Should not show default "Your Name" if content is available
    if (await page.locator('text=Chaitanya Podalak').isVisible()) {
      await expect(page.locator('text=Your Name')).not.toBeVisible();
    }
  });

  test('should validate content structure matches component expectations', async ({ page }) => {
    // Test that all widgets render without JavaScript errors
    await page.goto('/');

    // Check for JavaScript errors in console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Interact with all widgets to ensure they work
    const readingTabs = page.locator('.reading-tab');
    const tabCount = await readingTabs.count();
    for (let i = 0; i < tabCount; i++) {
      await readingTabs.nth(i).click();
      await page.waitForTimeout(100);
    }

    // Test gist filter
    if (await page.locator('#language-filter').isVisible()) {
      await page.selectOption('#language-filter', 'all');
      await page.selectOption('#language-filter', 'TypeScript');
    }

    // Test template filter and expansion
    if (await page.locator('#category-filter').isVisible()) {
      await page.selectOption('#category-filter', 'all');
    }

    const templateButtons = page.locator('.template-toggle');
    const buttonCount = await templateButtons.count();
    for (let i = 0; i < Math.min(buttonCount, 2); i++) {
      await templateButtons.nth(i).click();
      await page.waitForTimeout(100);
    }

    // Verify no JavaScript errors occurred
    expect(errors.length).toBe(0);
  });
});

test.describe('Content Fallback Tests', () => {
  test('should handle missing content files gracefully', async ({ page }) => {
    // This tests the default data fallbacks
    await page.goto('/');

    // Page should still load even if content files are missing
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main').first()).toBeVisible();

    // Widgets should show either content or appropriate empty states
    const widgets = page.locator('.card');
    const widgetCount = await widgets.count();
    expect(widgetCount).toBeGreaterThan(0);

    for (let i = 0; i < widgetCount; i++) {
      const widget = widgets.nth(i);
      await expect(widget).toBeVisible();

      // Check that widget has either content or an empty state message
      const hasContent = (await widget.locator('h3, h4, p, a, button').count()) > 0;
      expect(hasContent).toBe(true);
    }
  });

  test('should validate all required content fields are used', async ({ page }) => {
    await page.goto('/');

    // Check that specific fields from content are being displayed
    // This ensures components are actually using the content data

    // Reading widget fields
    const bookProgress = page.locator('text=/\\d+%/'); // Progress percentage
    await expect(bookProgress.first()).toBeVisible();

    const bookTags = page.locator(
      '.inline-flex:has-text("systems"), .inline-flex:has-text("databases")'
    );
    if ((await bookTags.count()) > 0) {
      await expect(bookTags.first()).toBeVisible();
    }

    // Gist widget fields
    const gistLanguage = page.locator(
      '.inline-flex:has-text("TypeScript"), .inline-flex:has-text("CSS")'
    );
    if ((await gistLanguage.count()) > 0) {
      await expect(gistLanguage.first()).toBeVisible();
    }

    // Template widget fields
    const templateCategory = page.locator(
      '.inline-flex:has-text("Project Management"), .inline-flex:has-text("Development")'
    );
    if ((await templateCategory.count()) > 0) {
      await expect(templateCategory.first()).toBeVisible();
    }
  });
});

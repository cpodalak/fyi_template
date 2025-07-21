import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FYI/);
  });

  test('should have proper navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation links
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Articles' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resume' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learnings' })).toBeVisible();
  });

  test('should have theme toggle', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /theme/i });
    await expect(themeToggle).toBeVisible();

    // Test theme toggle functionality
    await themeToggle.click();
    // Add assertions for theme change
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('main')).toBeVisible();
  });
});

import { expect, test } from '@playwright/test';

test.describe('Learnings Page', () => {
  test('should load learnings page', async ({ page }) => {
    await page.goto('/learnings');
    await expect(page.getByRole('heading', { name: 'Learnings' })).toBeVisible();
  });

  test('should have tabbed interface', async ({ page }) => {
    await page.goto('/learnings');

    // Check for tab buttons
    await expect(page.getByRole('button', { name: /insights/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /gists/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /templates/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /reading/i })).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    await page.goto('/learnings');

    // Test tab switching
    await page.getByRole('button', { name: /gists/i }).click();
    await expect(page.getByText('Code Snippets')).toBeVisible();

    await page.getByRole('button', { name: /templates/i }).click();
    await expect(page.getByText('Templates')).toBeVisible();
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/learnings');

    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();

    await searchInput.fill('react');
    // Add assertions for search results
  });
});

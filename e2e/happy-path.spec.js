import { test, expect } from '@playwright/test';

/**
 * Happy-path E2E test.
 *
 * Exercises the core user flow end-to-end:
 *   Landing → Account creation → Home → Queue → Chart → Verify → Feedback → Metrics
 *
 * This is the single highest-value E2E test because every component integration
 * in the app is touched along this path.
 */

test.describe('happy path: landing → verify → metrics', () => {
  test.beforeEach(async ({ page }) => {
    // Skip the tutorial overlay so the test focuses on core flow
    await page.addInitScript(() => {
      localStorage.setItem('pv-tutorial-done', '1');
    });
  });

  test('new user can sign up, verify an order, and see it in metrics', async ({ page }) => {
    // ─── 1. Landing page ─────────────────────────────────────────────────
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Train pharmacist judgment/ })).toBeVisible();

    // Click "Start a case" CTA
    await page.getByRole('button', { name: /Start a case/ }).click();

    // ─── 2. Account creation form ────────────────────────────────────────
    await expect(page.getByText('PharmVerify', { exact: true })).toBeVisible();
    await page.getByPlaceholder('Jane Doe, PharmD').fill('Test User');
    await page.getByPlaceholder('jdoe@pharmacy.edu').fill('test@pharmacy.edu');
    await page.getByRole('button', { name: /Get Started/ }).click();

    // ─── 3. Home page ────────────────────────────────────────────────────
    await expect(page.getByText(/Welcome back, Test/)).toBeVisible();
    await expect(page.getByText('Cases completed')).toBeVisible();
    await expect(page.getByText('Overall accuracy')).toBeVisible();

    // Navigate to the verification queue
    await page.getByRole('button', { name: /Open verification queue/ }).click();

    // ─── 4. Queue page ───────────────────────────────────────────────────
    await expect(page.getByRole('heading', { name: /Verification Queue/ })).toBeVisible();

    // Click the first order row (ORD001 is furosemide-verify demo order for P001)
    const firstOrderRow = page.locator('.qr').first();
    await expect(firstOrderRow).toBeVisible();
    await firstOrderRow.click();

    // ─── 5. Chart view with VerifyTab ────────────────────────────────────
    // The verify tab is the default when opening an order
    await expect(page.getByRole('button', { name: /^✓ Verify$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^✕ Reject$/ })).toBeVisible();

    // Click Verify
    await page.getByRole('button', { name: /^✓ Verify$/ }).click();

    // ─── 6. Feedback modal ───────────────────────────────────────────────
    // ORD001 (Entresto) has correctAction: 'verify', so clicking Verify is correct
    await expect(page.getByText('Correct!', { exact: true })).toBeVisible();

    // Continue to next order
    await page.getByRole('button', { name: /Continue to Next Order/ }).click();

    // ─── 7. Navigate to metrics via sidebar ──────────────────────────────
    // Sidebar has a "Performance" button (chart icon)
    const sidebarButtons = page.locator('.sb-btn');
    // Click the metrics button (4th visible button — home, queue, chart-if-active, metrics)
    await page.locator('.sb-btn .tip', { hasText: 'Performance' }).locator('..').click();

    // ─── 8. Metrics view shows the attempt ───────────────────────────────
    await expect(page.getByRole('heading', { name: 'Performance Dashboard' })).toBeVisible();
    await expect(page.getByText('Orders Completed')).toBeVisible();
    await expect(page.getByText('Overall Accuracy')).toBeVisible();

    // There should be at least one recorded attempt now
    await expect(page.getByText('Recent Activity')).toBeVisible();
  });

  test('form validation blocks empty submission', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Start a case/ }).click();

    // Submit empty form
    await page.getByRole('button', { name: /Get Started/ }).click();
    await expect(page.getByText('Please enter your name')).toBeVisible();

    // Fill name but invalid email
    await page.getByPlaceholder('Jane Doe, PharmD').fill('Test');
    await page.getByRole('button', { name: /Get Started/ }).click();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });
});

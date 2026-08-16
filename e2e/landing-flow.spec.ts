import { test, expect } from '@playwright/test';

test.describe('Landing Page Quality & Conversion Flow Gate', () => {
  test('renders hero, bento practice areas, and opens consultation modal', async ({ page }) => {
    await page.goto('/');

    // Check Branding Header
    await expect(page.locator('text=DRIGO')).toBeVisible();
    await expect(page.locator('text=Advocacia Estratégica')).toBeVisible();

    // Check Hero Headlines
    await expect(page.locator('h1')).toContainText('Excelência Jurídica');

    // Click Header Agendar Triagem
    const scheduleBtn = page.locator('#header-schedule-btn');
    await expect(scheduleBtn).toBeVisible();
    await scheduleBtn.click();

    // Modal should be open
    await expect(page.locator('text=Agendar Consulta')).toBeVisible();

    // Close modal
    const closeBtn = page.locator('button[aria-label="Fechar"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  });

  test('interacts with legal triage diagnostic calculator', async ({ page }) => {
    await page.goto('/#triagem');

    // Check triage component
    await expect(page.locator('text=Diagnóstico Jurídico')).toBeVisible();

    // Select first option
    const firstOption = page.locator('button:has-text("Direito do Trabalho")').first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
    }
  });
});

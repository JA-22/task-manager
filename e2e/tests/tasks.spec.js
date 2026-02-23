import { test, expect } from '@playwright/test';

test('deberia cargar la app y mostrar el input', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Validar que el título esté visible
  await expect(page.locator('h1')).toHaveText('Task Manager');

  // Validar que el input existe
  const input = page.locator('input[placeholder="Nueva tarea"]');
  await expect(input).toBeVisible();
});
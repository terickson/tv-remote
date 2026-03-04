import { test, expect } from '@playwright/test'

test.describe('Input Selection', () => {
  test('shows input selector on Family Room', async ({ page }) => {
    await page.goto('/room/family-room')
    await expect(page.locator('.v-select')).toBeVisible()
  })

  test('shows input selector on Master Bedroom', async ({ page }) => {
    await page.goto('/room/master-bedroom')
    await expect(page.locator('.v-select')).toBeVisible()
  })

  test('displays selected input as chip', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.locator('.v-select').click()
    await page.getByRole('option', { name: 'TV' }).click()
    await expect(page.locator('.v-chip')).toContainText('TV')
  })
})

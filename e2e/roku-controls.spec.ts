import { test, expect } from '@playwright/test'

test.describe('Roku Controls', () => {
  test('shows Roku navigation when Roku input selected', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.locator('.v-select').click()
    await page.getByRole('option', { name: 'Roku' }).click()

    await expect(page.getByText('Back')).toBeVisible()
    await expect(page.getByText('Home')).toBeVisible()
    await expect(page.getByText('Enter')).toBeVisible()
  })

  test('hides Roku navigation when TV input selected', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.locator('.v-select').click()
    await page.getByRole('option', { name: 'TV' }).click()

    // Should show TV controls, not Roku
    await expect(page.getByText('Menu')).toBeVisible()
    await expect(page.getByText('Smart')).toBeVisible()
  })
})

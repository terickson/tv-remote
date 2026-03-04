import { test, expect } from '@playwright/test'

test.describe('TV Controls', () => {
  test('shows TV controls in Family Room with TV input', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.locator('.v-select').click()
    await page.getByRole('option', { name: 'TV' }).click()

    await expect(page.getByText('Back')).toBeVisible()
    await expect(page.getByText('Menu')).toBeVisible()
    await expect(page.getByText('Exit')).toBeVisible()
    await expect(page.getByText('Smart')).toBeVisible()
    await expect(page.getByText('Enter')).toBeVisible()
    await expect(page.getByText('Channels')).toBeVisible()
  })

  test('hides TV controls when Roku selected', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.locator('.v-select').click()
    await page.getByRole('option', { name: 'Roku' }).click()

    await expect(page.getByText('Menu')).not.toBeVisible()
    await expect(page.getByText('Smart')).not.toBeVisible()
  })

  test('hides channel controls when no input', async ({ page }) => {
    await page.goto('/room/family-room')
    await expect(page.getByText('Channels')).not.toBeVisible()
  })
})

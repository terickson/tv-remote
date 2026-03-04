import { test, expect } from '@playwright/test'

test.describe('Quick Launch', () => {
  test('shows Quick button', async ({ page }) => {
    await page.goto('/room/family-room')
    await expect(page.getByText('Quick')).toBeVisible()
  })

  test('opens quick launch menu with streaming apps', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.getByText('Quick').click()
    await expect(page.getByText('Netflix')).toBeVisible()
    await expect(page.getByText('Prime')).toBeVisible()
    await expect(page.getByText('Plex')).toBeVisible()
  })

  test('selecting a quick launch switches to Roku input', async ({ page }) => {
    await page.goto('/room/family-room')
    await page.getByText('Quick').click()
    await page.getByText('Netflix').click()
    // After quick launch, the current input should be Roku
    await expect(page.locator('.v-chip')).toContainText('Roku')
  })
})

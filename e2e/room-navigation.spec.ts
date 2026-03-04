import { test, expect } from '@playwright/test'

test.describe('Room Navigation', () => {
  test('defaults to Family Room', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/room\/family-room/)
    await expect(page.locator('.v-app-bar-title')).toContainText('Family Room Remote')
  })

  test('can navigate to Master Bedroom', async ({ page }) => {
    await page.goto('/room/family-room')
    // Open navigation drawer on mobile or click nav link on desktop
    const navLink = page.getByText('Master Bedroom')
    if (await navLink.isVisible()) {
      await navLink.click()
    } else {
      await page.locator('.v-app-bar-nav-icon').click()
      await page.getByText('Master Bedroom').click()
    }
    await expect(page).toHaveURL(/\/room\/master-bedroom/)
    await expect(page.locator('.v-app-bar-title')).toContainText('Master Bedroom Remote')
  })

  test('can navigate back to Family Room', async ({ page }) => {
    await page.goto('/room/master-bedroom')
    const navLink = page.getByText('Family Room')
    if (await navLink.isVisible()) {
      await navLink.click()
    } else {
      await page.locator('.v-app-bar-nav-icon').click()
      await page.getByText('Family Room').click()
    }
    await expect(page).toHaveURL(/\/room\/family-room/)
  })
})

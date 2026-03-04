import { test, expect } from '@playwright/test'

test.describe('Volume Controls', () => {
  test('Family Room shows volume interval selector', async ({ page }) => {
    await page.goto('/room/family-room')
    await expect(page.getByText('Volume')).toBeVisible()
    await expect(page.locator('.v-btn-toggle')).toBeVisible()
  })

  test('Master Bedroom shows volume without intervals', async ({ page }) => {
    await page.goto('/room/master-bedroom')
    await expect(page.getByText('Volume')).toBeVisible()
    // Master bedroom uses TV volume directly, no interval selector
    await expect(page.locator('.v-btn-toggle')).not.toBeVisible()
  })

  test('volume up and down buttons are visible', async ({ page }) => {
    await page.goto('/room/family-room')
    const upBtn = page.locator('.mdi-arrow-up-bold').first()
    const downBtn = page.locator('.mdi-arrow-down-bold').first()
    await expect(upBtn).toBeVisible()
    await expect(downBtn).toBeVisible()
  })
})

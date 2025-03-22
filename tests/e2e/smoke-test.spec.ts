import { test, expect, Page } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Carnegie Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Pick Department tile' }).click()

  await page.locator('#departmentShopModal .departmentContent .departmentGroup .department img').first().click()
  await page.locator('#departmentShopModal').getByRole('button', { name: 'Select Department' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Carnegie Solo Helper')
})

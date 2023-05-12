const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("Three test cases for automation test task", () => {
  // test('Verify if the price filter working correctly for the following marketplaces', async ({page}) => {
  //
  // })

  test("Add items to the basket", async ({ page }) => {
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open category and add 1st item to the cart", async () => {
      await page.locator('a[href="/ua/categorys/2419/"]').click();
      await page.locator('a[href^="/ua/product/"]').first().click();
      await page
        .locator("(//div[@class='button buy'][contains(text(),'Купити')])[1]")
        .click();
      await page.locator('[class="popup-close close-icon"]').last().click();
    });

    await page.waitForLoadState("domcontentloaded");

    await test.step("Open 2nd category and add 1n item to the cart", async () => {
      await page
        .locator(
          "(//a[@class='menu-list__link'][contains(text(),'Парфумерія')])[1]"
        )
        .click();

      await page.waitForEvent("requestfinished");
      await page.locator('a[href^="/ua/product/"]').first().click();
      await page
        .locator("(//div[@class='button buy'][contains(text(),'Купити')])[1]")
        .click();
    });
  });

  // test('Search the item', async ({page}) => {
  //
  // })
});

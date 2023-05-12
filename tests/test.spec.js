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
  test.describe("Three test cases for automation test task", () => {
  test("Search the item", async ({ page }) => {
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open Search form", async () => {
      await page.locator("//div[@class='search-button']").click();
    });
    await test.step("Search the item", async () => {
      await page.locator("//input[@class='search-input']").type("dior savage ", {delay: 100});
      });
    await test.step("Verify items", async () => {
      await expect(page.locator("//div[@class='search-product-item-text']//div[@class='product-list__name']")).toContainText(['Dior Sauvage', 'Dior Sauvage Eau de Parfum', 'Dior Sauvage Elixir', 'Dior Eau Sauvage', 'Dior Diorshow On Stage', 'Dior Sauvage', 'Dior Eau Sauvage Extreme', 'Dior Fahrenheit', 'Dior Jadore','Dior Eau Sauvage Shaving Foam']);
    });
  });
});

const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("Three test cases for automation test task", () => {
  test("Verify if the price filter working correctly for the following marketplaces", async ({
    page,
  }) => {
    await page.goto(process.env.BASE_URL);

    expect(page.url()).toBe(process.env.BASE_URL);
    await test.step("Open category and change filters", async () => {
      await page.locator('a[href="/ua/categorys/20280/"]').click();
      await page.locator('[id="input-checkbox-2243-86929"]').click();
      await page.locator('[id="input-checkbox-2245-86931"]').click();
      await page.locator('[id="input-checkbox-2257-24219"]').click();
    });

    await page.waitForLoadState("networkidle");

    await test.step("Check if products are correctly filtered by price", async () => {
      let priceFrom = await page.locator('[id="price-from"]').inputValue();
      let priceTo = await page.locator('[id="price-to"]').inputValue();

      let prices = page.locator(
        "//div[@class='catalog-products']//span[contains(@class, 'simple-slider-list__price') and not(contains(@class, 'simple-slider-list__price_old'))]/span[@class='price_item']"
      );
      const pricesCount = await prices.count();
      for (let index = 0; index < pricesCount; index++) {
        const price = await prices.nth(index).innerText();
        expect(parseFloat(price)).toBeLessThanOrEqual(parseFloat(priceTo));
        expect(parseFloat(price)).toBeGreaterThanOrEqual(parseFloat(priceFrom));
      }
    });
  });
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

    await test.step("Validation price of items from main cart price", async () => {
      let firstItem = (
        await page.locator('[class="product__price"]').first().textContent()
      ).trim();
      let secondItem = (
        await page.locator('[class="product__price"]').last().textContent()
      ).trim();
      let mainPrice = (
        await page.locator('[class="total"] > span').last().textContent()
      ).trim();

      let firstValue = Number(firstItem.slice(0, firstItem.indexOf(" ")));
      let secondValue = Number(secondItem.slice(0, secondItem.indexOf(" ")));
      let mainValue = Number(mainPrice.slice(0, mainPrice.indexOf(" ")));

      await expect(firstValue + secondValue).toEqual(mainValue);
    });

    await test.step("Validation items content", async () => {
      await expect(
        page.locator('[class="product-list_product-item"]').first()
      ).toBeVisible();
      await expect(
        page.locator('[class="product-list_product-item"]').first()
      ).not.toBeEmpty();
      await expect(
        page.locator('[class="product-list_product-item"]').first()
      ).toBeEnabled();

      await expect(
        page.locator('[class="product-list_product-item"]').last()
      ).toBeVisible();
      await expect(
        page.locator('[class="product-list_product-item"]').last()
      ).not.toBeEmpty();
      await expect(
        page.locator('[class="product-list_product-item"]').last()
      ).toBeEnabled();
    });
  });

  test("Search the item", async ({ page }) => {
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open Search form", async () => {
      await page.locator("//div[@class='search-button']").click();
    });
    await test.step("Search the item", async () => {
      await page
        .locator("//input[@class='search-input']")
        .type("dior savage ", { delay: 100 });
    });
    await test.step("Verify items", async () => {
      await expect(
        page.locator(
          "//div[@class='search-product-item-text']//div[@class='product-list__name']"
        )
      ).toContainText([
        "Dior Sauvage",
        "Dior Sauvage Eau de Parfum",
        "Dior Sauvage Elixir",
        "Dior Eau Sauvage",
        "Dior Diorshow On Stage",
        "Dior Sauvage",
        "Dior Eau Sauvage Extreme",
        "Dior Fahrenheit",
        "Dior Jadore",
        "Dior Eau Sauvage Shaving Foam",
      ]);
    });
  });
});

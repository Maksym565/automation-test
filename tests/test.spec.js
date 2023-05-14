const { test, expect } = require("@playwright/test");
const { locator } = require("../src/locators");
const { testData, expectedData } = require("../src/testData");
import { MainPage } from "../src/basePage";
require("dotenv").config();

test.use({ userAgent: "GoogleBot" });
const baseTimeout = 2500;

test.describe("Test cases for automation test task", () => {
  test("Verify if the price filter working correctly for the following marketplaces", async ({
    page,
  }) => {
    const mainPge = new MainPage(page);
    await page.goto(process.env.BASE_URL);

    expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open category and change filters", async () => {
      await mainPge.selectCategory(testData.category.forMan);
      await mainPge.selectFilter(testData.filters.brands.oldSpice, true);
      await mainPge.selectFilter(testData.filters.aftershaveProducts);
      await mainPge.selectFilter(testData.filters.hydration);
    });

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(baseTimeout);

    await test.step("Check if products are correctly filtered by price", async () => {
      let priceFrom = await page
        .locator(locator.filters.priceFromFilter)
        .inputValue();
      let priceTo = await page
        .locator(locator.filters.priceToFilter)
        .inputValue();

      let prices = page.locator(locator.mainPage.itemPrices);
      const pricesCount = await prices.count();
      for (let index = 0; index < pricesCount; index++) {
        const price = await prices.nth(index).innerText();
        expect(parseFloat(price)).toBeLessThanOrEqual(parseFloat(priceTo));
        expect(parseFloat(price)).toBeGreaterThanOrEqual(parseFloat(priceFrom));
      }
    });
  });

  test("Add items to the basket", async ({ page }) => {
    const mainPge = new MainPage(page);
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open category and add 1st item to the cart", async () => {
      await mainPge.selectCategory(testData.category.makeup);
      await page.locator(locator.mainPage.items).first().click();

      await page.waitForTimeout(baseTimeout);

      await page.locator(locator.checkout.buyToBasketBtn).click();
      await page.locator(locator.checkout.basketCloseBtn).last().click();
    });

    await test.step("Open 2nd category and add 1n item to the cart", async () => {
      await mainPge.selectCategory(testData.category.perfume);
      await page.waitForEvent("domcontentloaded");
      await page.locator(locator.mainPage.items).first().click();

      await page.waitForTimeout(baseTimeout);

      await page.locator(locator.checkout.buyToBasketBtn).click();
    });

    await test.step("Validation price of items from main cart price", async () => {
      let firstItem = (
        await page.locator(locator.checkout.cartItemPrice).first().textContent()
      ).trim();
      let secondItem = (
        await page.locator(locator.checkout.cartItemPrice).last().textContent()
      ).trim();
      let mainPrice = (
        await page.locator(locator.checkout.mainCartPrice).last().textContent()
      ).trim();

      let firstValue = Number(firstItem.slice(0, firstItem.indexOf(" ")));
      let secondValue = Number(secondItem.slice(0, secondItem.indexOf(" ")));
      let mainValue = Number(mainPrice.slice(0, mainPrice.indexOf(" ")));

      await expect(firstValue + secondValue).toEqual(mainValue);
    });

    await test.step("Validation items content", async () => {
      await expect(
        page.locator(locator.checkout.cartItemContainer).first()
      ).toBeVisible();
      await expect(
        page.locator(locator.checkout.cartItemContainer).first()
      ).not.toBeEmpty();
      await expect(
        page.locator(locator.checkout.cartItemContainer).first()
      ).toBeEnabled();

      await expect(
        page.locator(locator.checkout.cartItemContainer).last()
      ).toBeVisible();
      await expect(
        page.locator(locator.checkout.cartItemContainer).last()
      ).not.toBeEmpty();
      await expect(
        page.locator(locator.checkout.cartItemContainer).last()
      ).toBeEnabled();
    });
  });

  test("Search the item", async ({ page }) => {
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Open Search form", async () => {
      await page.locator(locator.mainPage.searchForm).click();
    });
    await test.step("Search the item", async () => {
      await page
        .locator(locator.mainPage.searchField)
        .type(testData.search.diorSavage, { delay: 100 });
    });
    await test.step("Verify items", async () => {
      await expect(page.locator(locator.mainPage.searchResult)).toContainText(
        expectedData.diorSearch
      );
    });
  });

  test("Login with invalid user data", async ({ page }) => {
    await page.goto(process.env.BASE_URL);

    await expect(page.url()).toBe(process.env.BASE_URL);

    await test.step("Navigate and fill user login data", async () => {
      const mainPge = new MainPage(page);

      await mainPge.userLogin(testData.login.email, testData.login.password);

      await expect(page.locator(locator.mainPage.favouriteIcon)).toBeVisible();
    });
  });
});

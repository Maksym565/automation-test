const { test, expect } = require("@playwright/test");
const { locator } = require("./locators");

exports.TestStep = class TestStep {
  constructor(page) {
    this.page = page;
  }

  async addItemToBasketBtn() {
    await this.page.locator(locator.checkout.buyToBasketBtn).click();
  }

  async firstItemClick() {
    await this.page.locator(locator.mainPage.items).first().click();
  }

  async validationItemsContent() {
    await test.step("Validation items content", async () => {
      await expect(
        this.page.locator(locator.checkout.cartItemContainer).first()
      ).toBeVisible();
      await expect(
        this.page.locator(locator.checkout.cartItemContainer).first()
      ).not.toBeEmpty();
      await expect(
        this.page.locator(locator.checkout.cartItemContainer).first()
      ).toBeEnabled();

      await expect(
        this.page.locator(locator.checkout.cartItemContainer).last()
      ).toBeVisible();
      await expect(
        this.page.locator(locator.checkout.cartItemContainer).last()
      ).not.toBeEmpty();
      await expect(
        this.page.locator(locator.checkout.cartItemContainer).last()
      ).toBeEnabled();
    });
  }
};

const { test } = require("@playwright/test");
const { locator } = require("./locators");

exports.MainPage = class MainPage {
  constructor(page) {
    this.page = page;
  }

  async userLogin(email, password) {
    await test.step("Fill login form with user data", async () => {
      await this.page.locator(locator.mainPage.profileIcon).click();
      await this.page
        .locator(locator.login.emailField)
        .type(email, { delay: 100 });
      await this.page
        .locator(locator.login.passwordField)
        .type(password, { delay: 100 });
      await this.page.locator(locator.login.btn).first().click();

      await this.page.waitForEvent("requestfinished");
    });
  }
};

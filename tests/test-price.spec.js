import { test, expect } from "@playwright/test";
require("dotenv").config();

test.describe("Price test", () => {
    test('Verify if the price filter working correctly for the following marketplaces', async ({page}) => {
        await page.goto(process.env.BASE_URL);

        expect(page.url()).toBe(process.env.BASE_URL);
        await test.step("Open category and change filters", async () => {
            await page.locator('a[href="/ua/categorys/20280/"]').click();
            await page.locator('[id="input-checkbox-2243-86929"]').click();
            await page.locator('[id="input-checkbox-2245-86931"]').click();
            await page.locator('[id="input-checkbox-2257-24219"]').click();
        });

        await page.waitForLoadState('networkidle');

        await test.step("Check if products are correctly filtered by price", async () => {
            let priceFrom = await page.locator('[id="price-from"]').inputValue();
            let priceTo = await page.locator('[id="price-to"]').inputValue();

            let prices = page.locator("//div[@class='catalog-products']//span[contains(@class, 'simple-slider-list__price') and not(contains(@class, 'simple-slider-list__price_old'))]/span[@class='price_item']");
            const pricesCount = await prices.count();
            for (var index = 0; index < pricesCount; index++) {
                const price = await prices.nth(index).innerText();
                expect(parseFloat(price)).toBeLessThanOrEqual(parseFloat(priceTo));
                expect(parseFloat(price)).toBeGreaterThanOrEqual(parseFloat(priceFrom));
            }
        });
      
    })
});

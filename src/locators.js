const locator = {
  mainPage: {
    itemPrices:
      "//div[@class='catalog-products']//span[contains(@class, 'simple-slider-list__price') and not(contains(@class, 'simple-slider-list__price_old'))]/span[@class='price_item']",
    items: 'a[href^="/ua/product/"]',
    searchForm: "//div[@class='search-button']",
    searchField: "//input[@class='search-input']",
    searchResult:
      "//div[@class='search-product-item-text']//div[@class='product-list__name']",
    profileIcon: '[class="header-office"]',
    favouriteIcon: '[href="/ua/user/favourite/"]',
  },
  category:
    "//a[contains(@href,'categorys') and normalize-space(text())='@Value@']",
  filters: {
    popularFilter:
      "//li[contains(@id,'input-checkbox') and contains(@class, 'popular')]//a[normalize-space(text())='@Value@']",
    filter:
      "//li[contains(@id,'input-checkbox')]//span[normalize-space(text())='@Value@']",
    priceFromFilter: '[id="price-from"]',
    priceToFilter: '[id="price-to"]',
  },
  login: {
    emailField: "#login",
    passwordField: "#pw",
    btn: '[class="input-row"] [type="submit"]',
  },
  checkout: {
    buyToBasketBtn:
      "(//div[@class='button buy'][contains(text(),'Купити')])[1]",
    basketCloseBtn: '[class="popup-close close-icon"]',
    cartItemPrice: '[class="product__price"]',
    cartItemContainer: '[class="product-list_product-item"]',
    mainCartPrice: '[class="total"] > span',
  },
};

export { locator };

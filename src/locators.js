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
  category: {
    man: "//a[contains(@href,'categorys') and normalize-space(text())='Чоловікам']",
    makeUp:
      "//a[contains(@href,'categorys') and normalize-space(text())='Макіяж']",
    perfumery:
      "(//a[@class='menu-list__link'][contains(text(),'Парфумерія')])[1]",
  },
  filters: {
    oldSpiceFilter:
      "//li[contains(@id,'input-checkbox') and contains(@class, 'popular')]//a[normalize-space(text())='Old Spice']",
    shavingFilter:
      "//li[contains(@id,'input-checkbox')]//span[normalize-space(text())='Засоби після гоління']",
    hydrationFilter:
      "//li[contains(@id,'input-checkbox')]//span[normalize-space(text())='Зволоження']",
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

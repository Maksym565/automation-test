const locator = {
  mainPage: {
    itemPrices:
      "//div[@class='catalog-products']//span[contains(@class, 'simple-slider-list__price') and not(contains(@class, 'simple-slider-list__price_old'))]/span[@class='price_item']",
    items: ".simple-slider-list__name",
    searchForm: ".search-button",
    searchField: ".search-input",
    searchResult: ".search-product-item-text .product-list__name",
    profileIcon: ".header-office",
    favouriteIcon: '[href="/ua/user/favourite/"]',
  },
  category:
    "//a[contains(@href,'categorys') and normalize-space(text())='@Value@']",
  filters: {
    popularFilter:
      "//li[contains(@id,'input-checkbox') and contains(@class, 'popular')]//a[normalize-space(text())='@Value@']",
    filter:
      "//li[contains(@id,'input-checkbox')]//span[normalize-space(text())='@Value@']",
    priceFromFilter: "#price-from",
    priceToFilter: "#price-to",
  },
  login: {
    emailField: "#login",
    passwordField: "#pw",
    btn: "form[id='form-auth'] button[type='submit']",
  },
  checkout: {
    buyToBasketBtn: ".product-item__button > div",
    basketCloseBtn: ".popup__window > .popup-close",
    cartItemPrice: ".product__price",
    cartItemContainer: ".product-list_product-item",
    mainCartPrice: ".total > span",
  },
};

export { locator };

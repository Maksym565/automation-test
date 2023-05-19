const testData = {
  category: {
    forMan: "Мужчинам",
    makeup: "Макияж",
    perfume: "Парфюмерия",
  },
  filters: {
    aftershaveProducts: "Средства после бритья",
    hydration: "Увлажнение",
    brands: {
      oldSpice: "Old Spice",
    },
  },
  login: {
    email: "testuser@example.com",
    password: "Password123!@#",
  },
  search: {
    diorSavage: "Dior Sauvage Eau de Parfum",
  },
};

const expectedData = {
  diorSearch: [
    "Dior Sauvage Eau de Parfum",
    "Dior Sauvage Eau de Parfum Refill",
    "Dior Sauvage Eau de Parfum Gift Set",
    "Dior Sauvage Face and Beard Moisturizer",
    "Dior Sauvage After-Shave Balm",
    "Dior Sauvage Eau de Parfum",
    "Dior Sauvage Eau de Parfum",
    "Dior Sauvage Eau de Parfum Limited Edition",
    "Dior Sauvage Eau de Parfum Shower Gel",
    "Dior Sauvage Face Cleanser and Mask",
  ],
};

export { testData, expectedData };

const testData = {
  category: {
    forMan: "Чоловікам",
    makeup: "Макіяж",
    perfume: "Парфумерія",
  },
  filters: {
    aftershaveProducts: "Засоби після гоління",
    hydration: "Зволоження",
    brands: {
      oldSpice: "Old Spice",
    },
  },
  login: {
    email: "testuser@example.com",
    password: "Password123!@#",
  },
  search: {
    diorSavage: "dior savage ",
  },
};

const expectedData = {
  diorSearch: [
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
  ],
};

export { testData, expectedData };

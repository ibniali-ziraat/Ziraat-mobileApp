
export const ROUTES = {
  TABS: {
    HOME: "/(tabs)",
    MORE: "/(tabs)/more",
    ORCHARDS: "/(tabs)/orchards",
    PRODUCTS: "/(tabs)/products",
  },
  DASHBOARD: {
    MAIN: "/dashboard",
    PEST_DISEASE_PROFILE: "/pest-disease-profile",
    ORCHARD_PROFILE: "/orchard-profile",
    NUTRIENT_PROFILE: "/nutrient-profile",
    RESOURCES_PROFILE: "/resources-profile",
    FINANCIAL_PROFILE: "/financial-profile",
    ADVISORY_PROFILE: "/advisory-profile",
    ALERT_PROFILE: "/alert-profile",
    WEATHER_PROFILE: "/weather-profile",
  },
  MORE: {
    SUPPORT: "/more/support",
    SETTINGS: "/settings",
    ORDERS: "/orders-list",
    PAYMENTS: "/more/payments",
    ABOUT_US: "/about-us",
    DISCUSSION: "/more/discussion",
    PROFILE: "/profile-view",
  },

  PRODUCTS: {
    SINGLE_PRODUCT_DETAILS: "/single-product-details",
  },
  ACCOUNT: {
    ADDRESS: "/login",
    PROFILE: "/profile-view",
    FORGOT_PASSWORD: "/forgot-password",
    CHANGE_PASSWORD: "/change-password",
    DELETE_ACCOUNT: "/vendor/vendor-profile-screen",
    ADD_ADDRESS: "/add-addresses",
    ADDRESS_FORM: "/address-form",
  },

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },

  USER: {
    HOME: "/",
    FORMS: {
      PROFILE: "/profile-form",
      ADDRESS: "/address",
      EDUCATION: "/education",
      PROFESSION: "/profession",
    },
  },

  ORCHARDS: {
    REGISTRATION: {
      BASIC_INFO: "/basic-info",
      CROP_INFO: "/crop-info",
      FARM_INFO: "/farm-info",
      FUTURE_INFO: "/future-info",
      INPUT_COST_INFO: "/inputcost-info",
      PLANT_PROTECTION_INFO: "/plant-protection-info",
      PRODUCTION_INFO: "/production-info",
      SOIL_WATER_INFO: "/soil-water-info",
      SOIL_TEST_REPORTS: "/soil-test-reports",
      VARIETY_INFO: "/variety-info",
      ALL_VARIETIES: "/all-varieties",
    },
    DETAILS: {
      ORCHARD_DETAILS: "/orchard-details",
    },
    MEASUREMENT: {
      MEASURE_BY_TAP: "/tap-measure",
      MEASURE_BY_WALK: "/walk-measure",
    },
  },

  SHOPPING: {
    WISHLIST: "/wishlist",
    CART: "/cart-list",
    CHECKOUT: {
      SELECT_ADDRESS: "/select-address",
      CREATE_ADDRESS: "/create-address",
      REVIEW_ORDER: "/review-order",
      ORDER_SUCCESS: "/order-success",
    },
  },

   PAYMENTMETHOD: {
    Wallet:"/wallet",
   },


  ORDERS: {
    LIST: "/orders-list",
    DETAILS: "/order-details",
    TRACKING: "/orders/tracking",
  },
  Review:{
    reviewlist:"/reviewlist",
  },


  Discussion:{
    discussionForum:"/discussion",
    QuestionScreen:"/questionScreen",
  },
  SHIPPING: {
    ADDRESS: "/shipping/address",
    METHOD: "/shipping/method",
    CONFIRMATION: "/shipping/confirmation",
  },
  NOTIFICATIONS: "/notifications",
  WEATHER: {
    DETAILS: "/weather-details",
  },
  SETTINGS: "/settings",
} as const;

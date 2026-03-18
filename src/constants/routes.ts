export const ROUTES = {
  MORE: {
    SUPPORT: "/more/support",
    NOTIFICATIONS: "/more/notifications",
    SETTINGS: "/more/settings",
    ORDERS: "/products/checkout/orders/orders",
  },
  NAV: {
    BACK: -1,
  },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VENDOR_ONBOARD: "/auth/vendor",
    VENDOR_PROFILE: "/auth/vendor/vendor-profile-screen",
    USER: {
      REGISTRAION: "/",
      PROFILE: "/user/user-profile",
      EDIT_PROFILE: "/user-profile/edit",
    },
    VENDOR: {
      REGISTRAION: "/auth/vendor",
      EDIT_PROFILE: "/user-profile/edit",
    },
  },

  // USER SCREENS
  USER: {
    HOME: "/",
    PROFILE: "/user/user-profile",
    EDIT_PROFILE: "/user-profile/edit",
  },

  // VENDOR / SUPPLIER SCREENS
  VENDOR: {
    PROFILE: "/vendor/vendor-profile-screen",

    NOTIFICATIONS: "/vendor/notifications",
    SUPPORT: "/vendor/support",
    PAYMENTS: "/vendor/payments",
    STORE: "/vendor/store",
  },

  ORCHARDS: {
    REGISTRATION: {
      BASIC_INFO: "/orchards/basic-info",
      CROP_INFO: "/orchards/crop-info",
      FARM_INFO: "orchards/farm-info",
      FUTURE_INFO: "/orchards/future-info",
      INPUT_COST_INFO: "/orchards/inputcost-info",
      PLANT_PROTECTION_INFO: "/orchards/plant-protection-info",
      PRODUCTION_INFO: "/orchards/production-info",
      SOIL_WATER_INFO: "/orchards/soil-water-info",
      VARIETY_INFO: "/orchards/variety-info",
    },
  },
  TABS: {
    MENU: "/(tabs)/menu",
    HOME: "/(tabs)",
    PROFILE: "/(tabs)/profile",
    ORCHARDS: "/(tabs)/orchards",
    Products: "/(tabs)/Product",
    // ORDERS: "/(tabs)/orders",
  },
} as const;

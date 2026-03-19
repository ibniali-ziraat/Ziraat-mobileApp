export const ROUTES = {
  TABS: {
    HOME: "/(tabs)",
    PROFILE: "/(tabs)/profile",
    ORCHARDS: "/(tabs)/orchards",
    Products: "/(tabs)/products",
  },
  MORE: {
    SUPPORT: "/more/support",
    NOTIFICATIONS: "/more/notifications",
    SETTINGS: "/settings/settings",
    ORDERS: "/orders/orders",
  },
  ACCOUNT: {
    ADDRESS: "/account/login",
    PROFILE: "/profile",
    FORGOT_PASSWORD: "/account/forgot-password",
    CHANGE_PASSWORD: "/account/vendor",
    DELETE_ACCOUNT: "/account/vendor/vendor-profile-screen",
    ADD_ADDRESS: "/account/add-addresses",
  },

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
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
} as const;

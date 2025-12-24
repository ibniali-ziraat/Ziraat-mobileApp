// export const ROUTES = {
//   // AUTH SCREENS
//   AUTH: {
//     LOGIN: "/auth/login",
//     REGISTER: "/auth/register",
//     FORGOT_PASSWORD: "/auth/forgot-password",
//     VENDOR_ONBOARD: "/auth/vendor",
//     VENDOR_PROFILE: "/auth/vendor/vendor-profile-screen",
//   },

//   // USER SCREENS
//   USER: {
//     HOME: "/auth/user",
//     PROFILE: "/auth/user/profile",
//     EDIT_PROFILE: "/",
//     EDUCATION:"/auth/user/education",
//     PROFESSION:"/auth/user/profession",
//     ADDRESS:"/auth/user/address",
//     REGISTRATION:"/auth/user/user-registration",

//   },

//   // VENDOR / SUPPLIER SCREENS
//   VENDOR: {
//     HOME:"/auth/vendor",
//     PROFILE: "/auth/vendor/profile",
//     NOTIFICATIONS: "/auth/vendor/notifications",
//     SUPPORT: "/auth/vendor/support",
//     PAYMENTS: "/auth/vendor/payments",
//     STORE: "/auth/vendor/store",
//     LICENSE:"/auth/vendor/license",
//     OPERATIONS:"/auth/vendor/operations",
//     PRODUCTS:"/auth/vendor/products",
//     FINANCIAL:"/auth/vendor/financial",
//   },

//   DASHBOARDS:{
//     FARMER:{
//     PROFILE: "/dashboard/advisory-profile",
//     ALERT: "/dashboard/alert-profile",
//     FINANCIAL: "/dashboard/financial-profile",
//     NUTRIENT: "/dashboard/nutrient-profile",
//     ORCHARD: "/dashboard/orchard-profile",
//     PESTDISEASE: "/dashboard/pestdisease-profile",
//     RESOURCES: "/dashboard/resources-profile",
//     WEATHER: "/dashboard/weather-profile",
//     },
//     VENDOR:{
//       PROFILE:"/dashboard/vendor-profile",
//       CREDITS:"/dashboard/vendor-credits",
//       DELIVERY:"/dashboard/vendor-delivery",
//       FINANCIAL:"/dashboard/vendor-financial",
//       NOTIFICATION:"/dashboard/vendor-notification",
//       OFFERS:"/dashboard/vendor-offers",
//       PLATFORMS:"/dashboard/vendor-platform",
//       PRODUCTS:"/dashboard/vendor-products",
//       REPORTS:"/dashboard/vendor-reports",
//       SALES:"/dashboard/vendor-sales",
//       USER_DETAILS:"/dashboard/vendoer-user-details",
//     }

//   },
//   PRODUCTS:{
//     WISHLIST:"/wishlist",
//     CARTLIST:"/cartlist",
//     SINGLE_PRODUCT_DETAILS:"/single-product-details"
//   },

//   ORDERS:{
//     SHIPPING:"/shipping",
//   },

//   ORCHARDS:{
//      REGISTRATION:"/orchard-registration",
//   },
//   SUPPLIER:{
//     REGISTRATION:"/supplier-registration"
//   },

//   SPRAY:{
//   REGISTRATION:"/spray-registration"
//   },

//   TABS: {
//     MENU: "/(tabs)/menu",
//     HOME: "/(tabs)",
//     PROFILE: "/(tabs)/profile",
//     PRODUCTS:"/(tabs)/products",
//     SPRAY:"/(tabs)/spray"
//   },
// } as const;

export const ROUTES = {
  // AUTH SCREENS
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
  },
} as const;

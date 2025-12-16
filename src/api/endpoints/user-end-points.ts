export const USER_API_ENDPOINTS = {
  LOGIN: "/api/core/account/login",

  PROFILE: {
    CREATE: "/api/core/userProfile",
    UPDATE: (id: string | number) => `/api/core/userProfile/${id}`,
    DELETE: (id: string | number) => `/api/core/address/${id}`,
    BY_USER_ID: (userId: string | number) =>
      `/api/core/userProfile/GetProfileByUserId?userId=${userId}`,
    CHECK_EXISTS: "/api/core/userProfile/CheckExistingEmailandPhoneNumber/",
  },

  OTP: {
    VERIFY: "/api/core/otpverification/verify",
    SEND: "/api/core/otpverification/send",
  },

  ADDRESS: {
    CREATE: "/api/core/address/create",
    UPDATE: (profileId: string | number) => `/api/core/address/${profileId}`,
    DELETE: (addressId: string | number) => `/api/core/address/${addressId}`,
    BY_PROFILE: (profileId: string | number) =>
      `/api/core/address/by-profile/${profileId}`,
  },

  EDUCATION: {
    CREATE: "/api/core/education/Create",
    UPDATE: (profileId: string | number) => `/api/core/education/${profileId}`,
    DELETE: (educationId: string | number) =>
      `/api/core/education/${educationId}`,
    BY_PROFILE: (profileId: string | number) =>
      `/api/core/education/by-profile/${profileId}`,
  },

  PROFESSION: {
    CREATE: "/api/core/professional-profile/Create",
    UPDATE: (profileId: string | number) =>
      `/api/core/professional-profile/${profileId}`,
    DELETE: (professionId: string | number) =>
      `/api/core/professional-profile/${professionId}`,
    BY_PROFILE: (profileId: string | number) =>
      `/api/core/professional-profile/GetByProfileId?profileId=${profileId}`,
  },
} as const;

export const ROUTES = {
    // AUTH SCREENS
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
        VENDOR_ONBOARD: "/auth/vendor",
        VENDOR_PROFILE: "/auth/vendor/vendor-profile-screen",
    },

    // USER SCREENS
    USER: {
        HOME: "/",
        PROFILE: "/user-profile",
        EDIT_PROFILE: "/user-profile/edit",
    },



    // VENDOR / SUPPLIER SCREENS
    VENDOR: {
        PROFILE: "/vendor/profile",
        NOTIFICATIONS: "/vendor/notifications",
        SUPPORT: "/vendor/support",
        PAYMENTS: "/vendor/payments",
        STORE: "/vendor/store",
    },


} as const;

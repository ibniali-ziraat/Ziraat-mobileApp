import { Platform } from "react-native";

export const shadows = {
  profile_card: Platform.select({
    android: {
      elevation: 4,
    },
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    web: {
      boxShadow: "0px 4px 8px rgba(0,0,0,0.10)",
    },
  }),

  price_card: Platform.select({
    android: {
      elevation: 6,
    },
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    web: {
      boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
    },
  }),

  review_card: {
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      web: {
        boxShadow: "0px 8px 24px rgba(0,0,0,0.10)",
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
};

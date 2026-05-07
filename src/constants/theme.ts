import { DefaultTheme, MD3LightTheme } from "react-native-paper";
import { colors } from "./colors";
import { fonts } from "./fonts/font";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.light,
    text: colors.dark,
    placeholder: colors.neutral,
    error: colors.error,
  },
};

export const paperTheme = {
  ...MD3LightTheme,

  fonts: {
    bodyLarge: {
      fontFamily: fonts.poppins.regular,
    },
    bodyMedium: {
      fontFamily: fonts.poppins.regular,
    },
    bodySmall: {
      fontFamily: fonts.poppins.light,
    },

    titleLarge: {
      fontFamily: fonts.poppins.semibold,
    },
    titleMedium: {
      fontFamily: fonts.poppins.medium,
    },
    titleSmall: {
      fontFamily: fonts.poppins.medium,
    },

    labelLarge: {
      fontFamily: fonts.poppins.medium,
    },
    labelMedium: {
      fontFamily: fonts.poppins.regular,
    },
    labelSmall: {
      fontFamily: fonts.poppins.light,
    },
  },
};

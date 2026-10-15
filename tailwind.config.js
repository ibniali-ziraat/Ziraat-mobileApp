import { colors } from "./src/constants/colors.ts";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      // One step above Tailwind's defaults, matching src/constants/fonts/typography.
      fontSize: {
        xs: ["14px", { lineHeight: "20px" }],
        sm: ["16px", { lineHeight: "22px" }],
        base: ["17px", { lineHeight: "24px" }],
        lg: ["19px", { lineHeight: "27px" }],
        xl: ["21px", { lineHeight: "29px" }],
      },
    },
  },
  plugins: [],
};

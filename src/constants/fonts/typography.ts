import { fonts } from "./font";
import { scale } from "./scale";

export type TextVariant =
"bigHeading"
  | "heading"
  | "subheading"
  | "title"
  | "subtitle"
  | "description"
  | "caption";

export const typography = {
bigHeading:{
fontFamily: fonts.poppins.bold,
    fontSize: scale(57),
    lineHeight: scale(57),
    letterSpacing: scale(-0),
},

  heading: {
    fontFamily: fonts.poppins.bold,
    fontSize: scale(17),
    lineHeight: scale(30),
  },
  subheading: {
    fontFamily: fonts.poppins.semibold,
    fontSize: scale(17),
    lineHeight: scale(30),
  },
  title: {
    fontFamily: fonts.poppins.medium,
    fontSize: scale(15),
    lineHeight: scale(23),
  },
  subtitle: {
    fontFamily: fonts.poppins.regular,
    fontSize: scale(15),
    lineHeight: scale(22),
  },
  description: {
    fontFamily: fonts.poppins.regular,
    fontSize: scale(14),
    lineHeight: scale(21),
  },
  caption: {
    fontFamily: fonts.poppins.light,
    fontSize: scale(12),
    lineHeight: scale(16),
  },
} as const;

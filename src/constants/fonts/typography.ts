import { fonts } from "./font";
import { scale } from "./scale";
const size = {
  xs: scale(12),
  s: scale(14),
  m: scale(16),
  l: scale(20),
  xl: scale(28),
  xxl: scale(36),
};
const weight = {
  regular: fonts.poppins.regular,
  medium: fonts.poppins.medium,
  semibold: fonts.poppins.semibold,
  bold: fonts.poppins.bold,
};

export type TextVariant =
  `${"heading" | "subHeading" | "title" | "subtitle" | "description" | "caption"}_${"xs" | "s" | "m" | "l" | "xl" | "xxl"}_${"regular" | "medium" | "semibold" | "bold"}`;

export const typography = {

 Poppins_xs_regular: { fontFamily: weight.regular, fontSize: size.xs },
 Poppins_xs_medium: { fontFamily: weight.medium, fontSize: size.xs },
 Poppins_xs_semibold: { fontFamily: weight.semibold, fontSize: size.xs },
 Poppins_xs_bold: { fontFamily: weight.bold, fontSize: size.xs },

 Poppins_s_regular: { fontFamily: weight.regular, fontSize: size.s },
 Poppins_s_medium: { fontFamily: weight.medium, fontSize: size.s },
 Poppins_s_semibold: { fontFamily: weight.semibold, fontSize: size.s },
 Poppins_s_bold: { fontFamily: weight.bold, fontSize: size.s },

 Poppins_m_regular: { fontFamily: weight.regular, fontSize: size.m },
 Poppins_m_medium: { fontFamily: weight.medium, fontSize: size.m },
 Poppins_m_semibold: { fontFamily: weight.semibold, fontSize: size.m },
 Poppins_m_bold: { fontFamily: weight.bold, fontSize: size.m },

 Poppins_l_regular: { fontFamily: weight.regular, fontSize: size.l },
 Poppins_l_medium: { fontFamily: weight.medium, fontSize: size.l },
 Poppins_l_semibold: { fontFamily: weight.semibold, fontSize: size.l },
 Poppins_l_bold: { fontFamily: weight.bold, fontSize: size.l },

 Poppins_xl_regular: { fontFamily: weight.regular, fontSize: size.xl },
 Poppins_xl_medium: { fontFamily: weight.medium, fontSize: size.xl },
 Poppins_xl_semibold: { fontFamily: weight.semibold, fontSize: size.xl },
 Poppins_xl_bold: { fontFamily: weight.bold, fontSize: size.xl },

 Poppins_xxl_regular: { fontFamily: weight.regular, fontSize: size.xxl },
 Poppins_xxl_medium: { fontFamily: weight.medium, fontSize: size.xxl },
 Poppins_xxl_semibold: { fontFamily: weight.semibold, fontSize: size.xxl },
 Poppins_xxl_bold: { fontFamily: weight.bold, fontSize: size.xxl },


  
} as const;
 
 
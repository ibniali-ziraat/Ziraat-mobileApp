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
  /* ===================== HEADING ===================== */
  heading_xs_regular: { fontFamily: weight.regular, fontSize: size.xs },
  heading_xs_medium: { fontFamily: weight.medium, fontSize: size.xs },
  heading_xs_semibold: { fontFamily: weight.semibold, fontSize: size.xs },
  heading_xs_bold: { fontFamily: weight.bold, fontSize: size.xs },
 
  heading_s_regular: { fontFamily: weight.regular, fontSize: size.s },
  heading_s_medium: { fontFamily: weight.medium, fontSize: size.s },
  heading_s_semibold: { fontFamily: weight.semibold, fontSize: size.s },
  heading_s_bold: { fontFamily: weight.bold, fontSize: size.s },
 
  heading_m_regular: { fontFamily: weight.regular, fontSize: size.m },
  heading_m_medium: { fontFamily: weight.medium, fontSize: size.m },
  heading_m_semibold: { fontFamily: weight.semibold, fontSize: size.m },
  heading_m_bold: { fontFamily: weight.bold, fontSize: size.m },
 
  heading_l_regular: { fontFamily: weight.regular, fontSize: size.l },
  heading_l_medium: { fontFamily: weight.medium, fontSize: size.l },
  heading_l_semibold: { fontFamily: weight.semibold, fontSize: size.l },
  heading_l_bold: { fontFamily: weight.bold, fontSize: size.l },
 
  heading_xl_regular: { fontFamily: weight.regular, fontSize: size.xl },
  heading_xl_medium: { fontFamily: weight.medium, fontSize: size.xl },
  heading_xl_semibold: { fontFamily: weight.semibold, fontSize: size.xl },
  heading_xl_bold: { fontFamily: weight.bold, fontSize: size.xl },
 
  heading_xxl_regular: { fontFamily: weight.regular, fontSize: size.xxl },
  heading_xxl_medium: { fontFamily: weight.medium, fontSize: size.xxl },
  heading_xxl_semibold: { fontFamily: weight.semibold, fontSize: size.xxl },
  heading_xxl_bold: { fontFamily: weight.bold, fontSize: size.xxl },
 
  /* ===================== SUB HEADING ===================== */
  /* ===================== SUB HEADING ===================== */
 
  subHeading_xs_regular: {
    fontFamily: weight.regular,
    fontSize: size.xs,
  },
  subHeading_xs_medium: {
    fontFamily: weight.medium,
    fontSize: size.xs,
  },
  subHeading_xs_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.xs,
  },
  subHeading_xs_bold: {
    fontFamily: weight.bold,
    fontSize: size.xs,
  },
 
  subHeading_s_regular: {
    fontFamily: weight.regular,
    fontSize: size.s,
  },
  subHeading_s_medium: {
    fontFamily: weight.medium,
    fontSize: size.s,
  },
  subHeading_s_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.s,
  },
  subHeading_s_bold: {
    fontFamily: weight.bold,
    fontSize: size.s,
  },
 
  subHeading_m_regular: {
    fontFamily: weight.regular,
    fontSize: size.m,
  },
  subHeading_m_medium: {
    fontFamily: weight.medium,
    fontSize: size.m,
  },
  subHeading_m_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.m,
  },
  subHeading_m_bold: {
    fontFamily: weight.bold,
    fontSize: size.m,
  },
 
  subHeading_l_regular: {
    fontFamily: weight.regular,
    fontSize: size.l,
  },
  subHeading_l_medium: {
    fontFamily: weight.medium,
    fontSize: size.l,
  },
  subHeading_l_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.l,
  },
  subHeading_l_bold: {
    fontFamily: weight.bold,
    fontSize: size.l,
  },
 
  subHeading_xl_regular: {
    fontFamily: weight.regular,
    fontSize: size.xl,
  },
  subHeading_xl_medium: {
    fontFamily: weight.medium,
    fontSize: size.xl,
  },
  subHeading_xl_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.xl,
  },
  subHeading_xl_bold: {
    fontFamily: weight.bold,
    fontSize: size.xl,
  },
 
  subHeading_xxl_regular: {
    fontFamily: weight.regular,
    fontSize: size.xxl,
  },
  subHeading_xxl_medium: {
    fontFamily: weight.medium,
    fontSize: size.xxl,
  },
  subHeading_xxl_semibold: {
    fontFamily: weight.semibold,
    fontSize: size.xxl,
  },
  subHeading_xxl_bold: {
    fontFamily: weight.bold,
    fontSize: size.xxl,
  },
 
  /* ===================== TITLE ===================== */
  /* ===================== TITLE ===================== */
 
title_xs_regular: {
  fontFamily: weight.regular,
  fontSize: size.xs,
},
title_xs_medium: {
  fontFamily: weight.medium,
  fontSize: size.xs,
},
title_xs_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xs,
},
title_xs_bold: {
  fontFamily: weight.bold,
  fontSize: size.xs,
},
 
title_s_regular: {
  fontFamily: weight.regular,
  fontSize: size.s,
},
title_s_medium: {
  fontFamily: weight.medium,
  fontSize: size.s,
},
title_s_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.s,
},
title_s_bold: {
  fontFamily: weight.bold,
  fontSize: size.s,
},
 
title_m_regular: {
  fontFamily: weight.regular,
  fontSize: size.m,
},
title_m_medium: {
  fontFamily: weight.medium,
  fontSize: size.m,
},
title_m_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.m,
},
title_m_bold: {
  fontFamily: weight.bold,
  fontSize: size.m,
},
 
title_l_regular: {
  fontFamily: weight.regular,
  fontSize: size.l,
},
title_l_medium: {
  fontFamily: weight.medium,
  fontSize: size.l,
},
title_l_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.l,
},
title_l_bold: {
  fontFamily: weight.bold,
  fontSize: size.l,
},
 
title_xl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xl,
},
title_xl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xl,
},
title_xl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xl,
},
title_xl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xl,
},
 
title_xxl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xxl,
},
title_xxl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xxl,
},
title_xxl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xxl,
},
title_xxl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xxl,
},
 
 
  /* ===================== SUBTITLE ===================== */
  /* ===================== SUBTITLE ===================== */
 
subtitle_xs_regular: {
  fontFamily: weight.regular,
  fontSize: size.xs,
},
subtitle_xs_medium: {
  fontFamily: weight.medium,
  fontSize: size.xs,
},
subtitle_xs_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xs,
},
subtitle_xs_bold: {
  fontFamily: weight.bold,
  fontSize: size.xs,
},
 
subtitle_s_regular: {
  fontFamily: weight.regular,
  fontSize: size.s,
},
subtitle_s_medium: {
  fontFamily: weight.medium,
  fontSize: size.s,
},
subtitle_s_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.s,
},
subtitle_s_bold: {
  fontFamily: weight.bold,
  fontSize: size.s,
},
 
subtitle_m_regular: {
  fontFamily: weight.regular,
  fontSize: size.m,
},
subtitle_m_medium: {
  fontFamily: weight.medium,
  fontSize: size.m,
},
subtitle_m_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.m,
},
subtitle_m_bold: {
  fontFamily: weight.bold,
  fontSize: size.m,
},
 
subtitle_l_regular: {
  fontFamily: weight.regular,
  fontSize: size.l,
},
subtitle_l_medium: {
  fontFamily: weight.medium,
  fontSize: size.l,
},
subtitle_l_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.l,
},
subtitle_l_bold: {
  fontFamily: weight.bold,
  fontSize: size.l,
},
 
subtitle_xl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xl,
},
subtitle_xl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xl,
},
subtitle_xl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xl,
},
subtitle_xl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xl,
},
 
subtitle_xxl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xxl,
},
subtitle_xxl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xxl,
},
subtitle_xxl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xxl,
},
subtitle_xxl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xxl,
},
 
 
  /* ===================== DESCRIPTION ===================== */
  /* ===================== DESCRIPTION ===================== */
 
description_xs_regular: {
  fontFamily: weight.regular,
  fontSize: size.xs,
},
description_xs_medium: {
  fontFamily: weight.medium,
  fontSize: size.xs,
},
description_xs_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xs,
},
description_xs_bold: {
  fontFamily: weight.bold,
  fontSize: size.xs,
},
 
description_s_regular: {
  fontFamily: weight.regular,
  fontSize: size.s,
},
description_s_medium: {
  fontFamily: weight.medium,
  fontSize: size.s,
},
description_s_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.s,
},
description_s_bold: {
  fontFamily: weight.bold,
  fontSize: size.s,
},
 
description_m_regular: {
  fontFamily: weight.regular,
  fontSize: size.m,
},
description_m_medium: {
  fontFamily: weight.medium,
  fontSize: size.m,
},
description_m_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.m,
},
description_m_bold: {
  fontFamily: weight.bold,
  fontSize: size.m,
},
 
description_l_regular: {
  fontFamily: weight.regular,
  fontSize: size.l,
},
description_l_medium: {
  fontFamily: weight.medium,
  fontSize: size.l,
},
description_l_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.l,
},
description_l_bold: {
  fontFamily: weight.bold,
  fontSize: size.l,
},
 
description_xl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xl,
},
description_xl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xl,
},
description_xl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xl,
},
description_xl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xl,
},
 
description_xxl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xxl,
},
description_xxl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xxl,
},
description_xxl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xxl,
},
description_xxl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xxl,
},
 
 
  /* ===================== CAPTION ===================== */
  /* ===================== CAPTION ===================== */
 
caption_xs_regular: {
  fontFamily: weight.regular,
  fontSize: size.xs,
},
caption_xs_medium: {
  fontFamily: weight.medium,
  fontSize: size.xs,
},
caption_xs_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xs,
},
caption_xs_bold: {
  fontFamily: weight.bold,
  fontSize: size.xs,
},
 
caption_s_regular: {
  fontFamily: weight.regular,
  fontSize: size.s,
},
caption_s_medium: {
  fontFamily: weight.medium,
  fontSize: size.s,
},
caption_s_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.s,
},
caption_s_bold: {
  fontFamily: weight.bold,
  fontSize: size.s,
},
 
caption_m_regular: {
  fontFamily: weight.regular,
  fontSize: size.m,
},
caption_m_medium: {
  fontFamily: weight.medium,
  fontSize: size.m,
},
caption_m_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.m,
},
caption_m_bold: {
  fontFamily: weight.bold,
  fontSize: size.m,
},
 
caption_l_regular: {
  fontFamily: weight.regular,
  fontSize: size.l,
},
caption_l_medium: {
  fontFamily: weight.medium,
  fontSize: size.l,
},
caption_l_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.l,
},
caption_l_bold: {
  fontFamily: weight.bold,
  fontSize: size.l,
},
 
caption_xl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xl,
},
caption_xl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xl,
},
caption_xl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xl,
},
caption_xl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xl,
},
 
caption_xxl_regular: {
  fontFamily: weight.regular,
  fontSize: size.xxl,
},
caption_xxl_medium: {
  fontFamily: weight.medium,
  fontSize: size.xxl,
},
caption_xxl_semibold: {
  fontFamily: weight.semibold,
  fontSize: size.xxl,
},
caption_xxl_bold: {
  fontFamily: weight.bold,
  fontSize: size.xxl,
},
 
} as const;
 
 
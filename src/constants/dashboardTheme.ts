import { colors } from "@/src/constants/colors";

/**
 * Chart + card tokens for the dashboard surfaces.
 *
 * `current` / `previous` is a two-step ramp of the brand green. It was checked
 * against a white chart surface and passes on all counts (lightness band,
 * chroma floor, protan/deutan/tritan separation, normal-vision separation and
 * 3:1 contrast), so "this period vs last period" stays readable for colour
 * vision deficiencies. Do not swap either value without re-checking the pair.
 *
 * Every neutral here is a true gray. Tinting the grays green made white cards
 * read as faintly off-white, which is what broke the clean-white look.
 */
export const chartTokens = {
  current: colors.primary, // #2d6b06
  previous: "#6f9c50",
  accent: colors.secondary,

  grid: "#EBEBEB",
  track: "#ECECEC",
  /** Soft wash of the brand green, for icon chips and highlight fills. */
  tint: "#EEF4E9",
  axisText: "#8C8C8C",
  surface: colors.light,

  positive: colors.primary,
  negative: "#C0392B",
} as const;

export const cardTokens = {
  radius: 20,
  padding: 16,
  border: "rgba(0, 0, 0, 0.04)",
  /**
   * Card edge. The 0.04 border above is all but invisible on a white page, so
   * white-on-white cards read as loose text; this is the step that actually
   * draws the tile without turning into a line.
   */
  hairline: "rgba(0, 0, 0, 0.085)",
  surface: colors.light,
  /** Neutral fill for icon chips, pills and inset strips. */
  mutedSurface: "#F7F7F7",
  inkPrimary: "#161616",
  inkSecondary: "#5A5A5A",
  inkMuted: "#8C8C8C",
} as const;

/** Airbnb's card elevation: wide, soft, and neutral — never a colour-cast blob. */
export const cardShadow = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
  elevation: 3,
} as const;

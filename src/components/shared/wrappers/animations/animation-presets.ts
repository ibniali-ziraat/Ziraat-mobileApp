export type AnimationType = "fade" | "slideUp" | "slideRight" | "scale";

export const animationDefaults = {
  fade: {
    opacity: 0,
    translateY: 0,
    translateX: 0,
    scale: 1,
  },
  slideUp: {
    opacity: 0,
    translateY: 40,
    translateX: 0,
    scale: 1,
  },
  slideRight: {
    opacity: 0,
    translateY: 0,
    translateX: -80,
    scale: 1,
  },
  scale: {
    opacity: 0,
    translateY: 0,
    translateX: 0,
    scale: 0.96,
  },
} as const;

export const BEZIER_CURVE = [0.25, 0.1, 0.25, 1] as const;

export const userRoutes = {
  profile: "/profile-form",
  address: "/address",
  education: "/education",
  profession: "/profession",
} as const;

export type UserRouteKey = keyof typeof userRoutes;

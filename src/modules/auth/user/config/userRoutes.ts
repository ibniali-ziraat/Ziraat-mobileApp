export const userRoutes = {
  profile: "auth/user/profile",
  address: "auth/user/address",
  education: "auth/user/education",
  profession: "auth/user/profession",
} as const;

export type UserRouteKey = keyof typeof userRoutes;

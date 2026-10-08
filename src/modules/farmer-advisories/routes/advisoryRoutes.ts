import type { AdvisoryKind } from "../services/farmeradvisories.service";

// route files live in src/app/(advisories)
export const ADVISORY_ROUTES = {
  LIST: "/advisories",
  DETAILS: "/advisory-details",
  OPERATION: "/advisory-operation",
} as const;

export const advisoryRoutes = {
  list: (orchardProfileId: number, orchardName?: string) => ({
    pathname: ADVISORY_ROUTES.LIST,
    params: {
      orchardProfileId: String(orchardProfileId),
      ...(orchardName ? { orchardName } : {}),
    },
  }),
  details: (recipientId: string) => ({
    pathname: ADVISORY_ROUTES.DETAILS,
    params: { recipientId },
  }),
  operation: (recipientId: string, kind: AdvisoryKind) => ({
    pathname: ADVISORY_ROUTES.OPERATION,
    params: { recipientId, kind },
  }),
};

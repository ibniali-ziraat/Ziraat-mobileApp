const CORE = "/api/core";

export const ORCHARD_ENDPOINTS = {
  orchard: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard/${id}`,
    byUser: (userId: string | number) =>
      `${CORE}/orchard/GetByUserId?userId=${userId}`,
  },

  variety: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchardProfile/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchardProfile/${orchardId}`,
  },

  soil: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-soil/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-soil/by-orchard/${orchardId}`,
  },

  nutrition: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-nutrition/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-nutrition/by-orchard/${orchardId}`,
  },

  protection: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-protection/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-protection/by-orchard/${orchardId}`,
  },

  infra: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-infra/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-infra/by-orchard/${orchardId}`,
  },

  marketing: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-marketing/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-marketing/by-orchard/${orchardId}`,
  },

  inputCost: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-inputcost/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-inputcost/by-orchard/${orchardId}`,
  },

  extra: {
    create: `${CORE}/orchardProfile`,
    byId: (id: string | number) => `${CORE}/orchard-extra/${id}`,
    byOrchard: (orchardId: string | number) =>
      `${CORE}/orchard-extra/by-orchard/${orchardId}`,
  },
} as const;

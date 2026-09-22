// Slice of GET /api/core/farmer-dashboard/aggregate that the dashboard home
// (list) screen actually needs — the farm-wide summary and the flat list of
// owned orchards. Per-orchard domain data (resources, pest/disease,
// nutrients, financial, advisory, alerts) is fetched separately, per tab,
// once an orchard is opened — see modules/dashboard/pages/OrchardDetailScreen.

export type DashboardSummary = {
  totalOrchards: number;
  totalAreaHa: number;
  totalAreaKanals: number;
  totalTrees: number;
  recordedHarvestKg: number | null;
  projectedYieldKg: number | null;
  totalRevenue: number | null;
  totalCost: number | null;
  totalProfit: number | null;
};

export type DashboardOrchardSummary = {
  orchardProfileId: number;
  orchardId: string;
  orchardName: string;
  district: string | null;
  tehsil: string | null;
  zone: string | null;
  pinCode: string | null;
  latitude: number;
  longitude: number;
  establishmentYear: number | null;
  areaHa: number;
  kanals: number;
  marlas: number;
  totalTrees: number;
};

export type DashboardHome = {
  summary: DashboardSummary;
  orchards: DashboardOrchardSummary[];
};

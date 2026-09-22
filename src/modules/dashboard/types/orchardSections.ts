// Every /api/core/farmer-dashboard/{domain} endpoint (nutrient, pest-disease,
// resources, financial, advisory, alerts) shares this same self-describing
// metric shape for its headline numbers.
export type DashboardMetric = {
  code: string;
  label: string;
  value: string | number | null;
  numericValue: number | null;
  unit: string | null;
  dataStatus: "missing" | "recorded" | string;
  description: string | null;
  source: string;
};

export type DashboardGraphPoint = {
  orchardProfileId?: number;
  series?: string;
  observedOn: string | null;
  label: string;
  value: number;
};

export type NutrientResponse = {
  orchards: Array<{
    orchardProfileId: number;
    orchardName: string;
    metrics: DashboardMetric[];
    soilHealthTrend: DashboardGraphPoint[];
  }>;
  metrics: DashboardMetric[];
  soilHealthTrend: DashboardGraphPoint[];
  trendNote: string | null;
};

export type PestDiseaseResponse = {
  metrics: DashboardMetric[];
  highRiskPests: any[];
  diseaseObservations: any[];
  spraySchedule: {
    lastAppliedSpray: string | null;
    nextScheduledSpray: string | null;
    missedSpraysThisMonth: number;
    compliancePercent: number | null;
  };
  pestDiseaseTrend: DashboardGraphPoint[];
  trendNote: string | null;
};

export type ResourcesResponse = {
  metrics: DashboardMetric[];
  resourceSummary: {
    fertilizerCost: number | null;
    fertilizerCostString: string | null;
    laborCost: number | null;
    laborCostString: string | null;
    materialCost: number | null;
    materialCostString: string | null;
    overallExpenditure: number | null;
    overallExpenditureString: string | null;
  };
  inputEfficiency: {
    fertilizerUse: number | null;
    laborProductivity: number | null;
    costEfficiency: number | null;
  };
  performanceInsights: string[];
};

export type FinancialInsight = {
  code: string;
  title: string;
  status: string;
};

export type FinancialResponse = {
  metrics: DashboardMetric[];
  revenueVsCost: DashboardGraphPoint[];
  netProfitTrend: DashboardGraphPoint[];
  recentInsights: FinancialInsight[];
};

export type AdvisoryResponse = {
  scope: string | null;
  keyMetrics: DashboardMetric[];
  engagementScore: {
    score: number | null;
    maxScore: number | null;
    label: string | null;
    percentile: number | null;
  };
  participationHeat: any[];
  recentActivities: Array<{
    occurredOn: string;
    title: string;
    reference: string;
    status: string;
  }>;
  knowledgeMessage: string | null;
};

export type AlertsResponse = {
  scope: string | null;
  summary: DashboardMetric[];
  categories: Array<{ code: string; label: string }>;
  recentTimeline: any[];
};

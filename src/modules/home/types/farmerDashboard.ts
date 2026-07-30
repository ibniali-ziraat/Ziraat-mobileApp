export interface FarmerDashboardParams {
  orchardProfileId: string | number;
}

export interface FarmActivityComparison {
  label: string;
  currentValue: number;
  previousValue: number;
  changePercent: number;
}

export interface FarmerDashboardFarmOverview {
  period: string;
  activityComparison: FarmActivityComparison[];
}

export interface FarmerDashboardTip {
  code: string;
  title: string;
  description?: string;
  detail?: string;
  warning?: string;
}

export interface FarmerDashboardResponse {
  home: {
    farmOverview: FarmerDashboardFarmOverview;
    tips: FarmerDashboardTip[];
    legalDisclaimer: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

import axiosInstance from "@/src/api/client/axiosInstance";
import type {
  FarmerDashboardParams,
  FarmerDashboardResponse,
} from "../types/farmerDashboard";

const BASE = "/api/core/farmer-dashboard";

export const farmerDashboardService = {
  get: async (
    params: FarmerDashboardParams,
    signal?: AbortSignal,
  ): Promise<FarmerDashboardResponse> => {
    const { data } = await axiosInstance.get<FarmerDashboardResponse>(BASE, {
      params: { orchardProfileId: params.orchardProfileId },
      signal,
    });

    console.log("[Farmer Dashboard] Server response:", data);

    return data;
  },
};

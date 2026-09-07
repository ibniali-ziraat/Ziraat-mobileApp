import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { farmerDashboardService } from "../services/farmerDashboard.service";
import type {
  FarmerDashboardParams,
  FarmerDashboardResponse,
} from "../types/farmerDashboard";

type OrchardProfileId = FarmerDashboardParams["orchardProfileId"];

export const farmerDashboardKeys = {
  all: ["farmer-dashboard"] as const,
  byProfile: (orchardProfileId?: OrchardProfileId) =>
    [...farmerDashboardKeys.all, orchardProfileId] as const,
};

type Options = Omit<
  UseQueryOptions<
    FarmerDashboardResponse,
    Error,
    FarmerDashboardResponse,
    ReturnType<typeof farmerDashboardKeys.byProfile>
  >,
  "queryKey" | "queryFn"
>;

export function useFarmerDashboard(
  orchardProfileId?: OrchardProfileId,
  options?: Options,
) {
  return useQuery({
    queryKey: farmerDashboardKeys.byProfile(orchardProfileId),
    queryFn: ({ signal }) =>
      farmerDashboardService.get({ orchardProfileId: orchardProfileId! }, signal),
    enabled: orchardProfileId != null && orchardProfileId !== "",
    staleTime: 60_000,
    ...options,
  });
}

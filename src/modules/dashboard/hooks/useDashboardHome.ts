import { useQuery } from "@tanstack/react-query";
import { getDashboardHome } from "../services/dashboardHome.service";

export const dashboardHomeKeys = {
  all: ["dashboard-home"] as const,
};

export const useDashboardHome = () =>
  useQuery({
    queryKey: dashboardHomeKeys.all,
    queryFn: ({ signal }) => getDashboardHome(signal),
    staleTime: 60_000,
  });

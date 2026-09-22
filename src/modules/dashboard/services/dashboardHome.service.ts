import axiosInstance from "@/src/api/client/axiosInstance";
import type { DashboardHome } from "../types/dashboardHome";

// Same aggregate endpoint the API team pointed us at for "basic details and
// all the orchards" — only `summary` and `orchards` are kept here. The
// per-orchard domain sections in the full response aren't used by this
// screen; they're fetched individually once a specific orchard is opened.
export const getDashboardHome = async (
  signal?: AbortSignal,
): Promise<DashboardHome> => {
  const { data } = await axiosInstance.get(
    "/api/core/farmer-dashboard/aggregate",
    { signal },
  );

  return {
    summary: data.summary,
    orchards: data.orchards ?? [],
  };
};

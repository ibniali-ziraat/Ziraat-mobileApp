import { useQuery } from "@tanstack/react-query";
import { fetchOrderStatuses } from "../services/order-status.services";

export const useOrderStatuses = () => {
  return useQuery({
    queryKey: ["order-statuses"],
    queryFn: fetchOrderStatuses,
    // Not Infinity: one failed or empty answer would stick until restart.
    staleTime: 60 * 60 * 1000,
  });
};

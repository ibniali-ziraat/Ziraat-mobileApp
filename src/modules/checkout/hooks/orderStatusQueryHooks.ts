import { useQuery } from "@tanstack/react-query";
import { fetchOrderStatuses } from "../services/order-status.services";

export const useOrderStatuses = () => {
  return useQuery({
    queryKey: ["order-statuses"],
    queryFn: fetchOrderStatuses,
    staleTime: Infinity,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getOrderDetails, getUserOrders } from "../Schema/Orders.services";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
  });
};

//single order detail
export const useOrderDetails = (orderId: number) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
};

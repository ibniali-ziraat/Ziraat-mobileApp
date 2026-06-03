import axiosInstance from "@/src/api/client/axiosInstance";

export interface OrderStatus {
  id: number;
  name: string;
}

export const fetchOrderStatuses = async (): Promise<OrderStatus[]> => {
  const { data } = await axiosInstance.get("/api/orders/order-status");
  return data;
};

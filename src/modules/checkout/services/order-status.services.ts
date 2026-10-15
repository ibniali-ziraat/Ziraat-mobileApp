import axiosInstance from "@/src/api/client/axiosInstance";

export interface OrderStatus {
  id: number;
  name: string;
}

export const fetchOrderStatuses = async (): Promise<OrderStatus[]> => {
  const { data } = await axiosInstance.get("/api/orders/order-status");
  // Accept a bare array or a { data | items | result } wrapper.
  const list = Array.isArray(data)
    ? data
    : (data?.data ?? data?.items ?? data?.result ?? []);
  return Array.isArray(list) ? list : [];
};

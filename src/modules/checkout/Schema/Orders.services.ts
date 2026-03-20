import axiosInstance from "@/src/api/client/axiosInstance";

export const getUserOrders = async () => {
  const response = await axiosInstance.get("/user/orders");

  const data = response.data;

  if (!data) {
    throw new Error("Failed to fetch orders");
  }

  return data;
};

//single order details
export const getOrderDetails = async (orderId: number) => {
  const response = await axiosInstance.get(`/user/orders/${orderId}`);
  return response.data;
};

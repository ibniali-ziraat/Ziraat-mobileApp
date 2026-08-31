import axiosInstance from "@/src/api/client/axiosInstance";

export const registerDeviceToken = async (payload: {
  token: string;
  platform: string;
}) => {
  const response = await axiosInstance.post("/api/notifications/save-token", payload);

  return response.data;
};

export const updateTokenLocation = async (payload: {
  userId: string;
  token: string;
  lat: number;
  lon: number;
}) => {
  const response = await axiosInstance.patch("/api/notifications/save-token", payload);

  return response.data;
};

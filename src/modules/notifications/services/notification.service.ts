import notificationInstance from "@/src/api/client/notificationInstance";

export const registerDeviceToken = async (payload: {
  userId: string;
  token: string;
  platform: string;
  lat?: number;
  lon?: number;
}) => {
  const response = await notificationInstance.post("/api/save-token", payload);
  return response.data;
};

export const updateTokenLocation = async (payload: {
  userId: string;
  token: string;
  lat: number;
  lon: number;
}) => {
  const response = await notificationInstance.patch("/save-token", payload);
  return response.data;
};

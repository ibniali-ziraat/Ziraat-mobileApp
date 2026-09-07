import axiosInstance from "@/src/api/client/axiosInstance";

export const registerDeviceToken = async (payload: {
  token: string;
  platform: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
}) => {
  const response = await axiosInstance.post("/api/notifications/save-token", payload);

  return response.data;
};

export type RegisteredDevice = {
  id: number;
  userId: number;
  token: string;
  platform: string;
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
  createdOn: string;
  updatedOn: string;
};

export const getDeviceTokens = async (
  userId: number,
): Promise<RegisteredDevice[]> => {
  const response = await axiosInstance.get("/api/notifications/devices", {
    params: { userId },
  });
  return response.data?.tokens ?? [];
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

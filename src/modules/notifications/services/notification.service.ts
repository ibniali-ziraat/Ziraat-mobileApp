import notificationInstance from "@/src/api/client/notificationInstance";

export const registerDeviceToken = async (payload: {
  userId: number;
  token: string;
  type: string;
  lat?: number;
  lon?: number;
}) => {
  console.log("🔥 API HIT", payload);

  const response = await notificationInstance.post(
    "api/devices/register",
    payload,
  );

  console.log("🔥 RESPONSE", response.data);

  return response.data;
};

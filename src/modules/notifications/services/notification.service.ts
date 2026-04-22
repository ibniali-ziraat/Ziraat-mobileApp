import notificationInstance from "@/src/api/client/notificationInstance";

export const registerDeviceToken = async (payload) => {
  console.log("🔥 API HIT", payload);

  const response = await notificationInstance.post(
    "/devices/save-token",
    payload,
  );

  console.log("🔥 RESPONSE", response.data);

  return response.data;
};

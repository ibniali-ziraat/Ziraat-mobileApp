import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useRegisterDeviceToken } from "../../notifications/hooks/notification.hooks";

export function useRegisterToken(coords: { lat: number; lon: number } | null) {
  const { mutate: registerToken } = useRegisterDeviceToken();

  useEffect(() => {
    (async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");
        if (!userId) {
          console.warn("[useRegisterToken] no user_id in storage, skipping");
          return;
        }

        const token = await messaging().getToken();
        if (!token) return;

        const payload = {
          userId,
          token,
          platform: Platform.OS,
          lat: coords?.lat,
          lon: coords?.lon,
        };

        console.log("[useRegisterToken] registering →", payload);

        registerToken(payload, {
          onSuccess: (data) => console.log("[useRegisterToken] ✓ saved:", data),
          onError: (err) => console.warn("[useRegisterToken] ✗ failed:", err),
        });
      } catch (err) {
        console.warn("[useRegisterToken] token error:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

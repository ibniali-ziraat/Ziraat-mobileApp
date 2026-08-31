import { useAuth } from "@/src/contexts/AuthContext";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useRegisterDeviceToken } from "../../notifications/hooks/notification.hooks";

export function useRegisterToken() {
  const { mutate: registerToken } = useRegisterDeviceToken();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      console.warn("[useRegisterToken] no user_id in storage, skipping");
      return;
    }

    (async () => {
      try {
        const token = await messaging().getToken();
        if (!token) return;

        const payload = {
          token,
          platform: Platform.OS,
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
  }, [userId, registerToken]);
}

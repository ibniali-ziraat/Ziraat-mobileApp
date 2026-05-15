/**
 * useRegisterToken.ts
 *
 * Registers the Firebase device token + location once when the app mounts.
 * Lives in the Home module since HomeScreen is the first authenticated screen.
 */

import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useRegisterDeviceToken } from "../../notifications/hooks/notification.hooks";

// TODO: replace with your real auth context
const CURRENT_USER_ID = "100";

export function useRegisterToken(coords: { lat: number; lon: number } | null) {
  const { mutate: registerToken } = useRegisterDeviceToken();

  useEffect(() => {
    (async () => {
      try {
        const token = await messaging().getToken();
        if (!token) return;

        const payload = {
          userId: CURRENT_USER_ID,
          token,
          platform: Platform.OS,
          lat: coords?.lat,
          lon: coords?.lon,
        };

        // Log is already inside registerDeviceToken service function,
        // but log here too so we can see coords at call site
        console.log("[useRegisterToken] registering →", payload);

        registerToken(payload, {
          onSuccess: (data) => console.log("[useRegisterToken] ✓ saved:", data),
          onError: (err) => console.warn("[useRegisterToken] ✗ failed:", err),
        });
      } catch (err) {
        console.warn("[useRegisterToken] token error:", err);
      }
    })();
    // Run once on mount — coords may be null initially, that's fine,
    // location updates are handled separately by useUpdateTokenLocation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

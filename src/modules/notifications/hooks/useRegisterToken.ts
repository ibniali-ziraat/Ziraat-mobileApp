import { useAuth } from "@/src/contexts/AuthContext";
import { useLocation } from "@/src/hooks/useLocationPermission";
import { reverseGeocode } from "@/src/services/locationService";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useRegisterDeviceToken } from "../../notifications/hooks/notification.hooks";
import { getDeviceTokens } from "../services/notification.service";

// ~1.1km at these latitudes — re-register on a meaningful location change,
// but not on GPS noise between two readings of roughly the same spot.
const COORD_TOLERANCE = 0.01;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// FCM's getToken() can throw SERVICE_NOT_AVAILABLE transiently — most often
// right after a fresh install, before Google Play Services has finished
// warming up. Retry a few times with backoff before giving up, so a
// momentary hiccup doesn't mean the device silently never registers.
const getFcmTokenWithRetry = async (
  attempts = 4,
  delayMs = 3000,
): Promise<string | null> => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await messaging().getToken();
    } catch (err) {
      if (attempt === attempts) throw err;
      console.warn(
        `[useRegisterToken] getToken failed (attempt ${attempt}/${attempts}), retrying…`,
        err,
      );
      await sleep(delayMs * attempt);
    }
  }
  return null;
};

export function useRegisterToken() {
  const { mutate: registerToken } = useRegisterDeviceToken();
  const { userId } = useAuth();
  // Live GPS at login time — deliberately not the registered tehsil, since
  // this is for location-based notification targeting (where the device
  // actually is right now), not the weather display.
  const { coords, loading: locLoading } = useLocation(true, { prompt: false });

  useEffect(() => {
    if (!userId) {
      console.warn("[useRegisterToken] no user_id in storage, skipping");
      return;
    }
    // Wait for GPS to settle (success, denial, or timeout) so location can
    // be included when available, without registering twice.
    if (locLoading) return;

    (async () => {
      try {
        const token = await getFcmTokenWithRetry();
        if (!token) return;

        // Ask the server whether this exact device is already registered,
        // rather than trusting on-device state — the server is the only
        // source that can't drift out of sync with itself (reinstalls,
        // cleared storage, or a token silently dropped server-side would
        // all make a local cache lie).
        const existingDevices = await getDeviceTokens(Number(userId)).catch(
          (err) => {
            console.warn("[useRegisterToken] devices lookup failed:", err);
            return null; // unknown state — fall through and register
          },
        );
        const existing = existingDevices?.find((d) => d.token === token);

        const coordsChanged =
          !!coords &&
          (!existing ||
            existing.latitude === null ||
            existing.longitude === null ||
            Math.abs(existing.latitude - coords.lat) > COORD_TOLERANCE ||
            Math.abs(existing.longitude - coords.lon) > COORD_TOLERANCE);

        if (existing && !coordsChanged) {
          console.log(
            "[useRegisterToken] already registered for this device/user, skipping",
          );
          return;
        }

        const locationName = coords
          ? await reverseGeocode(coords.lat, coords.lon)
          : null;

        const payload = {
          token,
          platform: Platform.OS,
          ...(coords && {
            latitude: coords.lat,
            longitude: coords.lon,
          }),
          ...(locationName && { locationName }),
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
  }, [userId, coords, locLoading, registerToken]);
}

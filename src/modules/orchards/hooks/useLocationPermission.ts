import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type LocationStatus = "loading" | "ready" | "denied" | "error";

export function useLocationPermission() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [status, setStatus] = useState<LocationStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { status: permission } =
          await Location.requestForegroundPermissionsAsync();
        if (permission !== "granted") {
          if (!cancelled) setStatus("denied");
          return;
        }

        // a cold GPS fix can take a long time (or never arrive indoors) —
        // use the last known position straight away so the map isn't stuck
        const lastKnown = await Location.getLastKnownPositionAsync();
        if (lastKnown && !cancelled) {
          setLocation(lastKnown.coords);
          setStatus("ready");
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setLocation(current.coords);
          setStatus("ready");
        }
      } catch (err) {
        console.warn("[useLocationPermission] could not get location:", err);
        if (!cancelled) {
          setStatus((prev) => (prev === "ready" ? prev : "error"));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { location, status };
}

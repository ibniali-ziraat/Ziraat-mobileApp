import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // 1. Check if the physical hardware/switch is ON
        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          setError("Location services are disabled. Please turn on GPS.");
          setLoading(false);
          return;
        }

        // 2. Check for App Permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission denied. We need location for local weather.");
          setLoading(false);
          return;
        }

        // 3. Get the Position
        const loc = await Location.getCurrentPositionAsync({});
        setCoords({
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        });
      } catch (err) {
        setError("Unable to find location.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { coords, loading, error };
}

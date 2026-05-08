import * as Location from "expo-location";
import { useRef, useState } from "react";

export function useWalkMeasurement() {
  const [path, setPath] = useState([]);
  const watcher = useRef<Location.LocationSubscription | null>(null);

  const start = async () => {
    setPath([]);
    watcher.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      (loc) => setPath((p) => [...p, loc.coords]),
    );
  };

  const stop = () => {
    watcher.current?.remove();
    watcher.current = null;
  };

  const reset = () => {
    stop();
    setPath([]);
  };

  return { path, start, stop, reset };
}

import {
  LocationStatus,
  useLocationWatcher,
  WatchedCoords,
} from "@/src/hooks/useLocationWatcher";
import { createContext, ReactNode, useContext } from "react";

interface LocationContextValue {
  coords: WatchedCoords | null;
  status: LocationStatus;
  recheck: () => Promise<void>;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const value = useLocationWatcher({ updateInterval: 10_000 });
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx)
    throw new Error(
      "useLocationContext must be used inside <LocationProvider>",
    );
  return ctx;
}

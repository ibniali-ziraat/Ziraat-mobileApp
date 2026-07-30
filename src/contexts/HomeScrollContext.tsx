import { createContext, useContext, type ReactNode } from "react";
import { useSharedValue, type SharedValue } from "react-native-reanimated";

/**
 * The home header lives in the navigator, outside the screen's scroll view, so
 * the two can only talk through a shared value hoisted above both of them.
 */
const HomeScrollContext = createContext<SharedValue<number> | null>(null);

export function HomeScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useSharedValue(0);

  return (
    <HomeScrollContext.Provider value={scrollY}>
      {children}
    </HomeScrollContext.Provider>
  );
}

export function useHomeScrollY(): SharedValue<number> | null {
  return useContext(HomeScrollContext);
}

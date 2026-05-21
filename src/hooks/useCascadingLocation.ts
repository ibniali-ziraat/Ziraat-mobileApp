import locations from "@/src/data/locations.json";
import { useMemo, useState } from "react";

type StateName = string | null;

export function useCascadingLocation(fixedState?: string) {
  const [selectedState, setSelectedState] = useState<StateName>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Decide which state to use
  const effectiveState = fixedState ?? selectedState;

  const states = useMemo(() => Object.keys(locations), []);

  const districts = useMemo(() => {
    if (!effectiveState) return [];
    return Object.keys(locations[effectiveState] ?? {});
  }, [effectiveState]);

  const tehsils = useMemo(() => {
    if (!effectiveState || !selectedDistrict) return [];
    return locations[effectiveState]?.[selectedDistrict] ?? [];
  }, [effectiveState, selectedDistrict]);

  console.log(states, "states...");

  return {
    states, // only useful when you want state selection
    districts,
    tehsils,
    selectedState,
    selectedDistrict,
    setSelectedState,
    setSelectedDistrict,
  };
}

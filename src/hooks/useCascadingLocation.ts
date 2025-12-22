import locations from "@/src/data/locations.json";
import { useState } from "react";

export function useCascadingLocation() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const states = Object.keys(locations);

  const districts = selectedState ? Object.keys(locations[selectedState]) : [];

  const tehsils =
    selectedState && selectedDistrict
      ? locations[selectedState][selectedDistrict]
      : [];

  return {
    states,
    districts,
    tehsils,
    selectedState,
    selectedDistrict,
    setSelectedState,
    setSelectedDistrict,
  };
}

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { searchLocation } from "../services/locationService";
import { useAddressQuery } from "./userQueryHooks";

/**
 * Resolves the user's registered tehsil (from their profile address) to
 * coordinates, so weather can default to their registered farm location
 * instead of wherever they're physically standing / without needing GPS
 * permission at all.
 */
export function useTehsilLocation() {
  const { userProfileId } = useAuth();
  const { data: address, isLoading: addressLoading } =
    useAddressQuery(userProfileId);

  const tehsil = address?.tehsil as string | undefined;

  // Bare tehsil name only — exactly what the manual search box sends.
  // Appending district/state made this a *worse* match: Nominatim's
  // free-text search treats the whole string as one fuzzy address query,
  // and a compound-name nearby place (e.g. "Wata Magam" in a different
  // tehsil) can outscore the actual town ("MAGAM") once those extra terms
  // are added, even though they were meant to disambiguate.
  const geocodeQuery = tehsil ?? null;

  const { data: geocoded, isLoading: geocodeLoading } = useQuery({
    queryKey: ["tehsilGeocode", geocodeQuery],
    queryFn: async () => {
      const results = await searchLocation(geocodeQuery as string);
      return results[0] ?? null;
    },
    enabled: !!geocodeQuery,
    staleTime: 24 * 60 * 60 * 1000, // a tehsil's location never moves
  });

  return {
    coords: geocoded ? { lat: geocoded.lat, lon: geocoded.lon } : null,
    tehsilName: tehsil ?? null,
    loading: addressLoading || (!!geocodeQuery && geocodeLoading),
  };
}

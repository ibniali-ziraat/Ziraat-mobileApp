import { useQuery } from "@tanstack/react-query";
import {
  fetchCountries,
  fetchDistrictsByStates,
  fetchStatesByCountry,
} from "../../services/checkoutProduct/Address/address.services";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

export const useStates = (countryId: string) => {
  return useQuery({
    queryKey: ["states", countryId],
    queryFn: () => fetchStatesByCountry(countryId),
    enabled: !!countryId,
  });
};

export const useDistricts = (stateId: string) => {
  return useQuery({
    queryKey: ["states", stateId],
    queryFn: () => fetchDistrictsByStates(stateId),
    enabled: !!stateId,
  });
};

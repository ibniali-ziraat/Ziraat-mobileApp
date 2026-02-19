import { useQuery } from "@tanstack/react-query";
import {
    fetchCountries,
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

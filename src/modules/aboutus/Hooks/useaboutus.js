import { useQuery } from "@tanstack/react-query";
import { GetAboutUsData } from "../Services/aboutus.services";

export const ABOUT_US_QUERY_KEY = ["aboutUs"];

export const useAboutUs = (options = {}) => {
  const query = useQuery({
    queryKey: ABOUT_US_QUERY_KEY,
    queryFn: GetAboutUsData,
    staleTime: 1000 * 60 * 30, // About Us rarely changes, so cache for 30 min
    retry: 1,
    ...options, // lets callers override, e.g. { enabled: false }
  });

  return {
    aboutUs: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

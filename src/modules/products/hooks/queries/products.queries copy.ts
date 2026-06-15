import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  buyProduct,
  compareProducts,
  getBestDeals,
  getProductById,
  getProductBySearch,
  getProducts,
  getTrendingProducts,
  searchWithVendors,
} from "../../services/product.service";

export const useProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useProductByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

export const useProductSearch = (params: {
  query?: string;
  brand?: string;
  category?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  minRating?: number;
  enabled?: boolean;
}) => {
  const { enabled = true, ...queryParams } = params;

  return useQuery({
    queryKey: ["product-search", JSON.stringify(queryParams)],
    queryFn: () => getProductBySearch(queryParams),
    keepPreviousData: true,
    enabled,
  });
};

export const useBuyProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useTrendingProducts = () =>
  useQuery({
    queryKey: ["trending-products"],
    queryFn: getTrendingProducts,
    staleTime: 1000 * 60 * 30,
  });

export const useBestDeals = () =>
  useQuery({
    queryKey: ["best-deals"],
    queryFn: getBestDeals,
    staleTime: 1000 * 60 * 5,
  });

export const useSearchWithVendors = (payload: {
  query?: string;
  brand?: string;
  category?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) =>
  useQuery({
    queryKey: ["search-with-vendors", payload],
    queryFn: () => searchWithVendors(payload),
    enabled: !!payload,
  });

export const useCompareProducts = () =>
  useMutation({
    mutationFn: compareProducts,
  });

export const useProductsWithFallback = (
  params: {
    query?: string;
    brand?: string;
    category?: string;
    page?: number;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    minRating?: number;
  } = {},
) => {
  const vendorQuery = useProductsQuery();

  const vendorHasProducts =
    Array.isArray(vendorQuery.data?.products) &&
    vendorQuery.data.products.length > 0;

  const shouldFallback =
    !vendorQuery.isLoading && !vendorQuery.isFetching && !vendorHasProducts;

  const searchQuery = useProductSearch({
    ...params,
    enabled: shouldFallback,
  });

  if (vendorQuery.isLoading || vendorQuery.isFetching) {
    return {
      data: undefined,
      isLoading: true,
      isFetching: true,
      refetch: vendorQuery.refetch,
      isFallback: false,
    };
  }

  if (!shouldFallback) {
    return {
      data: vendorQuery.data,
      isLoading: false,
      isFetching: false,
      refetch: vendorQuery.refetch,
      isFallback: false,
    };
  }

  return {
    data: searchQuery.data,
    isLoading: searchQuery.isLoading,
    isFetching: searchQuery.isFetching,
    refetch: searchQuery.refetch,
    isFallback: true,
  };
};

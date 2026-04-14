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
}) =>
  useQuery({
    queryKey: ["product-search", params],
    queryFn: () => getProductBySearch(params),
    // enabled: !!params.query,
    // keepPreviousData: true, // keeps old data while fetching new
  });

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

// Trending Products (30 min cache)
export const useTrendingProducts = () =>
  useQuery({
    queryKey: ["trending-products"],
    queryFn: getTrendingProducts,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

// Best Deals (5 min cache)
export const useBestDeals = () =>
  useQuery({
    queryKey: ["best-deals"],
    queryFn: getBestDeals,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

// Search with Vendors
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
    enabled: !!payload, // always runs if payload exists
  });

// Compare Products (Mutation)
export const useCompareProducts = () =>
  useMutation({
    mutationFn: compareProducts,
  });

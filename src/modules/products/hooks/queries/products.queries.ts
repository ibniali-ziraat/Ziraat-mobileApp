import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  buyProduct,
  getProductById,
  getProductBySearch,
  getProducts,
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

// useProductSearch.ts

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

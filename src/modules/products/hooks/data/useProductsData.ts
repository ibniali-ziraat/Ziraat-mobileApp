import { normalizeProduct } from "@/src/domain/product/product.normalizer";
import { useProductsQuery } from "@/src/modules/products/hooks/queries/useProductsQuery";
import { useMemo } from "react";

export const useProductsData = () => {
  const query = useProductsQuery();

  const products = useMemo(() => {
    if (!query.data?.products) return [];
    return query.data.products.map(normalizeProduct);
  }, [query.data]);

  return {
    products,
    total: query.data?.totalProduct ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

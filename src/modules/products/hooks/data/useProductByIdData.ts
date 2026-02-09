import { normalizeSingleProduct } from "@/src/domain/product/product.normalizer";
import { useMemo } from "react";
import { useProductByIdQuery } from "../queries/useProductsQuery";

export const useProductByIdData = (productId?: string | string[]) => {
  const query = useProductByIdQuery(productId);

  const product = useMemo(() => {
    if (!query.data) return null;
    return normalizeSingleProduct(query.data);
  }, [query.data]);

  return {
    product,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

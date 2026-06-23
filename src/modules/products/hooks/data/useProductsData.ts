// import { useProductsWithFallback } from "../queries/products.queries";

import { useProductsQuery } from "../queries/products.queries";

export const useProductsData = (
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
  const { data, isLoading, isFetching, isFallback } =
    useProductsQuery(params);

  const categories = data?.filterOption?.categories ?? [];
  const brands = data?.filterOption?.brands ?? [];
  const vendors = data?.vendors ?? [];
  const priceRange = data?.filterOption?.price ?? {
    minPrice: 0,
    maxPrice: 0,
  };
  const sortOptions = data?.availableSortOptions ?? [];

  return {
    filterOptions: { brands, categories },
    categories,
    brands,
    vendors, // 👈 add this
    priceRange,
    sortOptions,
    isLoading,
    isFetching,
    isFallback,
    isReady: !isLoading && !isFetching,
  };
};

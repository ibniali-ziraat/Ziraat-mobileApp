import { useDebounce } from "@/src/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

import { NormalizedProduct, ProductFilters } from "../types/productlist.types";
import { normalizeProducts } from "../utils/utils";
import { useProductsWithFallback } from "./queries/products.queries";

interface UsePaginatedProductsParams {
  search: string;
  filters: ProductFilters;
  activeCategory: string;
}

export function usePaginatedProducts({
  search,
  filters,
  activeCategory,
}: UsePaginatedProductsParams) {
  const [page, setPage] = useState(1);
  const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const scrollRef = useRef<FlatList<NormalizedProduct>>(null);
  const debouncedSearch = useDebounce(search, 500);

  const isFiltering = Boolean(
    filters?.brand ||
    filters?.category ||
    filters?.minPrice ||
    filters?.maxPrice ||
    filters?.sort ||
    filters?.minRating ||
    debouncedSearch,
  );

  const {
    data,
    isFetching,
    isLoading,
    refetch: productSearchRefetch,
  } = useProductsWithFallback({
    query: debouncedSearch || undefined,
    brand: filters?.brand,
    category:
      !isFiltering && activeCategory !== "All"
        ? activeCategory
        : filters?.category || undefined,
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
    sort: filters?.sort,
    minRating: filters?.minRating,
    page,
  });

  // RESET ON FILTER / SEARCH / CATEGORY CHANGE
  useEffect(() => {
    setPage(1);
    setAccumulatedProducts([]);
    setHasMore(true);
    setIsFetchingMore(false);
    scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [debouncedSearch, JSON.stringify(filters), activeCategory]);

  // ACCUMULATE PAGES
  useEffect(() => {
    if (!data?.products) {
      setIsFetchingMore(false);
      return;
    }

    if (page === 1) {
      setAccumulatedProducts(data.products);
    } else {
      setAccumulatedProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newProducts = data.products.filter(
          (item: any) => !existingIds.has(item.id),
        );
        return [...prev, ...newProducts];
      });
    }

    const totalLoaded =
      page === 1
        ? data.products.length
        : accumulatedProducts.length + data.products.length;

    setHasMore(totalLoaded < data.totalProduct);
    setIsFetchingMore(false);
  }, [data, page]);

  // PAGINATION TRIGGER
  const handleEndReached = () => {
    if (isLoading) return;
    if (isFetching) return;
    if (isFetchingMore) return;
    if (!hasMore) return;
    if (!data?.products?.length) return;

    setIsFetchingMore(true);
    setPage((prev) => prev + 1);
  };

  const normalizedProducts = normalizeProducts(accumulatedProducts);

  // CLIENT-SIDE RATING FILTER
  const displayedProducts =
    filters?.minRating != null
      ? normalizedProducts.filter(
          (p) => Number((p as any).rating ?? 0) >= Number(filters.minRating),
        )
      : normalizedProducts;

  // PULL TO REFRESH
  const refresh = async () => {
    setPage(1);
    setAccumulatedProducts([]);
    setHasMore(true);
    setIsFetchingMore(false);
    await productSearchRefetch();
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return {
    scrollRef,
    displayedProducts,
    isLoading,
    isFetching,
    isFetchingMore,
    hasMore,
    handleEndReached,
    refresh,
    productSearchRefetch,
  };
}

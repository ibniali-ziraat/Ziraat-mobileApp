import { useDebounce } from "@/src/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { NormalizedProduct, ProductFilters } from "../types/productlist.types";
import { normalizeProducts } from "../utils/utils";
import { useProductSearch } from "./queries/products.queries";

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
  const isFiltering = Object.keys(filters).length > 0 || !!debouncedSearch;

  const { data, isFetching, isLoading } = useProductSearch({
    query: debouncedSearch || undefined,
    category:
      !isFiltering && activeCategory !== "All" ? activeCategory : undefined,
    page,
    ...filters,
  });

  // Accumulate pages
  useEffect(() => {
    if (!data?.products) return;

    setAccumulatedProducts((prev) => {
      const updated = page === 1 ? data.products : [...prev, ...data.products];
      setHasMore(updated.length < data.totalProduct);
      return updated;
    });

    setIsFetchingMore(false);
  }, [data]);

  // Reset on filter/search/category change
  useEffect(() => {
    setPage(1);
    setAccumulatedProducts([]);
    setHasMore(true);
    scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [debouncedSearch, filters, activeCategory]);

  const handleEndReached = () => {
    if (isFetching || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    setPage((prev) => prev + 1);
  };

  const normalizedProducts = normalizeProducts(accumulatedProducts);

  const displayedProducts =
    filters?.minRating != null
      ? normalizedProducts.filter(
          (p) => Number((p as any).rating ?? 0) >= Number(filters.minRating),
        )
      : normalizedProducts;

  return {
    scrollRef,
    displayedProducts,
    isLoading,
    isFetching,
    isFetchingMore,
    hasMore,
    handleEndReached,
  };
}

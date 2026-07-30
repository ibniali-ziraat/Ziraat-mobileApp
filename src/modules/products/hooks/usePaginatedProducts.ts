import { useDebounce } from "@/src/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

import { NormalizedProduct, ProductFilters } from "../types/productlist.types";
import { normalizeProducts } from "../utils/utils";
import { useProductsQuery } from "./queries/products.queries";

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

  const queryParams = {
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
  };

  const {
    data,
    isFetching,
    isLoading,
    refetch: productSearchRefetch,
  } = useProductsQuery(queryParams);

  // RESET ON FILTER / SEARCH / CATEGORY CHANGE
  useEffect(() => {
    setPage(1);
    setAccumulatedProducts([]);
    setHasMore(true);
    setIsFetchingMore(false);
    scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [debouncedSearch, JSON.stringify(filters), activeCategory]);

  // ACCUMULATE PAGES (single source of truth)
  useEffect(() => {
    if (!data?.products) {
      setIsFetchingMore(false);
      return;
    }

    const hasTotal = typeof data.totalProduct === "number";

    if (page === 1) {
      setAccumulatedProducts(data.products);
      // The API doesn't always send totalProduct — when it's missing we can't
      // compare counts, so "more pages exist" falls back to "this page wasn't
      // empty" and later pages stop things once a page brings nothing new.
      setHasMore(
        hasTotal
          ? data.products.length < (data.totalProduct as number)
          : data.products.length > 0,
      );
    } else {
      setAccumulatedProducts((prev) => {
        // A product can be listed by several vendors under the same product
        // `id` — `vendorProductId` is what's actually unique per listing, so
        // it has to come first or different vendors' listings collide here.
        const existingKeys = new Set(
          prev.map((item) => item.vendorProductId ?? item.id),
        );
        const newProducts = data.products.filter(
          (item: any) => !existingKeys.has(item.vendorProductId ?? item.id),
        );
        const merged = [...prev, ...newProducts];
        setHasMore(
          hasTotal
            ? merged.length < (data.totalProduct as number)
            : newProducts.length > 0,
        );
        return merged;
      });
    }

    setIsFetchingMore(false);
  }, [data, page]);

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

  const displayedProducts =
    filters?.minRating != null
      ? normalizedProducts.filter(
          (p) => Number((p as any).rating ?? 0) >= Number(filters.minRating),
        )
      : normalizedProducts;

  // PULL TO REFRESH
  const refresh = async () => {
    setIsFetchingMore(false);

    if (page === 1) {
      // Same query key — identical refetched data won't retrigger the
      // accumulate effect (structural sharing), so replace the list manually
      // from the refetch result.
      const res = await productSearchRefetch();
      const fresh = res.data;
      if (fresh?.products) {
        setAccumulatedProducts(fresh.products);
        setHasMore(
          typeof fresh.totalProduct === "number"
            ? fresh.products.length < fresh.totalProduct
            : fresh.products.length > 0,
        );
      }
    } else {
      // Different page — jumping back to page 1 changes the query key,
      // which triggers a fetch and the accumulate effect replaces the list.
      setPage(1);
      setHasMore(true);
    }

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
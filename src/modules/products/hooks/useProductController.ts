import { useDebounce } from "@/src/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useWishlist } from "../../wishlist/hooks/useWishlist";
import { normalizeProducts } from "../utils/utils";
import { useProductsData } from "./data/useProductsData";
import { useProductSearch } from "./queries/products.queries";

export function useProductController() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [activeCategory, setActiveCategory] = useState("All");

  const [page, setPage] = useState(1);
  const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const isFiltering = Object.keys(filters).length > 0 || !!debouncedSearch;

  const {
    wishlist,
    isBusy,
    addToWishlist,
    removeFromWishlist,
    getWishlistItemId,
  } = useWishlist();

  const { filterOptions = [] } = useProductsData();

  const { data, isFetching, isLoading } = useProductSearch({
    query: debouncedSearch || undefined,
    category:
      !isFiltering && activeCategory !== "All" ? activeCategory : undefined,
    page,
    ...filters,
  });

  useEffect(() => {
    if (!data?.products) return;

    const incoming = data.products;

    setAccumulatedProducts((prev) => {
      const updated = page === 1 ? incoming : [...prev, ...incoming];
      setHasMore(updated.length < data.totalProduct);
      return updated;
    });

    setIsFetchingMore(false);
  }, [data]);

  useEffect(() => {
    setPage(1);
    setAccumulatedProducts([]);
    setHasMore(true);
  }, [debouncedSearch, filters, activeCategory]);

  const loadMore = () => {
    if (isFetching || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    setPage((p) => p + 1);
  };

  const toggleWishlist = async (
    productId: string | number,
    vendorId?: string | number,
    vendorProductId?: string | number,
  ) => {
    const id = getWishlistItemId(productId, vendorId);

    if (id) await removeFromWishlist({ id });
    else await addToWishlist({ productId, vendorId, vendorProductId, quantity: 1 });
  };

  const normalizedProducts = normalizeProducts(accumulatedProducts);

  const products =
    filters?.minRating != null
      ? normalizedProducts.filter(
          (p) => Number((p as any).rating ?? 0) >= Number(filters.minRating),
        )
      : normalizedProducts;

  return {
    search,
    setSearch,
    filters,
    setFilters,
    activeCategory,
    setActiveCategory,

    products,
    filterOptions,

    wishlist,
    isBusy,

    isLoading,
    isFetchingMore,
    hasMore,

    loadMore,
    toggleWishlist,
  };
}

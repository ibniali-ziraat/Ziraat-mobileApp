import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useEffect, useState } from "react";
import { View } from "react-native";

import FilterBottomSheet from "./components/FilterBottomSheet";
import ProductSearchBar from "./components/ProductSearchBar";

import AllProductsCarousal from "./components/AllProductsCarousel";
import { useProductsData } from "./hooks/data/useProductsData";
import { useWishlist } from "./hooks/data/useWishlist";
import { useProductSearch } from "./hooks/queries/products.queries";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    wishlist,
    isWishlistBusy,
    addToWishlist,
    removeFromWishlist,
    isAdding,
    isRemoving,
  } = useWishlist();

  const handleWishlistToggle = async (productId: number) => {
    const wishlistItem = wishlist.find((item) => item.productId === productId);
    if (wishlistItem) {
      await removeFromWishlist(wishlistItem.id);
    } else {
      await addToWishlist({ productId });
    }
  };
  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist({ productId });
  };

  const handleRemoveFromWishlist = async (id: number) => {
    await removeFromWishlist({ id });
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { products: allProducts = [] } = useProductsData();

  const { data: filteredProductsData = {} } = useProductSearch({
    query: debouncedSearch,
    ...filters,
  });

  const filteredProducts = Array.isArray(filteredProductsData?.products)
    ? filteredProductsData.products
    : [];

  const displayedProducts =
    Object.keys(filters).length > 0 || debouncedSearch
      ? filteredProducts
      : allProducts;

  return (
    <ScreenLayout>
      <ScreenContent>
        {/* Search & Filters */}
        <ProductSearchBar
          search={search}
          setSearch={setSearch}
          onFilterPress={() => setFilterOpen(true)}
        />

        <FilterBottomSheet
          visible={filterOpen}
          onClose={() => setFilterOpen(false)}
          onApplyFilters={setFilters}
        />

        {/* Products Carousel */}
        {displayedProducts.length > 0 ? (
          <View className="mt-6">
            <AllProductsCarousal
              items={displayedProducts}
              wishlistItems={wishlist}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              isWishlistBusy={isWishlistBusy}
            />
          </View>
        ) : (
          <CsText className="mt-6" style={typography.Poppins_s_medium}>
            No products found
          </CsText>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { View } from "react-native";

import FilterBottomSheet from "./components/FilterBottomSheet";
import ProductSearchBar from "./components/ProductSearchBar";

import { useDebounce } from "@/src/hooks/useDebounce";
import { toast } from "@backpackapp-io/react-native-toast";
import AllProductsCarousal from "./components/AllProductsCarousel";
import { useProductsData } from "./hooks/data/useProductsData";
import { useWishlist } from "./hooks/data/useWishlist";
import { useProductSearch } from "./hooks/queries/products.queries";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const {
    wishlist,
    isWishlistBusy,
    addToWishlist,
    removeFromWishlist,
    isAdding,
    isRemoving,
  } = useWishlist();

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist({ productId });
    toast.success("Added to wishlist");
  };

  const handleRemoveFromWishlist = async (id: number) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  const { products: allProducts = [], filterOptions = [] } = useProductsData();

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
          filterOptions={filterOptions}
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

import { toast } from "@backpackapp-io/react-native-toast";
import { useState } from "react";
import { Pressable, View } from "react-native";

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useDebounce } from "@/src/hooks/useDebounce";

import AllProductsCarousal from "./components/AllProductsCarousel";
import FilterBottomSheet from "./components/FilterBottomSheet";
import ProductSearchBar from "./components/ProductSearchBar";

import { useWishlist } from "../wishlist/hooks/useWishlist";
import { useProductsData } from "./hooks/data/useProductsData";
import { useProductSearch } from "./hooks/queries/products.queries";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const {
    wishlist,
    isBusy,
    addToWishlist,
    removeFromWishlist,
    getWishlistItemId,
  } = useWishlist();
  const { products: allProducts = [], filterOptions = [] } = useProductsData();

  const { data: filteredProductsData = {} } = useProductSearch({
    query: debouncedSearch,
    ...filters,
  });

  const filteredProducts = Array.isArray(filteredProductsData?.products)
    ? filteredProductsData.products
    : [];

  const isFiltering = Object.keys(filters).length > 0 || debouncedSearch;
  const displayedProducts = isFiltering ? filteredProducts : allProducts;

  const handleToggleWishlist = async (productId: number) => {
    console.log("TOGGLE WISHLIST PRODUCT ID 👉", productId);
    const wishlistItemId = getWishlistItemId(productId);

    try {
      if (wishlistItemId) {
        await removeFromWishlist(wishlistItemId);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ productId, quantity: 1 });
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Process failed");
    }
  };

  const handleReset = () => {
    setFilters({});
    setSearch("");
    toast.success("Filters cleared");
  };

  return (
    <ScreenLayout>
      <ScreenContent>
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

        {displayedProducts.length > 0 ? (
          <View className="mt-6">
            <AllProductsCarousal
              items={displayedProducts}
              wishlistItems={wishlist}
              onToggleWishlist={handleToggleWishlist}
              isWishlistBusy={isBusy}
            />
          </View>
        ) : isFiltering ? (
          <View className="mt-20 items-center">
            <CsText style={typography.Poppins_m_semibold}>
              No products found
            </CsText>
            <CsText
              className="opacity-60 mt-2 mb-5 text-center"
              style={typography.Poppins_s_regular}
            >
              Try changing filters or search.
            </CsText>
            <Pressable
              onPress={handleReset}
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 25,
              }}
            >
              <CsText style={{ color: "#fff", fontWeight: "600" }}>
                Reset Filters
              </CsText>
            </Pressable>
          </View>
        ) : null}
      </ScreenContent>
    </ScreenLayout>
  );
}

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { Pressable, View } from "react-native";

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

  const { wishlist, isWishlistBusy, addToWishlist, removeFromWishlist } =
    useWishlist();

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist({ productId });
    toast.success("Added to wishlist");
  };

  const handleRemoveFromWishlist = async (id: number) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  const { products: allProducts = [], filterOptions = [] } = useProductsData();

  // console.log(allProducts, "all products...");

  const { data: filteredProductsData = {} } = useProductSearch({
    query: debouncedSearch,
    ...filters,
  });

  const filteredProducts = Array.isArray(filteredProductsData?.products)
    ? filteredProductsData.products
    : [];

  const isFiltering = Object.keys(filters).length > 0 || debouncedSearch;

  const displayedProducts = isFiltering ? filteredProducts : allProducts;

  const handleReset = () => {
    setFilters({});
    setSearch("");
    toast.success("Filters cleared");
  };

  return (
    <ScreenLayout>
      <ScreenContent>
        {/* SEARCH + FILTER */}
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

        {/* ================= PRODUCTS / EMPTY ================= */}

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
        ) : isFiltering ? (
          /* EMPTY FILTER RESULT */
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

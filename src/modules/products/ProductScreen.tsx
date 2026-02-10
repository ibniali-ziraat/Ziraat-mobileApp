import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useEffect, useState } from "react";
import { View } from "react-native";

import AllProductsCarousel from "./components/AllProductsCarousel";
import FilterBottomSheet from "./components/FilterBottomSheet";
import FilteredProductsCarousel from "./components/FilteredProductsCarousel";
import ProductSearchBar from "./components/ProductSearchBar";

import { useProductsData } from "./hooks/data/useProductsData";
import { useWishlist } from "./hooks/data/useWishlist";
import { useProductSearch } from "./hooks/queries/products.queries";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

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

  const isFilterActive = Object.keys(filters).length > 0 || debouncedSearch;

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
        />

        {isFilterActive ? (
          filteredProducts.length > 0 ? (
            <View className="mt-6">
              <FilteredProductsCarousel
                items={filteredProducts}
                onAddToWishlist={handleWishlistToggle}
                isInWishlist={isInWishlist}
              />
            </View>
          ) : (
            <CsText className="mt-6" style={typography.Poppins_s_medium}>
              No products found
            </CsText>
          )
        ) : (
          <View className="mt-6">
            <AllProductsCarousel
              items={allProducts}
              wishlistItems={wishlist}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
            />
          </View>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

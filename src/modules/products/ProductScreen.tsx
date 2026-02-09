import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useSaveWishlist } from "@/src/hooks/useWishList";
import { ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

import AllProductsCarousel from "./components/AllProductsCarousel";
import FilterBottomSheet from "./components/FilterBottomSheet";
import FilteredProductsCarousel from "./components/FilteredProductsCarousel";
import ProductSearchBar from "./components/ProductSearchBar";

import { useProductsData } from "./hooks/data/useProductsData";
import { useProductSearch } from "./hooks/queries/useProductsQuery";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

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

  const { mutate } = useSaveWishlist();
  const handleAddToWishlist = (productId: string | number) => {
    mutate({ productId, quantity: 1 });
  };

  const isFilterActive = Object.keys(filters).length > 0 || debouncedSearch;

  return (
    <ScreenLayout>
      <ScreenContent>
        <ProductSearchBar
          search={search}
          setSearch={setSearch}
          onFilterPress={() => setFilterOpen(true)}
        />

        {/* Filter Bottom Sheet */}
        <FilterBottomSheet
          visible={filterOpen}
          onClose={() => setFilterOpen(false)}
          onApplyFilters={(f) => {
            setFilters(f);
            setSearch(f.query || "");
          }}
        />

        {isFilterActive ? (
          filteredProducts.length > 0 ? (
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <CsText style={typography.Poppins_m_semibold}>
                  Filtered Products
                </CsText>
                <ChevronRight size={20} />
              </View>
              <FilteredProductsCarousel
                items={filteredProducts}
                onAddToWishlist={handleAddToWishlist}
              />
            </View>
          ) : (
            <CsText className="mt-6" style={typography.Poppins_s_medium}>
              No products found
            </CsText>
          )
        ) : (
          <>
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <CsText style={typography.Poppins_m_semibold}>
                  All Products
                </CsText>
                <ChevronRight size={20} />
              </View>
              <AllProductsCarousel
                items={allProducts}
                onAddToWishlist={handleAddToWishlist}
              />
            </View>{" "}
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <CsText style={typography.Poppins_m_semibold}>
                  All Products
                </CsText>
                <ChevronRight size={20} />
              </View>
              <AllProductsCarousel
                items={allProducts}
                onAddToWishlist={handleAddToWishlist}
              />
            </View>{" "}
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <CsText style={typography.Poppins_m_semibold}>
                  All Products
                </CsText>
                <ChevronRight size={20} />
              </View>
              <AllProductsCarousel
                items={allProducts}
                onAddToWishlist={handleAddToWishlist}
              />
            </View>{" "}
            <View className="mt-6">
              <View className="flex-row items-center mb-4">
                <CsText style={typography.Poppins_m_semibold}>
                  All Products
                </CsText>
                <ChevronRight size={20} />
              </View>
              <AllProductsCarousel
                items={allProducts}
                onAddToWishlist={handleAddToWishlist}
              />
            </View>
          </>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

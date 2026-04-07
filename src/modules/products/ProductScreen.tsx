import { toast } from "@backpackapp-io/react-native-toast";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useDebounce } from "@/src/hooks/useDebounce";
import FilterBottomSheet from "./components/FilterBottomSheet";
import ProductSearchBar from "./components/ProductSearchBar";

import { useWishlist } from "../wishlist/hooks/useWishlist";

import { ScrollView } from "react-native-gesture-handler";
import ProductsList from "./components/AllProductsCarousel";
import { useProductsData } from "./hooks/data/useProductsData";
import { useProductSearch } from "./hooks/queries/products.queries";

import {
  ArrowUp,
  ChevronRight,
  CookingPotIcon,
  Layers2,
  LayoutGrid,
  Sofa,
} from "lucide-react-native";

import SectionTitle from "../home/components/SectionTitle";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");

  const pageSize = 6;
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const [showTopBtn, setShowTopBtn] = useState(false);
  const scrollRef = useRef<any>(null);

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

  let filteredProducts = Array.isArray(filteredProductsData?.products)
    ? filteredProductsData.products
    : [];

  if (filters?.minRating !== undefined && filters?.minRating !== null) {
    filteredProducts = filteredProducts.filter(
      (p: any) => Number(p.ratingAverage || 0) >= Number(filters.minRating),
    );
  }

  const isFiltering = Object.keys(filters).length > 0 || debouncedSearch;
  const displayedProducts = isFiltering ? filteredProducts : allProducts;

  const visibleProducts = displayedProducts.slice(0, visibleCount);
  const isMoreLoading = visibleCount < displayedProducts.length;

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [debouncedSearch, filters]);

  const handleToggleWishlist = async (productId: string | number) => {
    const id = getWishlistItemId(productId);

    try {
      if (id) {
        await removeFromWishlist({ id });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ productId, quantity: 1 });
        toast.success("Added to wishlist");
      }
    } catch (error) {}
  };

  //  UPDATED CATEGORY ICON STRUCTURE
  const categories = [
    { label: "All", icon: LayoutGrid },
    { label: "Furniture", icon: Sofa },
    { label: "Carpets", icon: Layers2 },
    { label: "Utensils", icon: CookingPotIcon },
  ];

  return (
    <ScreenLayout scrollable={false}>
      <ScreenContent>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={300}
          onScroll={(e) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              e.nativeEvent;

            const isCloseToBottom =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 80;

            if (isCloseToBottom && isMoreLoading) {
              setVisibleCount((prev) => prev + pageSize);
            }

            setShowTopBtn(contentOffset.y > 300);
          }}
        >
          {/* SEARCH */}
          <ProductSearchBar
            search={search}
            setSearch={setSearch}
            onFilterPress={() => setFilterOpen(true)}
          />

          {/* FILTER */}
          <FilterBottomSheet
            visible={filterOpen}
            onClose={() => setFilterOpen(false)}
            onApplyFilters={setFilters}
            filterOptions={filterOptions}
          />

          {/* CATEGORY CHIPS */}
          {!isFiltering && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 18 }}
              contentContainerStyle={{ paddingRight: 10 }}
            >
              {categories.map((item, i) => {
                const isActive = activeCategory === item.label;

                return (
                  <Pressable
                    key={i}
                    onPress={() => setActiveCategory(item.label)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 24,
                      marginRight: 10,
                      backgroundColor: isActive ? colors.primary : colors.light,
                      borderWidth: 1,
                      borderColor: isActive ? colors.primary : colors.secondary,
                      elevation: isActive ? 4 : 2,
                    }}
                  >
                    {/* ICON */}
                    <View style={{ marginRight: 6 }}>
                      <item.icon
                        size={14}
                        color={isActive ? colors.light : colors.secondary}
                      />
                    </View>

                    {/* TEXT */}
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 13,
                        color: isActive ? colors.light : colors.secondary,
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}

          <View style={{ marginTop: 24 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <SectionTitle title="Popular Picks" icon="flame-outline" />

              {/* RIGHT ARROW */}
              <View
                style={{
                  backgroundColor: colors.light,
                  padding: 6,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <ChevronRight size={16} color={colors.dark} />
              </View>
            </View>

            <ProductsList
              items={allProducts.slice(3, 8)}
              wishlistItems={wishlist}
              onToggleWishlist={handleToggleWishlist}
              isWishlistBusy={isBusy}
              variant="carousel"
            />
          </View>

          {/* ALL PRODUCTS */}
          <View style={{ marginTop: 24 }}>
            <SectionTitle title="All Products" icon="grid-outline" />

            <ProductsList
              items={visibleProducts}
              wishlistItems={wishlist}
              onToggleWishlist={handleToggleWishlist}
              isWishlistBusy={isBusy}
              variant="grid"
            />
          </View>

          {/* LOADER */}
          {isMoreLoading && (
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </ScrollView>

        {/* SCROLL TO TOP */}
        {showTopBtn && (
          <View style={{ position: "absolute", bottom: 30, right: 20 }}>
            <Pressable
              onPress={() =>
                scrollRef.current?.scrollTo({ y: 0, animated: true })
              }
              style={{
                backgroundColor: colors.primary,
                padding: 16,
                borderRadius: 100,
                elevation: 10,
              }}
            >
              <ArrowUp size={18} color={colors.light} />
            </Pressable>
          </View>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

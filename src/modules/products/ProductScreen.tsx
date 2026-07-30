import DisclaimerNote from "@/src/components/shared/DisclaimerNote";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import ProductCard from "./components/ProductCard";

import Loader from "@/src/components/shared/Loader";
import NoProductsFound from "./components/NoProductsFound";
import ProductListHeader from "./components/ProductListHeader";
import { ProductListFooter } from "./components/ProductListStates";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useProductsData } from "./hooks/data/useProductsData";
import { usePaginatedProducts } from "./hooks/usePaginatedProducts";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useWishlistToggle } from "./hooks/useWishlistToggle";
import {
  NormalizedProduct,
  ProductFilters,
  WishlistItem,
} from "./types/productlist.types";

const CARD_WIDTH = Dimensions.get("window").width * 0.42;

export default function ProductScreen() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<ProductFilters>({});

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const isFiltering = Boolean(
    filters?.brand ||
    filters?.category ||
    filters?.minPrice ||
    filters?.maxPrice ||
    filters?.sort ||
    filters?.minRating ||
    search,
  );

  // ← matches initial cache key

  const { wishlist, isBusy, handleToggleWishlist } = useWishlistToggle();
  const { showTopBtn, handleScroll } = useScrollToTop();
  const [refreshing, setRefreshing] = useState(false);

  const {
    scrollRef,
    displayedProducts,
    isLoading,
    isFetchingMore,
    hasMore,
    handleEndReached,
    refresh,
    productSearchRefetch,
  } = usePaginatedProducts({ search, filters, activeCategory });

  const {
    filterOptions = { brands: [], categories: [] },
    categories = [],
    isReady: filtersReady,
  } = useProductsData();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  };
  console.log(displayedProducts.length, "displayed products...");

  return (
    // The FlatList does its own scrolling. Leaving ScreenLayout scrollable
    // nests it inside a ScrollView — that is the "VirtualizedLists should never
    // be nested" warning, and it also defeats virtualisation. Both this View
    // and ScreenContent need flex:1 so the list gets a bounded height; without
    // that it grows to fit every row and nothing scrolls at all.
    <ScreenLayout scrollable={false}>
      <ScreenContent className="flex-1">
        <FlatList<NormalizedProduct>
          ref={scrollRef}
          style={{ flex: 1 }}
          data={displayedProducts}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyboardShouldPersistTaps="handled"
          numColumns={2}
          keyExtractor={(item, index) =>
            item?.id ? String(item.id) : `fallback-${index}`
          }
          ListHeaderComponent={
            <ProductListHeader
              search={search}
              setSearch={setSearch}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
              categories={categories}
              isFiltering={isFiltering}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              filtersReady={filtersReady}
            />
          }
          ListFooterComponent={
            <>
              <ProductListFooter
                isFetchingMore={isFetchingMore}
                hasMore={hasMore}
                productCount={displayedProducts.length}
              />

              <View style={{ marginTop: 24 }}>
                <DisclaimerNote collapsible={false} />
              </View>
            </>
          }
          ListEmptyComponent={isLoading ? <Loader /> : <NoProductsFound />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              cardWidth={CARD_WIDTH}
              isCarousel={false}
              wishlistItems={wishlist as WishlistItem[]}
              isWishlistBusy={isBusy}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        />

        {showTopBtn && (
          <ScrollToTopButton
            onPress={() =>
              scrollRef.current?.scrollToOffset({ offset: 0, animated: true })
            }
          />
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

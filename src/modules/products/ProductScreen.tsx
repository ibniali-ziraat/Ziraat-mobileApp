import { toast } from "@backpackapp-io/react-native-toast";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useDebounce } from "@/src/hooks/useDebounce";

import FilterBottomSheet from "./components/FilterBottomSheet";
import ProductSearchBar from "./components/ProductSearchBar";

import { useWishlist } from "../wishlist/hooks/useWishlist";

import ProductsList from "./components/AllProductsCarousel";
import { useProductsData } from "./hooks/data/useProductsData";
import { useProductSearch } from "./hooks/queries/products.queries";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 15;

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
      (p: any) =>
        Number(p.ratingAverage || 0) >= Number(filters.minRating)
    );

  }

  const isFiltering = Object.keys(filters).length > 0 || debouncedSearch;
  const displayedProducts = isFiltering ? filteredProducts : allProducts;

  const totalPages = Math.ceil(displayedProducts.length / pageSize);

  const paginatedProducts = displayedProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

 
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

  const handleToggleWishlist = async (productId: string | number) => {
    const id = getWishlistItemId(productId);
    console.log(id, "wishlistid.....");

    try {
      if (id) {
        await removeFromWishlist({ id });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ productId, quantity: 1 });
        toast.success("Added to wishlist");
      }
    } catch (error) {
   
    }
  };

  return (
    <ScreenLayout scrollable={false}>
      <ScreenContent>
        {/* SEARCH */}
        <ProductSearchBar
          search={search}
          setSearch={setSearch}
          onFilterPress={() => setFilterOpen(true)}
        />

        {/*  FILTER */}
        <FilterBottomSheet
          visible={filterOpen}
          onClose={() => setFilterOpen(false)}
          onApplyFilters={setFilters}
          filterOptions={filterOptions}
        />

        {/*  PRODUCTS */}
        <View className="mt-6">
          <ProductsList
            items={paginatedProducts}
            wishlistItems={wishlist}
            onToggleWishlist={handleToggleWishlist}
            isWishlistBusy={isBusy}
            variant="grid"
          />
        </View>

        {/*  PAGINATION UI */}
        {totalPages > 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              marginVertical: 16,
            }}
          >
            {/* PREV */}
            <Pressable
              disabled={page === 1}
              onPress={() => setPage((p) => p - 1)}
            >
              <CsText style={{ opacity: page === 1 ? 0.3 : 1 }}>Prev</CsText>
            </Pressable>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === page;

              return (
                <Pressable key={i} onPress={() => setPage(pageNumber)}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 6,
                      backgroundColor: isActive ? colors.primary : "#E5E7EB",
                    }}
                  >
                    <CsText
                      style={{
                        color: isActive ? "#fff" : "#000",
                        fontWeight: "600",
                      }}
                    >
                      {pageNumber}
                    </CsText>
                  </View>
                </Pressable>
              );
            })}

            {/* NEXT */}
            <Pressable
              disabled={page === totalPages}
              onPress={() => setPage((p) => p + 1)}
            >
              <CsText style={{ opacity: page === totalPages ? 0.3 : 1 }}>
                Next
              </CsText>
            </Pressable>
          </View>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

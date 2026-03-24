import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import { ROUTES } from "@/src/constants/routes";
import { useCart } from "../products/hooks/data/useCart";
import WishlistItem from "./components/WishListItem";
import WishlistEmpty from "./components/WishlistEmpty";
import { useWishlist } from "./hooks/useWishlist";

const Wishlist = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const {
    wishlist,
    isLoading,
    isFetchingWishlist,
    removeFromWishlist,
    refetch,
  } = useWishlist();

  const handleRemoveFromWishlist = async (id: number) => {
    try {
      await removeFromWishlist({ id });
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (product: any) => {
    if (!product) return;

    try {
      await addToCart({
        productId: product.productId,
        variationName: "",
        quantity: 1,
      });

      // await handleRemoveFromWishlist(product.id);

      toast.success("Item moved to cart");
    } catch (error) {
      // If it added but errored, check if the error is actually coming from the REMOVE part
      console.error("Error in Move-to-Cart sequence:", error);
    }
  };

  if (isLoading && wishlist.length === 0) {
    return <Loader />;
  }

  if (!isLoading && wishlist.length === 0) {
    return (
      <WishlistEmpty
        onStartShopping={() => router.push(ROUTES.TABS.PRODUCTS)}
      />
    );
  }

  return (
    <View style={{ backgroundColor: colors.light }} className="flex-1">
      <BackHeader
        title="My Wishlist"
        desc={`${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} saved`}
      />

      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingWishlist}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        columnWrapperStyle={{
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 80,
        }}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            onRemove={() => handleRemoveFromWishlist(item.id)}
            onAddToCart={handleAddToCart}
          />
        )}
        ListFooterComponent={
          <View className="py-12 w-full">
            <CsText
              className="text-center opacity-40"
              style={typography.Poppins_s_regular}
            >
              You’ve reached the end
            </CsText>
          </View>
        }
      />
    </View>
  );
};

export default Wishlist;

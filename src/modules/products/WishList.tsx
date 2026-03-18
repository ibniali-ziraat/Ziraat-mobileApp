import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  View,
} from "react-native";
import WishlistItem from "./components/WishListItem";
import { useCart } from "./hooks/data/useCart";
import { useWishlist } from "./hooks/data/useWishlist";

const Wishlist = () => {
  const router = useRouter();

  const {
    wishlist = [],
    isLoading,
    removeFromWishlist,
    refetch,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleStartShopping = () => router.push("/Product");

  const handleRemoveFromWishlist = async (id: string) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = async (product) => {
    console.log(product, "product in wishlist");

    if (!product) return;

    try {
      await addToCart({
        productId: product.productId,
        variationName: "",
        quantity: product.quantity,
      });

      toast.success("Item added to cart");
    } catch (error) {
      // console.error("Error adding to cart:", error);
      // toast.error("Failed to add item to cart");
    }
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  /* ================= EMPTY ================= */
  if (!wishlist || wishlist.length === 0) {
    return (
      <View style={{ backgroundColor: colors.light }} className="flex-1">
        <BackHeader title="My Wishlist" desc="Your saved items" />

        <View className="flex-1 justify-center items-center px-12">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />

          <CsText style={typography.Poppins_l_semibold} className="mt-5">
            Your wishlist is empty
          </CsText>

          <CsText
            className="text-center mt-2 mb-8 opacity-60"
            style={typography.Poppins_m_regular}
          >
            Save products you love and find them easily here.
          </CsText>

          <Pressable
            style={{ backgroundColor: colors.primary }}
            onPress={handleStartShopping}
            className="px-12 py-3 rounded-full active:scale-95"
          >
            <CsText
              style={[typography.Poppins_m_semibold, { color: colors.light }]}
            >
              Browse Products
            </CsText>
          </Pressable>
        </View>
      </View>
    );
  }

  /* ================= LIST ================= */
  return (
    <View style={{ backgroundColor: colors.light }} className="flex-1">
      <BackHeader
        title="My Wishlist"
        desc={`${wishlist.length} ${
          wishlist.length === 1 ? "item" : "items"
        } saved`}
      />

      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={(item: any, index) =>
          item.productId?.toString() ?? index.toString()
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
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

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
  } = useWishlist();

  const { addToCart } = useCart();

  const handleStartShopping = () => router.push("/Product");

  const handleRemoveFromWishlist = async (id: string) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = async (product) => {
    if (!product) return;

    await addToCart({
      productId: product.productId,
      variationName: "",
      quantity: product.quantity,
    });

    toast.success("Item added to cart");
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
      <View style={{ backgroundColor: colors.lightHover }} className="flex-1">
        <BackHeader title="My Wishlist" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-8">

          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-32 h-32 mb-6"
            resizeMode="contain"
          />

          <CsText style={typography.Poppins_l_semibold} className="mb-2">
            Empty Wishlist
          </CsText>

          <CsText
            className="text-center mb-6 opacity-60"
            style={typography.Poppins_m_regular}
          >
            Save items you love and view them all in one place.
          </CsText>

          <Pressable
            style={{ backgroundColor: colors.primary }}
            onPress={handleStartShopping}
            className="px-10 py-3 rounded-full"
          >
           <CsText
  style={[
    typography.Poppins_m_semibold,
    { color: colors.light },
  ]}
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
          keyExtractor={(item: any) =>
            item.productId?.toString() ?? item.id?.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
        
            paddingTop: 8,
            paddingBottom: 50,
          }}
          renderItem={({ item }) => (
            <WishlistItem
              item={item}
              onRemove={() => handleRemoveFromWishlist(item.id)}
              onAddToCart={handleAddToCart}
            />
          )}
          ListFooterComponent={
            <View className="py-8 w-full">
              <CsText
                className="text-center opacity-50"
                style={typography.Poppins_s_regular}
              >
                You’ve reached the end of your wishlist
              </CsText>
            </View>
          }
        />

      </View>
  
  );
};

export default Wishlist;

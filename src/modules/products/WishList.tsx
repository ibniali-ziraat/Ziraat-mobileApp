import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import WishlistItem from "./components/WishListItem";
import { useCart } from "./hooks/data/useCart";
import { useWishlist } from "./hooks/data/useWishlist";

const Wishlist = () => {
  const router = useRouter();

  const { wishlist, isLoading, removeFromWishlist, addToWishlist } =
    useWishlist();
  const { cart, addToCart, removeFromCart } = useCart();

  console.log(wishlist, "wishlist data....");

  const handleStartShopping = () => router.push("/Product");

  const handleRemoveFromWishlist = async (id: string) => {
    await removeFromWishlist({ id });
  };

  const handleAddToCart = async (product) => {
    if (!product) return;

    await addToCart({
      productId: product.id,
      variationName: "",
      quantity: product.quantity,
    });
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </ScreenLayout>
    );
  }

  /* ================= EMPTY ================= */
  if (!wishlist || wishlist?.length === 0) {
    return (
      <View className="flex-1 bg-white">
        <BackHeader title="My Wishlist" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-56 h-56 mb-6"
            resizeMode="contain"
          />

          <CsText style={typography.Poppins_l_semibold} className="mb-2">
            Empty Wishlist
          </CsText>

          <CsText
            className="text-center mb-6"
            style={typography.Poppins_m_regular}
          >
            Save items you love and view them all in one place.
          </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary px-8 py-3 rounded-full"
          >
            <CsText
              className="text-light"
              style={typography.Poppins_m_semibold}
            >
              Browse Products
            </CsText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* ================= LIST ================= */
  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Wishlist"
        desc={`${wishlist.length} ${
          wishlist.length === 1 ? "item" : "items"
        } saved`}
      />

      <FlatList
        data={wishlist}
        keyExtractor={(item: any) =>
          item.productId?.toString() ?? item.id?.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            onRemove={() => handleRemoveFromWishlist(item.id)}
            onAddToCart={handleAddToCart}
          />
        )}
        ListFooterComponent={
          <View className="py-6">
            <CsText
              className="text-center text-dark"
              style={typography.Poppins_s_regular}
            >
              You have reached the end of your wishlist.
            </CsText>
          </View>
        }
      />
    </ScreenLayout>
  );
};

export default Wishlist;

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import WishlistItem from "@/src/modules/products/components/WishListItem";
import { getWishlist, removeFromWishlist } from "@/src/utils/wishlistStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";

const Wishlist = () => {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  const fetchWishlist = async () => {
    try {
      const items = await getWishlist();
      setWishlistItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (itemId: string) => {
    try {
      await removeFromWishlist(itemId);
      ToastAndroid.show("Removed from Wishlist", ToastAndroid.SHORT);
      fetchWishlist();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  const handleStartShopping = () => router.push("/Product");

  if (wishlistItems.length === 0) {

    return (
      <View className="flex-1 bg-white"> 
        <BackHeader title="My Wishlist" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-56 h-56 mb-6"
            resizeMode="contain"
          />
          <CsText className="text-2xl font-semibold text-dark mb-2">
            Empty Wishlist
         </CsText>

          <CsText className="text-center text-dark/70 mb-6 text-sm">
            Save items you love and view them all in one place.
         </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary px-8 py-3 rounded-full shadow-md active:opacity-80"
          >
            <CsText className="text-white font-semibold text-base">
              Browse Products
           </CsText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (

    <View className="flex-1 bg-white"> 
      <BackHeader
        title="My Wishlist"
        desc={`${wishlistItems.length} ${
          wishlistItems.length === 1 ? "item" : "items"
        } saved`}
      />

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View/>}
        renderItem={({ item }) => (
         
          <View className="bg-light px-4 "> 
            <WishlistItem item={item} onRemove={handleRemove} />
          </View>
        )}
        ListFooterComponent={
          <View className="mt-6 mb-4 px-4">
            <CsText className="text-center text-dark text-sm">
              You have reached the end of your wishlist.
           </CsText>
          </View>
        }
      />
    </View>
  );
}

export default Wishlist;
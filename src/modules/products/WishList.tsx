import WishlistItem from "@/src/modules/products/components/WishListItem";
import { getWishlist, removeFromWishlist } from "@/src/utils/wishlistStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Wishlist = () => {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);


  const fetchWishlist = async () => {
    try {
      const items = await getWishlist();

      if (Array.isArray(items)) {
        setWishlistItems(items);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  /** ✅ REMOVE ITEM */
  const handleRemove = async (itemId: string) => {
    try {
      await removeFromWishlist(itemId);
      ToastAndroid.show("Removed from Wishlist", ToastAndroid.SHORT);
      fetchWishlist(); 
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  const handleStartShopping = () => {
    router.push("/Product");
  };


  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-5">
        <Image
          source={require("@/assets/images/empty-wishlist.png")}
          className="w-60 h-60 mb-6"
          resizeMode="contain"
        />

        <Text className="text-2xl font-bold text-dark mb-2">
          Empty Wishlist
        </Text>

        <Text className="text-center text-dark mb-6 px-8">
          Add your favorite products to view them here.
        </Text>

        <TouchableOpacity
          onPress={handleStartShopping}
          className="bg-primary px-8 py-3 rounded-full shadow-sm"
        >
          <Text className="text-white font-semibold text-lg">
            Browse Products
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-white px-4">
     
      <View className="mb-4">
        <Text className="text-3xl font-bold text-dark">My Wishlist</Text>
        <Text className="text-dark text-lg mt-1">
          {wishlistItems.length}{" "}
          {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
        </Text>
      </View>


      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1, 
        }}
        renderItem={({ item }) => (
          <WishlistItem item={item} onRemove={handleRemove} />
        )}
        ListFooterComponent={
          <View className="mt-6 mb-8">
            <Text className="text-center text-dark">
              You’ve reached the end of your wishlist! Happy shopping!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Wishlist;

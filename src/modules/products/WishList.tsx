import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import products from "@/src/data/products.json";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import WishlistItem from "./components/WishListItem";



const Wishlist = () => {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(products); 
  }, []);


  const handleRemove = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
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

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Wishlist"
        desc={`${wishlistItems.length} ${
          wishlistItems.length === 1 ? "item" : "items"
        } saved`}
      />

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
       
        renderItem={({ item }) => (
          <WishlistItem item={item} onRemove={handleRemove} />
        )}
        ListFooterComponent={
          <View>
            <CsText
              className="text-center text-dark"
              style={typography.Poppins_xs_regular}
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

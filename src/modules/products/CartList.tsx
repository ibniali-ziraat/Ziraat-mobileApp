import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import {
  clearCartList,
  getCartList,
  removeFromCartList,
} from "@/src/utils/cartlistStore";

import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import CartListItem from "./components/CartListItem";

const CartList = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const fetchCart = async () => {
    try {
      const list = await getCartList();
      const data = Array.isArray(list) ? list : [];

      const qtyObj: Record<string, number> = {};
      data.forEach((item) => {
        qtyObj[item.id] = quantities[item.id] || 1;
      });

      setQuantities(qtyObj);
      setCartItems(data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleRemove = async (id: string) => {
    await removeFromCartList(id);
    ToastAndroid.show("Removed from cart", ToastAndroid.SHORT);
    fetchCart();
  };

  const handleClearCart = async () => {
    await clearCartList();
    setCartItems([]);
    setQuantities({});
    ToastAndroid.show("Cart cleared", ToastAndroid.SHORT);
  };

  const handleStartShopping = () => {
    router.push("/Product");
  };

  const handleBuyNow = () => {
    router.push("/products/address");
  };
  if (cartItems.length === 0) {
    return (
      <ScreenLayout >
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-48 h-48 mb-6"
            resizeMode="contain"
          />

          <CsText className="text-xl font-semibold text-dark mb-2">
            Your cart is empty
          </CsText>

          <CsText className="text-center text-dark text-sm mb-6">
            Looks like you haven’t added anything yet.
          </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary  px-8 py-3 rounded-full shadow-md active:opacity-80"
          >
            <CsText className="text-light">Browse Products</CsText>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout scrollable={false} className="bg-light p-0">
      <BackHeader
        title="My Cart"
        desc={`${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`}
      />

      {/* 🔹 SCROLLING AREA */}
      <View className="flex-1 ">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 115,
          }}
          renderItem={({ item }) => (
            <ZiraatCard
              width="100%"
              paddingRight={0.6}
              marginBottom={1.2}>
              <CartListItem
                item={item}
                quantity={quantities[item.id]}
                onQtyChange={(qty) => updateQuantity(item.id, qty)}
                onRemove={() => handleRemove(item.id)}
              />
            </ZiraatCard>
          )}
        />
      </View>

      {/* 🔒 TRUE STICKY FOOTER */}
      <View
        className="absolute left-0 right-0 bottom-0 bg-light border-t border-gray-200"
        style={{
          height: 95,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <BuyNowButton title="Place Order" onPress={handleBuyNow} />

        <TouchableOpacity
          onPress={handleClearCart}
          className="mt-2"
          activeOpacity={0.7}
        >
          <CsText className="text-center text-dark text-sm">
            Remove all items
          </CsText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );

};

export default CartList;

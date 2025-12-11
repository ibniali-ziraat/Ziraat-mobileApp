import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import PaymentSelector from "@/src/components/shared/PaymentSelector";
// Removed ScreenLayout import or treat it as a non-scrolling View
import SummaryCard from "@/src/components/shared/SummaryCard";
// FIX: Changed relative path to absolute path for consistency and to prevent runtime import error
import ShippingOptionList from "@/src/modules/products/components/ShippingOptionList";

import CartListItem from "./components/CartListItem";

import {
  clearCartList,
  getCartList,
  removeFromCartList,
} from "@/src/utils/cartlistStore";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View, // <-- Using View now for the outer container when FlatList is present
} from "react-native";

const CartList = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);


  const fetchCart = async () => {
    try {
      const list = await getCartList();
      const data = Array.isArray(list) ? list : [];

      
      const qtyObj = {};
      data.forEach((i) => {
        qtyObj[i.id] = quantities[i.id] || 1;
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

  const updateQuantity = (id, qty) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleRemove = async (id) => {
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

  const handleStartShopping = () => router.push("/Product");

  
  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.discountPrice ?? item.price) || 0;
      const qty = Number(quantities[item.id] || 1);
      return sum + price * qty;
    }, 0);
  };

  
  const getFinalTotal = () => {
    const cartTotal = getCartTotal();
    const shippingPrice = Number(selectedShipping?.price) || 0;
    return cartTotal + shippingPrice;
  };

  const handleBuyNow = () => {
    if (!paymentMethod)
      return ToastAndroid.show("Select payment method", ToastAndroid.SHORT);

    if (!selectedShipping)
      return ToastAndroid.show("Select shipping option", ToastAndroid.SHORT);

    ToastAndroid.show("Order placed successfully!", ToastAndroid.SHORT);
    handleClearCart();
  };

  
  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-white"> 
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6 ">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-56 h-56 mb-6"
            resizeMode="contain"
          />
          <Text className="text-2xl font-semibold text-dark mb-2">
            Empty Cart
          </Text>

          <Text className="text-center text-dark/70 mb-6 text-sm">
            Add items you love and view them all in one place.
          </Text>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary px-8 py-3 rounded-full shadow-md active:opacity-80"
          >
            <Text className="text-light font-semibold text-base">
              Browse Products
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (quantities[item.id] || 1),
    0
  );

  const isButtonEnabled = !!selectedShipping && !!paymentMethod;
  return (
    <View className="flex-1 bg-light"> 
      <BackHeader
        title="My Cart"
        desc={`${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your cart`}
      />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }} 
         ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <CartListItem
            item={item}
            quantity={quantities[item.id]}
            onQtyChange={(qty) => updateQuantity(item.id, qty)}
            onRemove={() => handleRemove(item.id)}
          />
        )}
        ListFooterComponent={
          <View className="mt-6 mb-12">
            {/* Shipping */}
            <ShippingOptionList
              selectedOption={selectedShipping}
              setSelectedOption={setSelectedShipping}
            />

            {/* Summary */}
            <SummaryCard
              quantity={totalQuantity}
              total={getCartTotal()}    
              selectedShipping={selectedShipping}
              hideQuantitySelector={true}
            />

            {/* Payment */}
            <PaymentSelector
              selectedOption={selectedShipping}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            {/* Buttons */}
            <View className="mt-4">
              <BuyNowButton
                title="Buy Now"
                onPress={handleBuyNow}
                disabled={!isButtonEnabled}
              />

              <TouchableOpacity
                onPress={handleClearCart}
                className="bg-secondary py-3 rounded-lg mt-4"
              >
                <Text className="text-light text-center text-lg font-bold">
                  Clear Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default CartList;
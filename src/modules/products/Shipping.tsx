import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BackHeader from "@/src/components/shared/BackHeader"; // ✅ ADD THIS
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import PaymentSelector from "@/src/components/shared/PaymentSelector";
import ProductCard from "@/src/modules/products/components/ProductCard";
import ShippingOptionList from "@/src/modules/products/components/ShippingOptionList";
import SummaryCard from "@/src/modules/products/components/SummaryCard";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import products from "../../Data/products.json";

export default function Shipping() {
  const { productId } = useLocalSearchParams();
  const product = products.find((p) => p._id === productId);

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  const getFinalPrice = () => {
    const unitPrice = product?.discountPrice
      ? Number(product.discountPrice)
      : Number(product?.price);

    return unitPrice * quantity;
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.title} to cart`);
    Alert.alert("Success", `${product?.title} added to cart`);
  };

  const handleBuyNow = () => {
    if (!paymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }
    if (!selectedOption) {
      Alert.alert("Error", "Please select a shipping option");
      return;
    }

    console.log("Buy Now clicked:", {
      productId,
      selectedOption,
      quantity,
      total: getFinalPrice() + (selectedOption?.price || 0),
      paymentMethod,
    });

    Alert.alert("Order Placed", "Your order has been successfully placed!");
  };

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-light">
        <Text className="text-lg text-dark">Product not found</Text>
      </View>
    );
  }

  const isButtonEnabled = !!selectedOption && !!paymentMethod;

  return (
    <View className="flex-1 bg-light">

      {/* 🔥 BACK HEADER ADDED HERE */}
      <BackHeader 
        // title="Shipping"
        // desc={product.title}
      />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Product Card */}
        <ProductCard product={product} />

        {/* Shipping Options */}
        <ShippingOptionList
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Summary Card */}
        <SummaryCard
          quantity={quantity}
          setQuantity={setQuantity}
          total={getFinalPrice()}
          selectedShipping={selectedOption}
        />

        {/* Payment Section */}
        <PaymentSelector
          selectedOption={selectedOption}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {/* Buttons */}
        <View className="mt-4 mb-12">
          <AddToCartButton title="Add to Cart" onPress={handleAddToCart} />

          <View className="h-3" />

          <BuyNowButton
            title="Buy Now"
            onPress={handleBuyNow}
            disabled={!isButtonEnabled}
          />
        </View>
      </ScrollView>
    </View>
  );
}

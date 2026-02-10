import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import CsText from "@/src/components/shared/CsText";
import PaymentSelector from "@/src/components/shared/PaymentSelector";
import SummaryCard from "@/src/components/shared/SummaryCard";
import { usePayment } from "@/src/hooks/usePayment";
import ProductCard from "@/src/modules/products/components/ProductCard";
import ShippingOptionList from "@/src/modules/products/components/ShippingOptionList";
import { useBuyProductMutation } from "@/src/modules/products/hooks/queries/products.queries";
import { addToCartList } from "@/src/utils/cartlistStore";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, ToastAndroid, View } from "react-native";
import products from "../../data/products.json";
const renderShippingHeader = (
  product,
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
) => (
  <>
    <ProductCard product={product} />
    <ShippingOptionList
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  </>
);

const renderShippingFooter = (
  quantity,
  setQuantity,
  getFinalPrice,
  selectedOption,
  paymentMethod,
  setPaymentMethod,
  handleAddToCart,
  handleBuyNow,
) => {
  const isButtonEnabled = !!selectedOption && !!paymentMethod;
  const finalPrice = getFinalPrice();

  return (
    <View>
      {/* Summary Card */}
      <SummaryCard
        quantity={quantity}
        setQuantity={setQuantity}
        total={finalPrice}
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
        {/* FIX: Removed redundant title prop for consistency */}
        <AddToCartButton onPress={handleAddToCart} />

        <View className="h-3" />

        <BuyNowButton
          title="Buy Now"
          onPress={handleBuyNow}
          disabled={!isButtonEnabled}
        />
      </View>
    </View>
  );
};

export default function Shipping() {
  const { productId } = useLocalSearchParams();
  const product = products.find((p) => String(p._id) === String(productId));
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const { mutateAsync: buyProductMutation, isLoading } =
    useBuyProductMutation();
  const { pay } = usePayment();

  const getFinalPrice = () => {
    const unitPrice = product?.discountPrice
      ? Number(product.discountPrice)
      : Number(product?.price);

    return unitPrice * quantity;
  };

  const handleAddToCart = async () => {
    try {
      await addToCartList({
        id: product._id.toString(),
        title: product.title,
        category: product.category,
        price: product.price,
        discountPrice: product.discountPrice || null,
        photos: product.photos || [],
      });
      ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Add to cart failed:", error);
      ToastAndroid.show("Failed to add to cart", ToastAndroid.SHORT);
    }
  };

  const handleBuyNow = async () => {
    const paymentResult = await pay({
      amount: getFinalPrice(),
      description: product.title,
      image: product.photos?.[0],
      user: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
    });

    if (!paymentResult.success) {
      Alert.alert("Payment Failed", paymentResult.error.description);
      return;
    }

    await buyProductMutation({
      productId: product._id,
      quantity,
      paymentMethod,
      razorpay: paymentResult.data,
    });

    Alert.alert("Order Placed", "Your order has been placed successfully");
  };

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-light">
        <CsText className="text-lg text-dark">Product not found</CsText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light">
      <BackHeader title="Shipping & Payment" />

      <FlatList
        data={[{ key: "shipping-content" }]} // Dummy data
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={() => null} // Render nothing for the dummy item
        contentContainerStyle={{ paddingHorizontal: 16 }} // Added padding for aesthetics
        ListHeaderComponent={renderShippingHeader(
          product,
          quantity,
          setQuantity,
          selectedOption,
          setSelectedOption,
        )}
        ListFooterComponent={renderShippingFooter(
          quantity,
          setQuantity,
          getFinalPrice,
          selectedOption,
          paymentMethod,
          setPaymentMethod,
          handleAddToCart,
          handleBuyNow,
        )}
      />
    </View>
  );
}

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import ProductDescription from "./components/ProductDescription";
import ProductHeader from "./components/ProductHeader";
import ProductMeta from "./components/ProductMeta";
import ProductPriceCard from "./components/ProductPriceCard";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import ProductSpecifications from "./components/ProductSpecifications";
import ProductStickyBar from "./components/ProductStickyBar";

import ProductFaq from "@/src/components/shared/ProductFaq";
import Review from "@/src/components/shared/Review";
import faqData from "../../data/Faq.json";

import { useCart } from "./hooks/data/useCart";
import { useProductByIdQuery } from "./hooks/queries/products.queries";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useProductByIdQuery(productId);

  const { cart, addToCart, removeFromCart } = useCart();

  /* ================= DERIVED ================= */
  const cartItem = cart.find((item) => item.productId === product?.id);

  const isInCart = Boolean(cartItem);

  /* ================= HANDLERS ================= */
  const handleAddToCart = async () => {
    if (!product) return;

    await addToCart({
      productId: product.id,
      variationName: "",
      quantity,
    });
  };

  const handleRemoveFromCart = async () => {
    if (!cartItem) return;
    await removeFromCart({ id: cartItem.id });
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <ScreenLayout>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenLayout>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !product) {
    return (
      <ScreenLayout>
        <CsText style={typography.Poppins_xl_semibold}>
          Product not found
        </CsText>
      </ScreenLayout>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <ScreenLayout>
        <ScreenContent>
          <BackHeader title="Product Details" />

          <FlatList
            data={[{ key: "content" }]}
            renderItem={() => null}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <ProductHeader product={product} />
                <ProductPriceCard product={product} />
                <ProductMeta product={product} />

                <ProductQuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  max={
                    product.stockTrackingIsEnabled
                      ? product.stockQuantity
                      : undefined
                  }
                />

                <ProductDescription product={product} />
                <ProductSpecifications product={product} />
              </>
            }
            ListFooterComponent={
              <View className="pb-32">
                <Review />
                <ProductFaq data={faqData} />
              </View>
            }
          />
        </ScreenContent>
      </ScreenLayout>

      <ProductStickyBar
        product={product}
        quantity={quantity}
        isInCart={isInCart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
}

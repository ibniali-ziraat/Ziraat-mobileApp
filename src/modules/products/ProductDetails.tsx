import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";

import ProductDescription from "./components/ProductDescription";
import ProductPriceCard from "./components/ProductPriceCard";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import ProductSpecifications from "./components/ProductSpecifications";
import ProductStickyBar from "./components/ProductStickyBar";

import Review from "@/src/components/shared/AllReview";
import ProductFaq from "@/src/components/shared/ProductFaq";

import faqData from "../../data/Faq.json";

import { toast } from "@backpackapp-io/react-native-toast";

import Loader from "@/src/components/shared/Loader";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import ProductImages from "./components/ProductImages";
import { useCart } from "./hooks/data/useCart";
import { useAddReview, useListReviews } from "./hooks/data/useReview";
import { useProductByIdQuery } from "./hooks/queries/products.queries";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { userId } = useAuth();

  const { data: product, isLoading, isError } = useProductByIdQuery(productId);

  const { mutate: submitReview, isPending } = useAddReview();
  const { cart, addToCart, removeFromCart, isCartBusy } = useCart();

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useListReviews({
    entityId: product?.id,
    entityTypeId: "Product",
    pageNumber,
    pageSize,
  });

  const reviewsRaw = reviewsData?.items?.data ?? [];

  const totalItems = reviewsData?.items?.totalItems ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const summary = {
    averageRating: reviewsData?.ratingAverage ?? 0,
    totalReviews: reviewsData?.reviewsCount ?? 0,
  };

  const reviews = useMemo(() => {
    return reviewsRaw.map((r: any) => ({
      id: r.id,
      user: r.reviewerName,
      userId: r.userId,
      rating: r.rating,
      comment: r.comment,
      title: r.title,
      date: new Date(r.createdOn).toLocaleDateString(),
      helpful: 0,
    }));
  }, [reviewsRaw]);

  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;

    return reviews.some(
      (r: any) => String(r.userId) === String(userId)
    );
  }, [reviews, userId]);

  const addReview = (formData: any) => {
    if (!product) return;

    const payload = {
      rating: formData.rating,
      title: "",
      comment: formData.comment,
      reviewerName: "",
      entityId: product.id,
      entityTypeId: "Product",
      hasBoughtProduct: true,
      loggedUserName: "",
    };

    submitReview(payload, {
      onSuccess: () => {
        toast.success("Review added");
        setPageNumber(1);
      },
    });
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  if (isError || !product) {
    return (
      <ScreenLayout>
        <CsText>Product not found</CsText>
      </ScreenLayout>
    );
  }

  const handleAddToCart = async () => {
    if (!product?.id) return;
    await addToCart({
      productId: Number(product.id),
      quantity: Number(quantity),
    });
  };

  const cartItem = cart.find((i) => i.productId === product.id);
  const isInCart = Boolean(cartItem);

  const handleRemoveFromCart = async () => {
    if (!cartItem?.id) return;
    await removeFromCart({ id: cartItem.id });
    toast.success("Removed from cart");
  };

  return (
    <>
      <ScreenLayout scrollable>
        <ScreenContent>
          <BackHeader title="Product Details" />

          <FlatList
            scrollEnabled={false}
            data={[{ key: "content" }]}
            renderItem={() => null}
            ListHeaderComponent={
              <>
                <ProductImages product={product} />
                <ProductPriceCard product={product} />
                <ProductQuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <View className="mt-6" />
                <ProductDescription product={product} />
                <ProductSpecifications product={product} />
              </>
            }
            ListFooterComponent={
              <View className="pb-32">
                {reviewsLoading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : reviewsError ? (
                  <Text>Failed to load reviews</Text>
                ) : (
                  <>
                    <Review
 
  reviews={reviews}
  summary={summary}
  hasUserReviewed={hasUserReviewed}
  onSubmitReview={addReview}
  loading={isPending}
  onViewAllPress={() =>
    router.push({
      pathname:ROUTES.Review.reviewlist,
      params: { productId: product.id },
    })
  }
/>

                   
                  </>
                )}

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
        isCartBusy={isCartBusy}
      />
    </>
  );
}
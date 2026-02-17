import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";

import ProductDescription from "./components/ProductDescription";
import ProductHeader from "./components/ProductHeader";
import ProductMeta from "./components/ProductMeta";
import ProductPriceCard from "./components/ProductPriceCard";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import ProductSpecifications from "./components/ProductSpecifications";
import ProductStickyBar from "./components/ProductStickyBar";

import Review from "@/src/components/shared/AllReview";
import ProductFaq from "@/src/components/shared/ProductFaq";
import WriteReview from "@/src/components/shared/WriteReview";

import faqData from "../../data/Faq.json";

import { toast } from "@backpackapp-io/react-native-toast";
import { X } from "lucide-react-native";
import { Modal } from "react-native-paper";

import { useCart } from "./hooks/data/useCart";
import { useAddReview, useListReviews } from "./hooks/data/useReview";
import { useProductByIdQuery } from "./hooks/queries/products.queries";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useProductByIdQuery(productId);

  const { mutate: submitReview, isPending } = useAddReview();

  /* ✅ Pagination State */
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;

  /* ✅ Fetch Reviews From Backend */
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError, // ✅ ADD THIS
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

  /* ✅ Map Backend → UI Model */
  const reviews = useMemo(() => {
    return reviewsRaw.map((r: any) => ({
      id: r.id,
      user: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
      title: r.title,
      date: new Date(r.createdOn).toLocaleDateString(),
      helpful: 0, // backend doesn’t provide yet
    }));
  }, [reviewsRaw]);

  /* ✅ Add Review */
  const [modalVisible, setModalVisible] = useState(false);

  const addReview = (formData: any) => {
    if (!product) return;

    const payload = {
      rating: formData.rating,
      title: "",
      comment: formData.comment,
      reviewerName: "Anonymous",
      entityId: product.id,
      entityTypeId: "Product",
      hasBoughtProduct: false,
      loggedUserName: "Anonymous",
    };

    submitReview(payload, {
      onSuccess: () => {
        toast.success("Review added ✅");
        setModalVisible(false);
      },
    });
  };

  const { cart, addToCart, removeFromCart, isCartBusy } = useCart();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <ScreenLayout>
        <ActivityIndicator size="large" color={colors.primary} />
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

  const cartItem = cart.find((i) => i.productId === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <>
      <ScreenLayout>
        <ScreenContent>
          <BackHeader title="Product Details" />

          <FlatList
            data={[{ key: "content" }]}
            renderItem={() => null}
            ListHeaderComponent={
              <>
                <ProductHeader product={product} />
                <ProductPriceCard product={product} />
                <ProductMeta product={product} />

                <ProductQuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                <ProductDescription product={product} />
                <ProductSpecifications product={product} />
              </>
            }
            ListFooterComponent={
              <View className="pb-32">
                {/* ✅ Reviews Section */}
                {reviewsLoading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : reviewsError ? (
                  <CsText>Failed to load reviews</CsText>
                ) : (
                  <>
                    <Review
                      reviews={reviews}
                      summary={summary}
                      onWriteReviewPress={() => setModalVisible(true)}
                    />

                    {/* ✅ Load More Pagination */}
                    {pageNumber < totalPages && (
                      <TouchableOpacity
                        onPress={() => setPageNumber((prev) => prev + 1)}
                      >
                        <Text>Load More Reviews</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}

                <ProductFaq data={faqData} />
              </View>
            }
          />

          {/* ✅ Write Review Modal */}
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              margin: 20,
              borderRadius: 20,
              padding: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: "flex-end" }}
            >
              <X size={26} color="black" />
            </TouchableOpacity>

            <WriteReview onSubmit={addReview} loading={isPending} />
          </Modal>
        </ScreenContent>
      </ScreenLayout>

      <ProductStickyBar
        product={product}
        quantity={quantity}
        isInCart={isInCart}
        onAddToCart={async () => {
          await addToCart({
            productId: product.id,
            quantity,
          });
          toast.success("Added to cart");
        }}
        onRemoveFromCart={async () => {
          if (!cartItem) return;
          await removeFromCart({ id: cartItem.id });
          toast.success("Removed from cart");
        }}
        isCartBusy={isCartBusy}
      />
    </>
  );
}

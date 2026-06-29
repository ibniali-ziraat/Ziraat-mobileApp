import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";

import ProductDescription from "./components/ProductDescription";
import ProductPriceCard from "./components/ProductPriceCard";
import ProductQuantitySelector from "./components/ProductQuantitySelector";
import ProductSpecifications from "./components/ProductSpecifications";
import ProductStickyBar from "./components/ProductStickyBar";

import Review from "@/src/components/shared/AllReview";

import { toast } from "@backpackapp-io/react-native-toast";
import { MoveLeft, PackageSearch } from "lucide-react-native";

import Loader from "@/src/components/shared/Loader";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import ProductImages from "./components/ProductImages";
import { useCart } from "./hooks/data/useCart";
import { useAddReview, useListReviews } from "./hooks/data/useReview";
import { useProductByIdQuery } from "./hooks/queries/products.queries";

/*  IMPORT PRODUCTS LIST */

/*  IMPORT WISHLIST */
import { typography } from "@/src/constants/fonts/typography";
import { useWishlist } from "../wishlist/hooks/useWishlist";
import ProductsList from "./components/ProductList";

export default function ProductDetails() {
  // console.log(productId, "productid");

  const [quantity, setQuantity] = useState(1);

  const { userId } = useAuth();

  const { productId, vendorId, vendorProductId } = useLocalSearchParams<{
    productId: string;
    vendorId: string;
    vendorProductId: string;
  }>();

  console.log(productId, vendorId, vendorProductId, "params data of product");

  const {
    data: product,
    isLoading,
    isError,
  } = useProductByIdQuery(productId, vendorId, vendorProductId);

  console.log(product, "product details in productdetails screen");

  // const { mutate: submitReview, isPending } = useAddReview();
  const { mutateAsync: submitReview, isPending } = useAddReview();
  const { cart, addToCart, removeFromCart, isCartBusy } = useCart();

  /*  WISHLIST */
  const {
    wishlist,
    isWishlistBusy,
    addToWishlist,
    removeFromWishlist,
    getWishlistItemId,
  } = useWishlist();

  const handleToggleWishlist = async (productId: string | number) => {
    const id = getWishlistItemId(productId);

    try {
      if (id) {
        await removeFromWishlist({ id });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({
          productId,
          quantity: 1,
        });
        toast.success("Added to wishlist");
      }
    } catch (error) {}
  };

  /* ⭐ RELATED PRODUCTS */
  const relatedProducts = product?.relatedProducts ?? [];

  /* ⭐ CROSS SELL PRODUCTS */
  const crossSellProducts = product?.crossSellProducts ?? [];

  /* ---------------- REVIEWS ---------------- */

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

  const summary = {
    averageRating: reviewsData?.ratingAverage ?? 0,
    totalReviews: reviewsData?.reviewsCount ?? 0,
  };

  // const reviews = useMemo(() => {
  //   return reviewsRaw.map((r: any) => ({
  //     id: r.id,
  //     user: r.reviewerName,
  //     userId: r.userId,
  //     rating: r.rating,
  //     comment: r.comment,
  //     title: r.title,
  //     date: new Date(r.createdOn).toLocaleDateString(),
  //     helpful: 0,
  //   }));
  // }, [reviewsRaw]);

  const reviews = useMemo(() => {
    return reviewsRaw.map((r: any) => ({
      id: r.id,

      user: r.reviewerName || "Anonymous",

      userId: r.userId || r.customerId || "",

      rating: Number(r.rating || 0),

      comment: r.comment || "",

      title: r.title || "",

      date: r.createdOn
        ? new Date(r.createdOn).toLocaleDateString()
        : new Date().toLocaleDateString(),

      helpful: 0,
    }));
  }, [reviewsRaw]);

  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;

    return reviews.some((r: any) => String(r.userId) === String(userId));
  }, [reviews, userId]);

  // const addReview = (formData: any) => {
  //   if (!product) return;

  //   const payload = {
  //     rating: formData.rating,
  //     title: "",
  //     comment: formData.comment,
  //     reviewerName: "",
  //     entityId: product.id,
  //     entityTypeId: "Product",
  //     hasBoughtProduct: true,
  //     loggedUserName: "",
  //   };

  //   submitReview(payload, {
  //     onSuccess: () => {
  //       toast.success("Review added");
  //       setPageNumber(1);
  //       // setModalVisible(false);
  //     },
  //   });
  // };

  const addReview = async (formData: any) => {
    if (!product) return;

    const payload = {
      rating: formData.rating,
      title: "",
      comment: formData.comment,

      reviewerName: "User",

      entityId: product.id,

      entityTypeId: "Product",

      hasBoughtProduct: true,

      loggedUserName: "User",
    };

    try {
      await submitReview(payload);

      toast.success("Review added");

      setPageNumber(1);

      return {
        success: true,
      };
    } catch (error: any) {
      // console.log(error, "review error");

      // ✅ GET BACKEND MESSAGE
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Failed to submit review";

      // ✅ SHOW TOAST
      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  if (isError || !product) {
    const router = useRouter();

    return (
      <ScreenLayout>
        <BackHeader title="Back" />
        <View className="flex-1 items-center justify-center px-8 bg-white">
          <View
            style={{ backgroundColor: `${colors.secondary}10` }}
            className="p-6 rounded-full mb-6"
          >
            <PackageSearch
              size={80}
              color={colors.secondary}
              strokeWidth={1.5}
            />
          </View>

          {/* Text Content */}
          <Text
            style={typography.Poppins_l_semibold}
            className="text-neutral-900 text-center text-xl mb-2"
          >
            Product Not Found
          </Text>

          <Text
            style={typography.Poppins_s_regular}
            className="text-neutral-400 text-center mb-10 leading-5"
          >
            We couldn't find the item you're looking for. It might have been
            removed or the link is incorrect.
          </Text>

          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center justify-center bg-neutral-900 px-8 py-4 rounded-2xl w-full active:opacity-80"
          >
            <MoveLeft size={20} color="white" className="mr-2" />
            <Text className="text-white font-bold text-base ml-2">Go Back</Text>
          </Pressable>
        </View>
      </ScreenLayout>
    );
  }

  /* ---------------- CART ---------------- */

  const cartItem = cart.find(
    (i) =>
      Number(i.productId) === Number(product.id) &&
      Number(i.vendorId) === Number(product.vendorId),
  );
  const isInCart = Boolean(cartItem);

  const handleAddToCart = async () => {
    if (!product?.id) return;
    console.log(product, "product on cart is..");

    try {
      await addToCart({
        productId: Number(product.id),
        quantity: Number(quantity),
        vendorId: Number(product.vendorId),
        vendorProductId: Number(product.vendorProductId),
      });
    } catch {}
  };

  const handleRemoveFromCart = async () => {
    if (!cartItem?.id) return;

    try {
      await removeFromCart({
        id: cartItem.id,
      });

      toast.success("Removed from cart");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not remove item";

      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <>
      <ScreenLayout>
        <BackHeader title="Product Details" />
        <ScreenContent>
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

                <ProductDescription product={product} />

                <ProductSpecifications product={product} />
              </>
            }
            ListFooterComponent={
              <View className="pb-32">
                {reviewsLoading ? (
                  <Loader />
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
                          pathname: ROUTES.Review.reviewlist,
                          params: { productId: product.id },
                        })
                      }
                    />
                  </>
                )}

                {relatedProducts.length > 0 && (
                  <ProductsList
                    title="Recommended Products"
                    items={relatedProducts}
                    wishlistItems={wishlist}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlistBusy={isWishlistBusy}
                    variant="carousel"
                  />
                )}

                {crossSellProducts.length > 0 && (
                  <View className="mt-6">
                    <ProductsList
                      items={crossSellProducts}
                      title="Frequently Bought Products"
                      wishlistItems={wishlist}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlistBusy={isWishlistBusy}
                      variant="carousel"
                    />
                  </View>
                )}
              </View>
            }
          />
        </ScreenContent>
      </ScreenLayout>

      <View className="mt-10">
        <ProductStickyBar
          product={product}
          isInCart={isInCart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          isCartBusy={isCartBusy}
          isWishlistBusy={isWishlistBusy}
          onToggleWishlist={handleToggleWishlist}
        />
      </View>
    </>
  );
}

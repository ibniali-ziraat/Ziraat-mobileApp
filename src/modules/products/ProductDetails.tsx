import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import ProductFaq from "@/src/components/shared/ProductFaq";
import RatingStars from "@/src/components/shared/RatingStars";
import Review from "@/src/components/shared/Review";
// Removed ScreenLayout
import { colors } from "@/src/constants/colors";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { addToCartList } from "@/src/utils/cartlistStore";
import { router, useLocalSearchParams } from "expo-router";
import { IndianRupee, Package } from "lucide-react-native";
// Imported FlatList
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { FlatList, ToastAndroid, View } from "react-native";
import faqData from "../../data/Faq.json";
import products from "../../data/products.json";

// --- START: renderHeader Function (Content moved from ScreenLayout) ---
const renderHeader = (product, colors) => (
  <>
    <ProductDetailCarousel photos={product.photos} label={product.label} />

    <View className="mt-8 px-4">
      <CsText className="text-4xl font-bold text-dark mb-2">
        {String(product.title)}
     </CsText>

      <CsText className="text-xl mb-1">Category: {String(product.category)}</CsText>

      {product.saltComposition && (
        <CsText className="text-xl mb-2 text-dark">
          <CsText className="font-semibold text-primary">
            {String(product.saltComposition)}
         </CsText>
       </CsText>
      )}

      {/* PRICE + DISCOUNT */}
      <View className="flex-row items-center mb-2 w-full">
        <View className="flex-row items-center">
          <IndianRupee size={16} color={colors.dark} />
          <CsText
            className={`text-xl text-dark ${
              product.discountPrice ? "line-through" : ""
            }`}
          >
            {String(product.price)}
         </CsText>
        </View>

        {product.discountPrice && (
          <View className="flex-row items-center ml-2">
            <IndianRupee size={20} color={colors.dark} />
            <CsText className="text-3xl font-bold text-dark">
              {String(product.discountPrice)}
           </CsText>
          </View>
        )}

        <CsText
          className={`text-sm px-2 py-1 bg-primary rounded-xl ml-3 ${
            product.inStock ? "text-light" : "text-primary"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
       </CsText>
      </View>

      {/* RATING */}
      <View className="flex-row justify-start mb-6">
        <RatingStars rating={product.rating} />
      </View>

      <CsText className="font-semibold text-xl mb-2">Product Description:</CsText>

      {/* DESCRIPTION */}
      {Array.isArray(product.description) ? (
        product.description.map((desc, index) => (
          <CsText key={index} className="text-dark text-[15px] mb-2 text-justify">
            {String(desc)}
         </CsText>
        ))
      ) : (
        <CsText className="text-dark text-[15px] text-justify">
          {String(product.description)}
       </CsText>
      )}

      {/* DOSAGE */}
      {product.dosage && (
        <CsText className="text-[15px] text-dark mb-4 text-justify">
          <CsText className="text-xl font-semibold text-dark">Dosage:</CsText>
          {String(product.dosage)}
       </CsText>
      )}

      {/* PACKAGING */}
      {product.packaging && (
        <View className="mt-4">
          <CsText className="font-semibold text-xl mb-2">Packaging:</CsText>

          {product.packaging.map((pack, index) => (
            <View key={index} className="flex-row items-center mb-1">
              <Package size={18} color={colors.secondary} />
              <CsText className="text-dark text-[15px] ml-2">
                {String(pack.type)}: {String(pack.size)}
                {pack.weight ? ` (${String(pack.weight)})` : ""}
                {pack.packOf ? ` - Pack of ${String(pack.packOf)}` : ""}
             </CsText>
            </View>
          ))}
        </View>
      )}

      {/* TAGS */}
      {product.tag && (
        <CsText className="text-dark text-xl font-medium mt-4">
          Tags:{" "}
          <CsText className="text-primary font-semibold">
            {String(product.tag)}
         </CsText>
       </CsText>
      )}
    </View>
  </>
);
// --- END: renderHeader Function ---

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();

  if (!productId) {
    return (
      <View className="flex-1 justify-center items-center bg-light">
        <CsText className="text-lg text-dark">Please provide a product ID</CsText>
      </View>
    );
  }

  const product = products?.find((p) => String(p._id) === String(productId));

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-light">
        <CsText className="text-lg text-dark">Product not found</CsText>
      </View>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCartList({
        id: String(product._id),
        title: String(product.title),
        category: String(product.category),
        price: String(product.price),
        discountPrice: product.discountPrice
          ? String(product.discountPrice)
          : null,
        photos: product.photos || [],
      });
      ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Add to cart failed:", error);
      ToastAndroid.show("Failed to add to cart", ToastAndroid.SHORT);
    }
  };

  return (
    <View className="flex-1 bg-light">
      <BackHeader title={"Products"} />

      {/* FIX: Use FlatList as the main scroll container for the page content */}
      <FlatList
        data={[{ key: "details-footer" }]} // Dummy data for FlatList structure
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader(product, colors)} // Passes the top details section
        ListFooterComponent={
          <>
            {/* REVIEWS */}
            <View className="mt-6 px-4">
              <Review />
            </View>

            {/* FAQ */}
            <View className="mt-2 px-4 pb-8">
              <ProductFaq data={faqData} />
            </View>
          </>
        }
        renderItem={() => null} // Don't render dummy item
      />

      {/* BUY NOW + ADD TO CART (Fixed Position) */}
      <View className="flex-row p-4 mb-6">
        <View className="flex-1 mr-2 h-12">
          <BuyNowButton
            onPress={() =>
              router.push({
                pathname: "/products/shipping",
                params: { productId: String(product._id) },
              })
            }
          />
        </View>

        <View className="flex-1 h-12">
          <AddToCartButton onPress={handleAddToCart} />
        </View>
      </View>
    </View>
  );
}

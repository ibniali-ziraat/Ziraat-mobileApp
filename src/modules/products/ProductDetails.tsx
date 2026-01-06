import ProductFaq from "@/src/components/shared/ProductFaq";
import RatingStars from "@/src/components/shared/RatingStars";
import Review from "@/src/components/shared/Review";
// Removed ScreenLayout
import { colors } from "@/src/constants/colors";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { useLocalSearchParams } from "expo-router";
import { IndianRupee, Package } from "lucide-react-native";
// Imported FlatList
import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useCartItem } from "@/src/hooks/useCartQuery";
import { FlatList, View } from "react-native";
import faqData from "../../data/Faq.json";
import products from "../../data/products.json";
// --- START: renderHeader Function (Content moved from ScreenLayout) ---
const renderHeader = (product, colors) => (
  <>
    <ProductDetailCarousel photos={product.photos} label={product.label} />

    <View className="mt-8">
      <CsText style={[typography.Poppins_l_semibold]} className=" text-dark ">
        {String(product.title)}
      </CsText>

      <CsText style={[typography.Poppins_s_medium]}>
        Category: {String(product.category)}
      </CsText>

      {product.saltComposition && (
        <CsText
          style={[typography.Poppins_s_medium]}
          className="pt-2 text-dark"
        >
          <CsText className=" text-primary">
            {String(product.saltComposition)}
          </CsText>
        </CsText>
      )}

      {/* PRICE + DISCOUNT */}
      <View className="flex-row items-center w-full py-1">
        <View className="flex-row items-center">
          <IndianRupee
            // If discounted, keep it small (12), otherwise set to size M (16)
            size={product.discountPrice ? 12 : 16}
            color={colors.dark} fontWeight={700}
          />
          <CsText
            style={product.discountPrice ? [typography.Poppins_s_regular,
            { textDecorationLine: 'line-through' }] : typography.Poppins_l_semibold}

          // style={[typography.Poppins_s_medium]}
          // className={`text-dark ${
          //   product.discountPrice 
          //     ? "line-through opacity-70 text-[14px]" // Styling for discounted state
          //     : "text-l font-semibold"             // Styling for "otherwise" (Size M, Semi-bold)
          // }`}
          >
            {String(product.price)}
          </CsText>
        </View>
        {/* <View className="flex-row items-center">
            <IndianRupee size={12} color={colors.dark} />
            <CsText
              style={[typography.Poppins_s_medium]}
              className={`text-dark text-xl ${
                product.discountPrice ? "line-through" : "font-semibold text-[12px] text-error"
              }`}
            >
              {String(product.price)}
            </CsText>
          </View> */}

        {product.discountPrice && (
          <View className="flex-row items-center ml-2 ">
            <IndianRupee size={15} color={colors.dark} />
            <CsText
              style={[typography.Poppins_l_semibold]}
              className="text-dark"
            >
              {String(product.discountPrice)}
            </CsText>
          </View>
        )}

        <CsText
          style={[typography.Poppins_xs_medium]}
          className={`px-3  bg-primary rounded-xl ml-3 ${product.inStock ? "text-light" : "text-primary"
            }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </CsText>
      </View>

      {/* RATING */}
      <View className="flex-row justify-start pb-4">
        <RatingStars rating={product.rating} />
      </View>

      <CsText style={[typography.Poppins_m_semibold]} className="mb-2">
        Product Description:
      </CsText>

      {/* DESCRIPTION */}
      {Array.isArray(product.description) ? (
        product.description.map((desc, index) => (
          <CsText
            style={[typography.Poppins_s_regular]}
            key={index}
            className="text-dark text-justify"
          >
            {String(desc)}
          </CsText>
        ))
      ) : (
        <CsText className="text-dark text-justify ">
          {String(product.description)}
        </CsText>
      )}

      {/* DOSAGE */}
      {product.dosage && (
        <CsText
          style={[typography.Poppins_s_regular, { paddingTop: 5 }]}
          className=" text-justify"
        >
          <CsText
            style={[typography.Poppins_m_semibold]}
            className="text-dark"
          >
            Dosage:{" "}
          </CsText>
          {String(product.dosage)}
        </CsText>
      )}

      {/* PACKAGING */}
      {product.packaging && (
        <View className="mt-3">
          <CsText style={[typography.Poppins_s_semibold]} className=" mb-2">
            Packaging:
          </CsText>

          {product.packaging.map((pack, index) => (
            <View key={index} className="flex-row items-center mb-1">
              <Package size={18} color={colors.secondary} />
              <CsText
                style={[typography.Poppins_s_regular]}
                className="text-dark ml-2"
              >
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
        <CsText
          style={[typography.Poppins_s_medium]}
          className="text-dark mt-3"
        >
          Tags:{" "}
          <CsText
            style={[typography.Poppins_s_medium]}
            className="text-primary "
          >
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

  const { mutateAsync: save } = useCartItem()

  if (!productId) {
    return (
      <ScreenLayout
        scrollable={false}
      >
        <View className="flex-1 justify-center items-center">
          <CsText style={[typography.Poppins_xl_semibold]} className=" text-dark">
            Please provide a product ID
          </CsText>
        </View>
      </ScreenLayout>
    );
  }

  const product = products?.find((p) => String(p._id) === String(productId));

  if (!product) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center bg-light">
          <CsText style={[typography.Poppins_xl_semibold]} className=" text-dark">
            Product not found
          </CsText>
        </View>
      </ScreenLayout>
    );
  }


  const handleAddToCart = async () => {
    save({

      productId: product._id,
      variationName: "Buprofezin",
      quantity: 10,


    })


    // try {
    //   await addToCartList({
    //     id: String(product._id),
    //     title: String(product.title),
    //     category: String(product.category),
    //     price: String(product.price),
    //     discountPrice: product.discountPrice
    //       ? String(product.discountPrice)
    //       : null,
    //     photos: product.photos || [],
    //   });

    //   ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
    // } catch (error) {
    //   console.error("Add to cart failed:", error);
    //   ToastAndroid.show("Failed to add to cart", ToastAndroid.SHORT);
    // }
  };

  return (
    <>
      <ScreenLayout
      >
        <ScreenContent>
          <View className="flex-1 bg-light relative">
            <BackHeader title="Products" />

            {/* Scrollable content */}
            <FlatList
              data={[{ key: "details-footer" }]}
              keyExtractor={(item) => item.key}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderHeader(product, colors)}
              ListFooterComponent={
                <>
                  <Review />
                  <View className="mt-2 pb-28">
                    <ProductFaq data={faqData} />
                  </View>
                </>
              }
              renderItem={() => null}
            />




            {/* STICKY BOTTOM BAR */}


          </View>

        </ScreenContent>
      </ScreenLayout>
      <View className="absolute bottom-0 left-0 right-0 bg-light p-4 z-10 mb-4">
        <View className="flex-row">
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
    </>

  );
}

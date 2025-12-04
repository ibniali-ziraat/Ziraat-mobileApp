import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import ProductFaq from "@/src/components/shared/ProductFaq";
import RatingStars from "@/src/components/shared/RatingStars";
import Review from "@/src/components/shared/Review";
import { colors } from "@/src/constants/colors";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { router, useLocalSearchParams } from "expo-router";
import { IndianRupee, Package } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import faqData from "../../Data/Faq.json";
import products from "../../Data/products.json";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();

  if (!productId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-dark">Please provide a product ID</Text>
      </View>
    );
  }

  const product = products.find((p) => p._id.toString() === productId);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-dark">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light">
      <ScrollView>
        <ProductDetailCarousel
          photos={product.photos}
          label={product.label}
        />

        <View className="px-6 mt-8 items-start">
          <Text className="text-4xl font-bold text-dark mb-2">
            {product.title}
          </Text>

          <Text className="text-xl mb-1">
            Category: {product.category}
          </Text>

          {product.saltComposition && (
            <Text className="text-xl mb-2 text-dark">
              <Text className="font-semibold text-primary">
                {product.saltComposition}
              </Text>
            </Text>
          )}

          <View className="flex-row items-center mb-2 w-full">
            <View className="flex-row items-center">
              <IndianRupee size={16} color={colors.dark} />
              <Text
                className={`text-xl text-dark ${
                  product.discountPrice ? "line-through text-dark" : ""
                }`}
              >
                {product.price}
              </Text>
            </View>

            {product.discountPrice && (
              <View className="flex-row items-center ml-2">
                <IndianRupee size={20} color={colors.dark} />
                <Text className="text-3xl font-bold text-dark">
                  {product.discountPrice}
                </Text>
              </View>
            )}

            <Text
              className={`text-sm px-2 py-1 bg-primary rounded-xl ml-3 ${
                product.inStock ? "text-light" : "text-error"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>

          <View className="flex-row justify-start mb-6">
            <RatingStars rating={product.rating} />
          </View>

          <Text className="font-semibold text-xl mb-2">
            Product Description:
          </Text>

          {Array.isArray(product.description) ? (
            product.description.map((desc, index) => (
              <Text key={index} className="text-dark text-[15px] mb-2">
                {desc}
              </Text>
            ))
          ) : (
            <Text className="text-dark text-[15px]">
              {product.description}
            </Text>
          )}

  
          {product.dosage && (
            <Text className="text-[15px] text-dark mb-4">
              <Text className="text-xl font-semibold text-dark">
                Dosage:{" "}
              </Text>
              {product.dosage}
            </Text>
          )}

          {product.packaging && (
            <>
              <View className="flex-row items-center mb-2 mt-4">
                <Text className="font-semibold text-xl ">
                  Packaging:
                </Text>
              </View>

              {product.packaging.map((pack, index) => (
                <View
                  key={index}
                  className="flex-row items-center mb-1"
                >
                  <Package size={18} color={colors.secondary} />

                  <Text className="text-dark text-[15px] ml-2">
                    {pack.type}: {pack.size}
                    {pack.weight ? ` (${pack.weight})` : ""}
                    {pack.packOf ? ` - Pack of ${pack.packOf}` : ""}
                  </Text>
                </View>
              ))}
            </>
          )}

   
          {product.tag && (
            <Text className="text-dark text-xl font-medium mt-4">
              Tags:{" "}
              <Text className="text-primary font-semibold">
                {product.tag}
              </Text>
            </Text>
          )}
        </View>

        <View className="px-6 mt-6">
          <Review />
        </View>

        <View className="px-6 mt-2">
          <ProductFaq data={faqData} />
        </View>
      </ScrollView>

      <View className="flex-row p-4 my-6">
        <View className="flex-1 mr-2 h-12">
          <BuyNowButton
            onPress={() =>
              router.push({
                pathname: "/shipping",
                params: { productId: product._id.toString() },
              })
            }
          />
        </View>

        <View className="flex-1 h-12">
          <AddToCartButton
            onPress={() => console.log("Added to Cart")}
          />
        </View>
      </View>
    </View>
  );
}

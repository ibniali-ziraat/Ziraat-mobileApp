import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/data/imageMapper";
import { IndianRupee, X } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

export default function ProductCard({ product, onRemove }: any) {
  return (
    <View className="bg-light p-2 rounded-2xl mb-2">
      <View className="flex-row">
        <View className="w-32 h-32 rounded-xl overflow-hidden mr-3 bg-error">
          <Image
            source={imageMapper[product.photos[0]]}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <CsText className="text-2xl font-bold text-dark flex-1">
              {product.title}
            </CsText>

            {onRemove && (
              <Pressable
                onPress={() => onRemove(product._id)}
                className="ml-2 p-1 rounded-full bg-neutral"
              >
                <X size={18} color={colors.dark} />
              </Pressable>
            )}
          </View>

          <CsText className="text-lg text-dark mt-1">
            Category: {product.category}
          </CsText>

          <View className="flex-row items-center mt-3">
            <IndianRupee size={18} color={colors.dark} />
            <CsText
              className={`text-xl text-dark ${product.discountPrice ? "line-through" : ""
                }`}
            >
              {product.price}
            </CsText>

            {product.discountPrice && (
              <View className="flex-row items-center ml-2">
                <IndianRupee size={18} color={colors.dark} />
                <CsText className="text-2xl font-bold text-dark">
                  {product.discountPrice}
                </CsText>
              </View>
            )}

            <CsText
              className={`text-sm px-2 py-1 rounded-xl ml-2 ${product.inStock
                ? "bg-primary text-light"
                : "bg-primary text-primary"
                }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </CsText>
          </View>
        </View>
      </View>
    </View>
  );
}

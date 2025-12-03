
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/Data/imageMapper";
import { IndianRupee } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";



export default function ProductCard({ product }) {
  return (
    <View className="bg-light p-4 rounded-2xl shadow border border-neutral mb-4 mt-10">
      <View className="flex-row">
        <View className="w-32 h-32 rounded-xl overflow-hidden mr-3 bg-neutral">
          <Image
            source={imageMapper[product.photos[0]]}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <Text className="text-2xl font-bold text-dark">{product.title}</Text>
          <Text className="text-lg text-dark mt-1">
            Category: {product.category}
          </Text>

          <View className="flex-row items-center mt-3">
            <IndianRupee size={18} color={colors.dark} />
            <Text
              className={`text-xl text-dark ${
                product.discountPrice ? "line-through" : ""
              }`}
            >
              {product.price}
            </Text>

            {product.discountPrice && (
              <View className="flex-row items-center">
                <IndianRupee size={22} color={colors.dark} />
                <Text className="text-3xl font-bold text-dark">
                  {product.discountPrice}
                </Text>
              </View>
            )}

            <Text
              className={`text-sm px-2 py-1 rounded-xl ml-2 ${
                product.inStock ? "bg-primary text-light" : "bg-primary text-primary"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

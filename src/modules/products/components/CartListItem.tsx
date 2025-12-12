import QuantitySelector from "@/src/components/shared/QuantitySelector";
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/Data/imageMapper";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CartListItem({
  item,
  quantity,
  onQtyChange,
  onRemove,
}) {
  const discountPercent = item.discountPrice
    ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
    : null;

  return (
    <View className="bg-light rounded-xl shadow-md p-4 mt-3 flex-row items-start">
      {/* Product Image */}
      <Image
        source={imageMapper[item?.photos?.[0]]}
        className="w-20 h-20 rounded-lg"
        resizeMode="cover"
      />

      {/* Right Section */}
      <View className="ml-4 flex-1">

        {/* Title + Quantity */}
        <View className="flex-row justify-between items-center">
          <Text className="text-dark font-semibold text-lg flex-1">
            {item.title}
          </Text>

          <View className="w-30">
            <QuantitySelector
              quantity={quantity}
              setQuantity={onQtyChange}
            />
          </View>
        </View>

        {/* Category */}
        <Text className="text-dark text-sm">{item.category}</Text>

        {/* Price + Remove */}
        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center">
            {item.discountPrice ? (
              <>
                <Text className="text-dark line-through mr-2">
                  ₹{item.price}
                </Text>
                <Text className="text-primary font-bold mr-1">
                  ₹{item.discountPrice}
                </Text>
                {!!discountPercent && (
                  <Text className="text-secondary text-xs font-semibold">
                    {discountPercent}% OFF
                  </Text>
                )}
              </>
            ) : (
              <Text className="text-primary font-semibold">
                ₹{item.price}
              </Text>
            )}
          </View>

          <TouchableOpacity onPress={onRemove} className="p-1 ml-2">
            <Ionicons
              name="trash-outline"
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

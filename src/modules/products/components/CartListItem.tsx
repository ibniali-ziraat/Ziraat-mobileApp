import CsText from "@/src/components/shared/CsText";
import QuantitySelector from "@/src/components/shared/QuantitySelector";
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/data/imageMapper";
import { Image, TouchableOpacity, View } from "react-native";
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
    <>

      <Image
        source={imageMapper[item?.photos?.[0]]}
        className="w-32 h-24 rounded-lg px-1"
        resizeMode="cover"
      />


      <View className="ml-4 flex-1">
        {/* Title + Quantity */}
        <View className="flex-row justify-between items-center">
          <CsText className="text-dark flex-1">
            {item.title}
          </CsText>

          <View className="w-30">
            <QuantitySelector quantity={quantity} setQuantity={onQtyChange} />
          </View>
        </View>


        <CsText className="text-dark text-sm">{item.category}</CsText>


        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center">
            {item.discountPrice ? (
              <>
                <CsText className="text-dark line-through mr-2">
                  ₹{item.price}
                </CsText>
                <CsText className="text-primary font-bold mr-1">
                  ₹{item.discountPrice}
                </CsText>
                {!!discountPercent && (
                  <CsText className="text-secondary text-xs font-semibold">
                    {discountPercent}% OFF
                  </CsText>
                )}
              </>
            ) : (
              <CsText className="text-primary font-semibold">₹{item.price}</CsText>
            )}
          </View>

          <TouchableOpacity onPress={onRemove} className="p-1 ml-2">
            <Ionicons name="trash-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </>

  );
}

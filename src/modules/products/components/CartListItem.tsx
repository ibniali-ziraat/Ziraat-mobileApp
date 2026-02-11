import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CsText from "@/src/components/shared/CsText";
import QuantitySelector from "@/src/components/shared/QuantitySelector";
import { colors } from "@/src/constants/colors";

export default function CartListItem({
  item,
  quantity: apiQuantity,
  onQtyChange,
  handleRemoveItem,
}) {
  const [quantity, setQuantity] = useState(apiQuantity ?? 1);

  // Sync quantity when cart updates from API
  useEffect(() => {
    setQuantity(apiQuantity ?? 1);
  }, [apiQuantity]);

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQtyChange(newQty);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQtyChange(newQty);
    }
  };

  const price = item?.calculatedProductPrice?.price ?? item.productPrice;
  const oldPrice = item?.calculatedProductPrice?.oldPrice;

  const discountPercent =
    oldPrice && price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <View className="flex-row p-3 bg-white rounded-xl">
      {/* Image */}
      <Image
        source={{ uri: item.productImage }}
        className="w-32 h-24 rounded-lg"
        resizeMode="cover"
      />

      <View className="ml-4 flex-1">
        {/* Title + Quantity */}
        <View className="flex-row justify-between items-center">
          <CsText className="text-dark flex-1 font-medium">
            {item.productName}
          </CsText>

          <QuantitySelector
            value={quantity}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            min={1}
          />
        </View>

        {/* Stock */}
        <CsText className="text-xs text-dark mt-1">
          {item.isProductAvailabeToOrder ? "In Stock" : "Out of Stock"}
        </CsText>

        {/* Price + Remove */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            {oldPrice ? (
              <>
                <CsText className="line-through mr-2 text-sm">
                  ₹{oldPrice}
                </CsText>
                <CsText className="text-primary font-bold mr-1">
                  ₹{price}
                </CsText>
                {!!discountPercent && (
                  <CsText className="text-secondary text-xs font-semibold">
                    {discountPercent}% OFF
                  </CsText>
                )}
              </>
            ) : (
              <CsText className="text-primary font-semibold">₹{price}</CsText>
            )}
          </View>

          <TouchableOpacity onPress={handleRemoveItem}>
            <Ionicons name="trash-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";

import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Minus, Plus, Store, Trash2 } from "lucide-react-native";

export default function CartListItem({
  item,
  quantity: apiQuantity,
  onQtyChange,
  handleRemoveItem,
}) {
  const [quantity, setQuantity] = useState(apiQuantity || 1);

  useEffect(() => {
    setQuantity(apiQuantity || 1);
  }, [apiQuantity]);

  const decrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQtyChange?.(newQty);
    }
  };

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQtyChange?.(newQty);
  };

  const price = item?.calculatedProductPrice?.price ?? item?.productPrice ?? 0;
  const oldPrice = item?.calculatedProductPrice?.oldPrice ?? 0;

  const discount =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const totalPrice = price * quantity;

  return (
    <>
      {/* CARD */}
      <View
        className="mb-5 flex-row px-4 py-3 rounded-lg"
        style={{
          borderWidth: 1,
          borderColor: colors.secondary + "40",
          backgroundColor: colors.light,
        }}
      >
        {/* IMAGE */}
        <Image
          source={{ uri: item?.productImage }}
          className="w-24 h-32 rounded-md"
          resizeMode="cover"
        />

        {/* CONTENT */}
        <View className="ml-4 flex-1">
          {/* TITLE + DELETE */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <CsText className="text-sm font-medium" numberOfLines={2}>
                {item?.productName}
              </CsText>

              {!!item?.variationName && (
                <CsText
                  className="text-xs mt-0.5"
                  style={{ color: colors.darkHover }}
                >
                  {item.variationName}
                </CsText>
              )}
            </View>

            <Pressable
              onPress={handleRemoveItem}
              className="p-1.5 rounded-full"
              style={{ backgroundColor: colors.lightHover }}
            >
              <Trash2 size={15} color={colors.error ?? "#dc2626"} />
            </Pressable>
          </View>

          {/* DISCOUNT */}
          {discount > 0 && (
            <View
              className="self-start mt-1 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: colors.secondary + "20" }}
            >
              <CsText
                className="text-xs font-semibold"
                style={{ color: colors.secondary }}
              >
                {discount}% OFF
              </CsText>
            </View>
          )}

          {/* QTY CONTROL */}
          <View
            className="flex-row items-center"
            style={{
              borderWidth: 1,
              borderColor: "#e5e5e5",
              alignSelf: "flex-start",
              marginTop: 5,
            }}
          >
            <Pressable
              onPress={decrease}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                opacity: quantity === 1 ? 0.4 : 1,
              }}
            >
              <Minus size={12} color={colors.dark} />
            </Pressable>

            <View
              style={{
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: "#e5e5e5",
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <CsText style={{ fontSize: 12, color: "#111" }}>
                Qty {quantity}
              </CsText>
            </View>

            <Pressable
              onPress={increase}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            >
              <Plus size={12} color={colors.dark} />
            </Pressable>
          </View>

          {/* PRICE */}
          <View className="flex-row items-center mt-3">
            {oldPrice > price && (
              <CsText
                className="text-xs line-through mr-2"
                style={{ color: colors.darkHover }}
              >
                ₹{oldPrice}
              </CsText>
            )}

            <CsText
              className="text-base font-semibold"
              style={{ color: colors.primary }}
            >
              ₹{price}
            </CsText>
          </View>

          {/* SOLD BY VENDOR */}
{!!item?.vendorName && (
  <View className="flex-row items-center mt-4" style={{ gap: 4 }}>
    <Store size={12} color={colors.primary} />
    <CsText
      className="text-xs font-semibold"
      style={{ color: colors.primary }}
    >
      Sold by :
    </CsText>
    <CsText
      className="text-xs font-semibold flex-shrink"
      numberOfLines={1}
      style={{ color: colors.secondary }}
    >
      {item.vendorName}
    </CsText>
  </View>
)}

          {/* TOTAL */}
          {quantity > 1 && (
            <CsText
              className="text-xs mt-1"
              style={{ color: colors.darkHover }}
            >
              Total ₹{totalPrice}
            </CsText>
          )}
        </View>
      </View>
    </>
  );
}
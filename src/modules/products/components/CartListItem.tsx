import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";

export default function CartListItem({
  item,
  quantity: apiQuantity,
  onQtyChange,
  handleRemoveItem,
}) {
  const [quantity, setQuantity] = useState(apiQuantity ?? 1);
  const [showQtyModal, setShowQtyModal] = useState(false);

  useEffect(() => {
    setQuantity(apiQuantity ?? 1);
  }, [apiQuantity]);

  const selectQty = (q: number) => {
    setQuantity(q);
    onQtyChange(q);
    setShowQtyModal(false);
  };

  const price =
    item?.calculatedProductPrice?.price ?? item?.productPrice ?? 0;

  const oldPrice = item?.calculatedProductPrice?.oldPrice ?? 0;

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const totalPrice = price * quantity;

  return (
    <>
      {/* CARD */}
      <View
        className="mb-5 flex-row px-4 py-3 rounded-lg "
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
            <CsText
              className="text-sm font-medium flex-1 pr-2"
              numberOfLines={2}
            >
              {item?.productName}
            </CsText>

            <Pressable
              onPress={handleRemoveItem}
              className="p-1 rounded-full"
              style={{ backgroundColor: colors.lightHover }}
            >
              <Ionicons
                name="close"
                size={16}
                color={colors.darkHover}
              />
            </Pressable>
          </View>

          {/* DISCOUNT PILL */}
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

          {/* QTY */}
          <Pressable
            onPress={() => setShowQtyModal(true)}
            className="self-start mt-2  py-1.5 rounded-md"
            style={{ backgroundColor: colors.lightHover }}
          >
            <CsText className="text-xs font-semibold">
              Qty {quantity} ▾
            </CsText>
          </Pressable>

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

      {/* QTY MODAL */}
      <Modal
        transparent
        visible={showQtyModal}
        animationType="slide"
        onRequestClose={() => setShowQtyModal(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          onPress={() => setShowQtyModal(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <View className="bg-white rounded-t-3xl p-5">

            <CsText className="font-semibold mb-4">
              Select Quantity
            </CsText>

            <View className="flex-row flex-wrap">
              {[...Array(10)].map((_, i) => {
                const q = i + 1;
                const active = q === quantity;

                return (
                  <TouchableOpacity
                    key={q}
                    onPress={() => selectQty(q)}
                    className="w-1/5 items-center mb-4"
                  >
                    <View
                      className="h-10 w-10 rounded-full items-center justify-center"
                      style={{
                        backgroundColor: active
                          ? colors.primary
                          : colors.lightHover,
                      }}
                    >
                      <CsText
                        style={{
                          color: active ? colors.light : colors.dark,
                        }}
                      >
                        {q}
                      </CsText>
                    </View>
                  </TouchableOpacity>
                );
              })}

            </View>

          </View>
        </Pressable>
      </Modal>
    </>
  );
}

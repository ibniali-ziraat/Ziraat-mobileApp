import AddToCartButton from "@/src/components/shared/AddToCartButton";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { useWishlist } from "../hooks/data/useWishlist";

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const { removeFromWishlist } = useWishlist();

  const selectQty = (q: number) => {
    setQuantity(q);
    setShowQtyModal(false);
  };

  const handleAddToCart = async () => {
    await onAddToCart({
      productId: item.productId,
      quantity,
    });
    await removeFromWishlist({ id: item.id });
  };

  return (
    <>
      {/* GRID CARD WRAPPER */}
      <View className="w-1/2 p-3">

        <View
          className="rounded-2xl p-3"
          style={{
            backgroundColor: colors.light,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 5,
          }}
        >

          {/* FLOATING REMOVE */}
          <Pressable
            onPress={() => onRemove(item.id)}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full"
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <X size={14} color={colors.dark} />
          </Pressable>

          {/* IMAGE */}
          <Image
            source={{ uri: item.productImage }}
            className="w-full h-44 rounded-xl"
            resizeMode="cover"
          />

          {/* CONTENT */}
          <View className="mt-3">

            <CsText
              style={typography.Poppins_s_medium}
              numberOfLines={2}
            >
              {item.productName}
            </CsText>

            {/* QTY SELECTOR */}
            <Pressable
              onPress={() => setShowQtyModal(true)}
              className="self-start mt-2  py-1.5 rounded-lg"
              style={{
                backgroundColor: colors.lightHover,
              }}
            >
              <CsText className="text-xs font-semibold">
                Qty {quantity} ▾
              </CsText>
            </Pressable>

            {/* BUTTON */}
            <View className="mt-3">
              <AddToCartButton
                title="Move to Cart"
                onPress={handleAddToCart}
                height={36}
              />
            </View>

          </View>
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
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <View
            style={{ backgroundColor: colors.light }}
            className="rounded-t-3xl p-6"
          >
            <CsText
              style={typography.Poppins_m_semibold}
              className="mb-4"
            >
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
                          color: active
                            ? colors.light
                            : colors.dark,
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
};

export default WishlistItem;

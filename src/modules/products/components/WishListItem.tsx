import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Minus, Plus, ShoppingBag, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { useWishlist } from "../hooks/data/useWishlist";

const IMAGE_HEIGHT = 175;
const CARD_HEIGHT = 320;

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { removeFromWishlist } = useWishlist();

  const decrease = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  const increase = () => {
    setQuantity((p) => p + 1);
  };

  const handleAddToCart = async () => {
    await onAddToCart({
      productId: item.productId,
      quantity,
    });
    await removeFromWishlist({ id: item.id });
  };
  if (!item) {
    return null;
  }

  return (
    <View className="w-1/2 px-1 mb-6">
      <View
        style={{
          height: CARD_HEIGHT,
          backgroundColor: colors.light,
          borderWidth: 2,
          borderColor: "#ededed",
        }}
      >
        {/* REMOVE */}
        <Pressable
          onPress={() => onRemove(item.id)}
          className="absolute right-2 top-2 z-10"
        >
          <X size={14} color="#222" />
        </Pressable>

        {/* IMAGE */}
        <View style={{ height: IMAGE_HEIGHT }}>
          <Image
            source={{ uri: item.productImage }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* BODY */}
        {/* BODY */}
        <View className=" pt-2 ">
          <View className="px-3">
            {/* TITLE (LOCKED HEIGHT) */}
            <View style={{ minHeight: 34 }}>
              <CsText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[typography.Poppins_xs_medium, { color: "#111" }]}
              >
                {item.productName}
              </CsText>
            </View>

            {/* SMALL GAP */}
            <View style={{ height: 6 }} />

            {/* QTY CONTROL */}
            <View
              className="flex-row items-center"
              style={{
                borderWidth: 1,
                borderColor: "#e5e5e5",
                alignSelf: "flex-start",
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
          </View>

          {/* BUTTON (NO EXTRA MARGIN) */}
          <Pressable
            onPress={handleAddToCart}
            className="pt-6 pb-5 border-t items-center active:opacity-70"
            style={{ borderColor: "#e5e5e5", marginTop: 6 }}
          >
            <View className="flex-row items-center">
              <ShoppingBag size={16} color={colors.secondary} />
              <CsText
                className="ml-2"
                style={{
                  color: colors.secondary,
                  letterSpacing: 0.6,
                  fontFamily: typography.Poppins_m_semibold?.fontFamily,
                }}
              >
                MOVE TO BAG
              </CsText>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;

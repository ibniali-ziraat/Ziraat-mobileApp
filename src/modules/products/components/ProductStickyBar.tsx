// ProductStickyBar.tsx
import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react-native";
import { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  product: any;
  quantity: number;
  isInCart: boolean;
  isCartBusy: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
};

export default function ProductStickyBar({
  isInCart,
  isCartBusy,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  const actionInProgress = useRef(false);
  const cartBtnScale = useRef(new Animated.Value(1)).current;

  const animatePress = (toValue: number) => {
    Animated.spring(cartBtnScale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handleCartPress = () => {
    if (isCartBusy || actionInProgress.current) return;
    actionInProgress.current = true;
    (isInCart ? onRemoveFromCart : onAddToCart)();
    setTimeout(() => {
      actionInProgress.current = false;
    }, 600);
  };

  const cartLabel = isCartBusy
    ? isInCart
      ? "Removing..."
      : "Adding..."
    : isInCart
      ? "Remove from Cart"
      : "Add to Cart";

  const CartIcon = isInCart ? Trash2 : ShoppingCart;
  const cartBgColor = isInCart ? "#FF4444" : colors.primary;

  return (
    <View style={styles.wrapper}>
      {/* Legal disclaimer */}
      <View style={styles.disclaimerRow}>
        <LegalDisclaimer />
      </View>

      <View style={styles.buttonsRow}>
        {/* ── Back button ── */}
        <Pressable
          onPress={() => router.replace(ROUTES.TABS.PRODUCTS)}
          disabled={isCartBusy}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && styles.pressed,
            isCartBusy && styles.disabledOpacity,
          ]}
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2.2} />
          {/* <Text style={styles.backLabel}>Back</Text> */}
        </Pressable>

        {/* ── Cart button ── */}
        <Animated.View
          style={[
            styles.cartBtnWrapper,
            { transform: [{ scale: cartBtnScale }] },
          ]}
        >
          <Pressable
            onPress={handleCartPress}
            onPressIn={() => animatePress(0.96)}
            onPressOut={() => animatePress(1)}
            disabled={isCartBusy}
            style={[
              styles.cartBtn,
              { backgroundColor: cartBgColor },
              isCartBusy && styles.cartBtnBusy,
            ]}
          >
            {isCartBusy ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.cartLabel}>{cartLabel}</Text>
              </>
            ) : (
              <>
                <CartIcon size={18} color="#fff" strokeWidth={2.2} />
                <Text style={styles.cartLabel}>{cartLabel}</Text>
              </>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    // Crisp shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 999,
  },
  disclaimerRow: {
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  // ── Back button ──
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  backLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    letterSpacing: 0.2,
  },

  // ── Cart button ──
  cartBtnWrapper: {
    flex: 1,
  },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  cartBtnBusy: {
    opacity: 0.75,
  },
  cartLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },

  // Shared states
  pressed: {
    opacity: 0.7,
  },
  disabledOpacity: {
    opacity: 0.45,
  },
});

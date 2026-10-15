import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useWishlist } from "@/src/modules/wishlist/hooks/useWishlist";
import { toast } from "@backpackapp-io/react-native-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  product: any;
  isInCart: boolean;
  isCartBusy: boolean;
  isWishlistBusy: boolean;
  onAddToCart: () => Promise<void>;
  onRemoveFromCart?: () => Promise<void>;
  onToggleWishlist?: (
    productId: number,
    vendorId?: number,
    vendorProductId?: number,
  ) => Promise<void>;
};

export default function ProductStickyBar({
  product,
  isInCart,
  isCartBusy,
  isWishlistBusy,
  onAddToCart,
  onToggleWishlist,
}: Props) {
  const actionInProgress = useRef(false);

  const cartBtnScale = useRef(new Animated.Value(1)).current;
  const wishlistBtnScale = useRef(new Animated.Value(1)).current;

  const { addToWishlist, removeFromWishlist, getWishlistItemId } =
    useWishlist();

  const wishlistId = getWishlistItemId(product?.id, product?.vendorId);
  const isWishlisted = !!wishlistId;

  const insets = useSafeAreaInsets();

  // Devices with no home-indicator inset would otherwise sit flush against
  // the screen edge (or an Android nav bar) — lift the bar clear of it.
  const bottomOffset = insets.bottom > 0 ? 0 : 28;

  // Loader Animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animateCart = (toValue: number) => {
    Animated.spring(cartBtnScale, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const animateWishlist = (toValue: number) => {
    Animated.spring(wishlistBtnScale, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  // CART
  const handleCartPress = async () => {
    if (isCartBusy || actionInProgress.current) return;

    actionInProgress.current = true;

    try {
      if (isInCart) {
        router.push(ROUTES.SHOPPING.CART);
      } else {
        await onAddToCart();
      }
    } finally {
      actionInProgress.current = false;
    }
  };

  const handleWishlist = async () => {
    if (isWishlistBusy || actionInProgress.current) return;

    actionInProgress.current = true;

    try {
      if (onToggleWishlist) {
        await onToggleWishlist(
          product.id,
          product.vendorId,
          product.vendorProductId,
        );
      } else {
        if (wishlistId) {
          await removeFromWishlist({ id: wishlistId });
          toast.success("Removed from wishlist");
        } else {
          await addToWishlist({
            productId: product.id,
            vendorId: product.vendorId,
            vendorProductId: product.vendorProductId,
            quantity: 1,
          });
          toast.success("Added to wishlist");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      actionInProgress.current = false;
    }
  };

  const cartLabel = isCartBusy
    ? "Adding..."
    : isInCart
      ? "Go to Cart"
      : "Add to Cart";

  return (
    <View
      style={[
        styles.wrapper,
        {
          bottom: bottomOffset,
          paddingBottom:
            Platform.OS === "ios"
              ? insets.bottom
              : insets.bottom > 0
                ? insets.bottom
                : 16,
        },
      ]}
    >
      {/* KEEP DISCLAIMER */}
      <View style={styles.disclaimerRow}>
        <LegalDisclaimer />
      </View>

      <View style={styles.buttonsRow}>
        {/* Wishlist */}
        <Animated.View
          style={{ flex: 1, transform: [{ scale: wishlistBtnScale }] }}
        >
          <Pressable
            onPress={handleWishlist}
            onPressIn={() => animateWishlist(0.96)}
            onPressOut={() => animateWishlist(1)}
            disabled={isWishlistBusy}
            style={[
              styles.cartBtn,
              {
                backgroundColor: colors.light,
                borderWidth: 1.5,
                borderColor: colors.primary,
              },
            ]}
          >
            {isWishlistBusy ? (
              <View style={styles.loaderRow}>
                <Animated.View
                  style={[
                    styles.circle,
                    {
                      borderColor: colors.primary,
                      borderTopColor: "transparent",
                      transform: [{ rotate }],
                    },
                  ]}
                />
                <Text style={[styles.cartText, { color: colors.primary }]}>
                  {wishlistId ? "Removing..." : "Adding..."}
                </Text>
              </View>
            ) : (
              <>
                <Heart
                  size={18}
                  color={colors.primary}
                  fill={isWishlisted ? colors.primary : "transparent"}
                />
                <Text style={[styles.cartText, { color: colors.primary }]}>
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Text>
              </>
            )}
          </Pressable>
        </Animated.View>

        {/* Cart */}
        <Animated.View
          style={{ flex: 1, transform: [{ scale: cartBtnScale }] }}
        >
          <Pressable
            onPress={handleCartPress}
            onPressIn={() => animateCart(0.96)}
            onPressOut={() => animateCart(1)}
            disabled={isCartBusy}
            style={[styles.cartBtn, { backgroundColor: colors.primary }]}
          >
            {isCartBusy ? (
              <View style={styles.loaderRow}>
                <Animated.View
                  style={[styles.circle, { transform: [{ rotate }] }]}
                />
                <Text style={styles.cartText}>{cartLabel}</Text>
              </View>
            ) : (
              <>
                <ShoppingCart size={18} color={colors.light} />
                <Text style={styles.cartText}>{cartLabel}</Text>
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
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.cardBorder,
  },
  disclaimerRow: {
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  cartBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
  },
  loaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.light,
    borderTopColor: "transparent",
  },
  cartText: {
    color: colors.light,
    fontWeight: "700",
    fontSize: 16,
  },
});

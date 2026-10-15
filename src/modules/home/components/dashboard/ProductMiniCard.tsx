import { Pressable } from "@/src/components/shared/Pressable";
import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";

export const PRODUCT_CARD_WIDTH = 138;
const IMAGE_HEIGHT = 110;

type ProductMiniCardProps = {
  productId: string | number;
  name: string;
  thumbnail?: string;
  price: number;
  originalPrice?: number;
  badgeLabel?: string | null;
  footNote?: string | null;
};

export default function ProductMiniCard({
  productId,
  name,
  thumbnail,
  price,
  originalPrice,
  badgeLabel,
  footNote,
}: ProductMiniCardProps) {
  const showStrike = !!originalPrice && originalPrice > price;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
          params: { productId: String(productId) },
        })
      }
      style={({ pressed }) => [
        {
          width: PRODUCT_CARD_WIDTH,
          borderRadius: 18,
          borderCurve: "continuous",
          backgroundColor: cardTokens.surface,
          overflow: "hidden",
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          width: PRODUCT_CARD_WIDTH,
          height: IMAGE_HEIGHT,
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        {thumbnail ? (
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}

        {badgeLabel ? (
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              paddingHorizontal: 7,
              paddingVertical: 3,
              borderRadius: 999,
              backgroundColor: chartTokens.accent,
            }}
          >
            <Text
              style={[
                typography.Poppins_xs_semibold,
                { color: "#FFFFFF", fontSize: 10.5 },
              ]}
            >
              {badgeLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={2}
          style={[
            typography.Poppins_xs_medium,
            {
              color: cardTokens.inkPrimary,
              fontSize: 14,
              lineHeight: 20,
              minHeight: 32,
            },
          ]}
        >
          {name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 6,
            gap: 6,
          }}
        >
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary, fontSize: 16 },
            ]}
          >
            ₹{Math.round(price)}
          </Text>
          {showStrike ? (
            <Text
              style={[
                typography.Poppins_xs_regular,
                {
                  color: cardTokens.inkMuted,
                  fontSize: 13,
                  textDecorationLine: "line-through",
                },
              ]}
            >
              ₹{Math.round(originalPrice as number)}
            </Text>
          ) : null}
        </View>

        {footNote ? (
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 13, marginTop: 4 },
            ]}
          >
            {footNote}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

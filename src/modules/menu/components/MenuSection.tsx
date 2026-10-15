import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { MenuGroup } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type MenuSectionProps = {
  group: MenuGroup;
};

/** Fallback icon fills for rows without their own tint (API pages). */
const TINTS = [
  "#EAF5E4",
  "#E6F3FC",
  "#FFF4E5",
  "#FCE8F0",
  "#F1ECFA",
  "#FFF8E1",
];

/**
 * Flat grouped list: a white panel with a faint outline (no shadow), pastel
 * icon tiles and a light chevron chip.
 */
export default function MenuSection({ group }: MenuSectionProps) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text
        style={[
          typography.Poppins_xs_semibold,
          {
            color: cardTokens.inkMuted,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            marginBottom: 10,
            marginLeft: 4,
          },
        ]}
      >
        {group.title}
      </Text>

      <View
        style={{
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          backgroundColor: cardTokens.surface,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          overflow: "hidden",
        }}
      >
        {group.routes.map((route, index) => {
          const Icon = route.icon;
          const isLast = index === group.routes.length - 1;
          const tint = route.tint ?? TINTS[index % TINTS.length];

          return (
            <Pressable
              key={route.screen}
              onPress={() => router.push(`${route.screen}`)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: pressed
                  ? cardTokens.mutedSurface
                  : "transparent",
              })}
            >
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  borderCurve: "continuous",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: tint,
                }}
              >
                {route.art ? (
                  <SvgXml xml={route.art} width={28} height={28} />
                ) : (
                  <Icon
                    size={20}
                    color={chartTokens.current}
                    strokeWidth={1.9}
                  />
                )}
              </View>

              <View style={{ flex: 1, marginLeft: 14, marginRight: 8 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_semibold,
                    { color: cardTokens.inkPrimary },
                  ]}
                >
                  {route.label}
                </Text>
                {route.hint ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkMuted, marginTop: 1 },
                    ]}
                  >
                    {route.hint}
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <ChevronRight
                  size={16}
                  strokeWidth={2.2}
                  color={cardTokens.inkSecondary}
                />
              </View>

              {/* Divider inset past the icon tile */}
              {!isLast ? (
                <View
                  style={{
                    position: "absolute",
                    left: 74,
                    right: 14,
                    bottom: 0,
                    height: 1,
                    backgroundColor: colors.cardBorder,
                  }}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

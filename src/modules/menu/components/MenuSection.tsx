import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { MenuGroup } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@/src/components/shared/Pressable";

type MenuSectionProps = {
  group: MenuGroup;
};

export default function MenuSection({ group }: MenuSectionProps) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text
        style={[
          typography.Poppins_xs_medium,
          {
            color: cardTokens.inkMuted,
            fontSize: 11,
            marginBottom: 8,
            marginLeft: 4,
          },
        ]}
      >
        {group.title}
      </Text>

      <View
        style={[
          {
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.border,
            backgroundColor: cardTokens.surface,
            overflow: "hidden",
          },
          cardShadow,
        ]}
      >
        {group.routes.map((route, index) => {
          const Icon = route.icon;
          const isLast = index === group.routes.length - 1;

          return (
            <Pressable
              key={route.screen}
              onPress={() => router.push(`${route.screen}`)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
                backgroundColor: pressed
                  ? cardTokens.mutedSurface
                  : cardTokens.surface,
              })}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                {route.art ? (
                  <SvgXml xml={route.art} width={24} height={24} />
                ) : (
                  <Icon size={17} color={chartTokens.current} strokeWidth={1.9} />
                )}
              </View>

              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_s_medium,
                  {
                    color: cardTokens.inkPrimary,
                    flex: 1,
                    fontSize: 14,
                    marginLeft: 12,
                  },
                ]}
              >
                {route.label}
              </Text>

              <ChevronRight size={17} color={cardTokens.inkMuted} />

              {/* Hairline divider inset past the icon, Airbnb-style */}
              {!isLast ? (
                <View
                  style={{
                    position: "absolute",
                    left: 64,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    backgroundColor: cardTokens.border,
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

import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { exploreArt, menuArt, shoppingArt } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type Shortcut = {
  label: string;
  art: string;
  /** Pastel tile behind the icon. */
  tint: string;
  route: string;
};

// Shortcuts to the screens Home has no other way into.
const SHORTCUTS: Shortcut[] = [
  {
    label: "Community",
    art: menuArt.discussion,
    tint: "#E9F7EF",
    route: ROUTES.Discussion.discussionForum,
  },
  {
    label: "Dashboard",
    art: exploreArt.dashboard,
    tint: "#EEF3E8",
    route: ROUTES.DASHBOARD.MAIN,
  },
  {
    label: "My Orders",
    art: menuArt.orders,
    tint: "#FFEDE8",
    route: ROUTES.ORDERS.LIST,
  },
  {
    label: "Cart",
    art: shoppingArt.cart,
    tint: "#EAF5E4",
    route: ROUTES.SHOPPING.CART,
  },
];

export default function ExploreGrid() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 14,
      }}
    >
      {SHORTCUTS.map((shortcut) => (
        <Pressable
          key={shortcut.label}
          onPress={() => router.push(shortcut.route as any)}
          accessibilityRole="button"
          accessibilityLabel={shortcut.label}
          style={({ pressed }) => ({
            width: "23%",
            alignItems: "center",
            opacity: pressed ? 0.75 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          })}
        >
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 18,
              borderCurve: "continuous",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: shortcut.tint,
            }}
          >
            <SvgXml xml={shortcut.art} width={36} height={36} />
          </View>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_medium,
              { color: cardTokens.inkPrimary, fontSize: 11, marginTop: 6 },
            ]}
          >
            {shortcut.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

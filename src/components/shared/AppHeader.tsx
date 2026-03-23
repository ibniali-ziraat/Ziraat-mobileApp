// components/AppHeader.tsx

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { useCart } from "@/src/modules/products/hooks/data/useCart";
import { useWishlist } from "@/src/modules/wishlist/hooks/useWishlist";
import { router } from "expo-router";
import {
  BarChart2,
  Bell,
  Cog,
  Heart,
  PhoneCall,
  ShoppingCart,
} from "lucide-react-native";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

export type HeaderVariant = "home" | "menu" | "products" | "orchards";

interface AppHeaderProps {
  variant: HeaderVariant;
}

// --- Shared sub-components ---

const IconButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    className="p-2.5 rounded-full bg-white border"
    style={({ pressed }) => ({
      borderColor: colors.neutral,
      opacity: pressed ? 0.6 : 1,
    })}
  >
    {children}
  </Pressable>
);

const Badge = ({ count }: { count: number }) =>
  count > 0 ? (
    <View className="absolute -top-1 -right-1 bg-primary h-5 w-5 rounded-full items-center justify-center">
      <CsText style={[typography.Poppins_xs_medium, { color: colors.light }]}>
        {count}
      </CsText>
    </View>
  ) : null;

// --- Variant content ---

const HomeContent = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);
  const title = data?.fullName ?? "Ziraat";

  return (
    <View
      className="w-full bg-white flex-row items-center justify-between pt-4"
      style={{ borderBottomColor: colors.neutral }}
    >
      <View>
        <CsText className="text-md" style={[typography.Poppins_m_semibold]}>
          Welcome
        </CsText>
        <CsText style={[{ color: colors.dark }, typography.Poppins_m_regular]}>
          {title.toUpperCase()}
        </CsText>
      </View>

      <View className="flex-row items-center">
        <Pressable
          className="p-2 mr-3 rounded-full border"
          style={{ borderColor: colors.neutral }}
          onPress={() => router.push({ pathname: ROUTES.DASHBOARD.MAIN })}
        >
          <BarChart2 size={20} color={colors.secondary} />
        </Pressable>

        <Pressable
          onPress={() => router.push(ROUTES.NOTIFICATIONS)}
          className="p-2 mr-3 rounded-full border"
          style={{ borderColor: colors.neutral }}
        >
          <Bell size={24} color={colors.secondary} />
        </Pressable>

        <Pressable onPress={() => router.push(ROUTES.ACCOUNT.PROFILE)}>
          <View className="w-10 h-10 rounded-full items-center justify-center bg-secondary">
            <CsText className="text-white font-bold uppercase text-lg">
              {data?.fullName ? data.fullName.charAt(0) : "U"}
            </CsText>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const MenuContent = () => (
  <View className="flex-row items-center justify-between py-4">
    <View>
      <CsText style={[typography.Poppins_l_semibold, { color: colors.dark }]}>
        Menu
      </CsText>
      <CsText style={[typography.Poppins_s_regular, { color: colors.neutral }]}>
        Explore features and settings
      </CsText>
    </View>

    <View className="flex-row items-center gap-3">
      <IconButton onPress={() => console.log("Call Expert")}>
        <PhoneCall size={20} color={colors.primary} />
      </IconButton>
      <IconButton onPress={() => router.push({ pathname: ROUTES.SETTINGS })}>
        <Cog size={20} color={colors.dark} />
      </IconButton>
    </View>
  </View>
);

const ProductsContent = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = cart?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  return (
    <View className="flex-row items-center justify-between h-16 px-4">
      <View>
        <CsText
          style={[typography.Poppins_m_semibold, { color: colors.dark }]}
          className="text-lg"
        >
          Products
        </CsText>
        <CsText
          style={[typography.Poppins_xs_regular, { color: colors.dark }]}
          className="text-neutral"
        >
          Shop fertilizers, Tools & Supplies
        </CsText>
      </View>

      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={() => router.push(ROUTES.SHOPPING.WISHLIST)}
          className="p-2 relative mr-2"
        >
          <Heart size={24} color={colors.secondary} />
          <Badge count={wishlistCount} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(ROUTES.SHOPPING.CART)}
          className="p-2 relative"
        >
          <ShoppingCart size={24} color={colors.primary} />
          <Badge count={cartCount} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrchardsContent = () => (
  <View className="flex-row items-center justify-between h-16 px-4">
    <View>
      <CsText
        style={[typography.Poppins_m_semibold, { color: colors.dark }]}
        className="text-lg"
      >
        My Orchards
      </CsText>
      <CsText
        style={[typography.Poppins_xs_regular, { color: colors.dark }]}
        className="text-neutral"
      >
        Manage and view your orchards
      </CsText>
    </View>
  </View>
);

// --- Variant map ---

const VARIANT_MAP: Record<HeaderVariant, React.FC> = {
  home: HomeContent,
  menu: MenuContent,
  products: ProductsContent,
  orchards: OrchardsContent,
};

// --- Main component ---

const AppHeader = ({ variant }: AppHeaderProps) => {
  const Content = VARIANT_MAP[variant];
  return (
    <ScreenContent className="bg-light">
      <Content />
    </ScreenContent>
  );
};

export default React.memo(AppHeader);

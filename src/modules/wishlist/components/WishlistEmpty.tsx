import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";

interface WishlistEmptyProps {
  onStartShopping: () => void;
}

const WishlistEmpty = ({ onStartShopping }: WishlistEmptyProps) => {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: colors.light }} className="flex-1">
      <BackHeader title="My Wishlist" desc="Your saved items" />

      <View className="flex-1 justify-center items-center px-12">
        <Image
          source={require("@/assets/images/empty-wishlist.png")}
          style={{ width: 110, height: 110 }}
          resizeMode="contain"
        />

        {/* Header Text */}
        <Text style={[typography.Poppins_l_semibold, { marginTop: 20 }]}>
          Your wishlist is empty
        </Text>

        <Text
          style={[
            typography.Poppins_m_regular,
            {
              textAlign: "center",
              marginTop: 8,
              marginBottom: 32,
              opacity: 0.6,
            },
          ]}
        >
          Save products you love and find them easily here.
        </Text>

        <Pressable
          style={{ backgroundColor: colors.primary, width: "100%" }}
          onPress={onStartShopping}
          className="py-4 rounded-full items-center active:scale-95"
        >
          <Text
            style={[typography.Poppins_m_semibold, { color: colors.light }]}
          >
            Browse Products
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(ROUTES.TABS.PRODUCTS)}
          className="mt-4 py-2 active:opacity-60"
        >
          <Text
            style={[typography.Poppins_m_medium, { color: colors.primary }]}
          >
            View My Cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WishlistEmpty;

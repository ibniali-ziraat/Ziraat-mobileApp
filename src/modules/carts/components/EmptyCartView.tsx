import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  onStartShopping: () => void;
};

const EmptyCartView = ({ onStartShopping }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Image
        source={require("@/assets/images/empty-wishlist.png")}
        style={{ width: 90, height: 90 }}
      />

      <Text style={typography.Poppins_m_semibold}>
        Your cart is empty
      </Text>

      <Text
        style={[
          typography.Poppins_s_regular,
          { opacity: 0.6 },
        ]}
      >
        Add items to continue shopping
      </Text>

      <Pressable
        onPress={onStartShopping}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 999,
          marginTop: 16,
        }}
      >
        <Text style={{ color: colors.light }}>
          Browse Products
        </Text>
      </Pressable>
    </View>
  );
};

export default EmptyCartView;
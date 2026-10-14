import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shoppingArt } from "@/src/constants/iconArt";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

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
      <SvgXml xml={shoppingArt.emptyCart} width={150} height={150} />

      <Text style={[typography.Poppins_m_semibold, { marginTop: 18 }]}>
        Your cart is empty
      </Text>

      <Text
        style={[
          typography.Poppins_s_regular,
          { opacity: 0.6, marginTop: 4 },
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
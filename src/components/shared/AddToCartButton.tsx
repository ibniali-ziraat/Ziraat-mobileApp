import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ShoppingCart } from "lucide-react-native";
import { Pressable, View } from "react-native";
import CsText from "./CsText";
import ZiraatCard from "./ZiraatProfileCard";

type Props = {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger";
};

export default function AddToCartButton({
  title = "Add to Cart",
  onPress,
  disabled,
  variant = "primary",
}: Props) {
  const bgColor =
    variant === "danger" ? colors.dangerLight : colors.secondaryLight;

  return (
    <ZiraatCard width="100%">
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={`py-3 rounded-lg flex-row justify-center items-center ${
          disabled ? "opacity-50" : ""
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <View className="flex-row justify-center items-center w-full">
          <ShoppingCart size={20} color={colors.secondary} />
          <CsText
            className="text-dark flex-shrink ml-2"
            style={[typography.Poppins_s_medium]}
            numberOfLines={1}
          >
            {title}
          </CsText>
        </View>
      </Pressable>
    </ZiraatCard>
  );
}

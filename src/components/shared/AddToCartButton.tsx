import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ShoppingCart } from "lucide-react-native";
import { ActivityIndicator, Pressable } from "react-native";
import CsText from "./CsText";

type Props = {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "danger";
};

export default function AddToCartButton({
  title = "Add to Cart",
  onPress,
  disabled,
  loading = false,
  variant = "primary",
}: Props) {
  const bg = variant === "danger" ? colors.dangerLight : colors.secondaryLight;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className="h-12 rounded-xl flex-row items-center justify-center"
      style={{
        backgroundColor: bg,
        opacity: disabled || loading ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.dark} />
      ) : (
        <>
          <ShoppingCart size={14} color={colors.secondary} />

          <CsText
            style={[typography.Poppins_s_semibold, { color: colors.secondary }]}
            className="ml-2"
          >
            {title}
          </CsText>
        </>
      )}
    </Pressable>
  );
}

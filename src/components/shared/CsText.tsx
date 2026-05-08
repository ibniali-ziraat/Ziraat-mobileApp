import { TextVariant, typography } from "@/src/constants/fonts/typography";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
}

export default function CsText({
  variant = "description",
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[typography[variant], style]}
    />
  );
}

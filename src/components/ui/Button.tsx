// src/components/ui/Button.tsx
import { colors } from "@/src/constants/colors";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.neutral : colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Text
        style={{
          color: colors.light,
          fontSize: 17,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

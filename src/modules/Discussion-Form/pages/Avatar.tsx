import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

type AvatarProps = {
  name: string;
  size?: number;
  fontSize?: number;
};

export default function Avatar({
  name,
  size = 28,
  fontSize = 12,
}: AvatarProps) {
  const initials = (name || "U")[0].toUpperCase();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize,
          color: colors.light,
          fontWeight: "800",
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
// src/components/ui/Loader.tsx
import { colors } from "@/src/constants/colors";
import { ActivityIndicator, View } from "react-native";

interface LoaderProps {
  visible: boolean;
}

export default function Loader({ visible }: LoaderProps) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backgroundColor: "transparent", // no overlay
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

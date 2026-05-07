import { colors } from "@/src/constants/colors";
import { ArrowUp } from "lucide-react-native";
import { Pressable, View } from "react-native";

interface ScrollToTopButtonProps {
  onPress: () => void;
}

export default function ScrollToTopButton({ onPress }: ScrollToTopButtonProps) {
  return (
    <View style={{ position: "absolute", bottom: 30, right: 20 }}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 100,
          elevation: 10,
        }}
      >
        <ArrowUp size={18} color={colors.light} />
      </Pressable>
    </View>
  );
}

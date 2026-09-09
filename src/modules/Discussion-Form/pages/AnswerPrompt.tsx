import { MessageSquarePlus } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import { colors } from "@/src/constants/colors";

type Props = {
  onPress: () => void;
};

// Fixed, icon-only entry point for answering — replaces the old big
// always-open composer, which took up too much of the screen by default.
export default function AnswerPrompt({ onPress }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        accessibilityLabel="Answer this question"
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary,
        }}
      >
        <MessageSquarePlus size={22} color={colors.light} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
}

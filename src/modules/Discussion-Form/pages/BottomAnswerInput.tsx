import { SendHorizonal, X } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

import { colors } from "@/src/constants/colors";

type Props = {
  input: string;
  setInput: (text: string) => void;
  handleAnswer: () => void;
  isPending: boolean;
  onCancel: () => void;
};

// A single simple row — no header label, no footer copy, just the input
// and the two actions either side of it.
export default function BottomAnswerInput({
  input,
  setInput,
  handleAnswer,
  isPending,
  onCancel,
}: Props) {
  const canPost = input.trim() && !isPending;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: colors.light,
        borderTopWidth: 1,
        borderTopColor: colors.cardBorder,
      }}
    >
      <TextInput
        placeholder="Write an answer..."
        placeholderTextColor={colors.overlay}
        value={input}
        onChangeText={setInput}
        multiline
        autoFocus
        style={{
          flex: 1,
          minHeight: 60,
          maxHeight: 140,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          borderRadius: 22,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 15.5,
          lineHeight: 21,
          color: colors.dark,
          backgroundColor: colors.bgColor,
        }}
      />

      <TouchableOpacity
        onPress={onCancel}
        hitSlop={8}
        style={{
          width: 40,
          height: 52,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={18} color={colors.overlay} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAnswer}
        disabled={!canPost}
        activeOpacity={0.88}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: canPost ? colors.primary : colors.overlay + "15",
        }}
      >
        <SendHorizonal
          size={19}
          color={canPost ? colors.light : colors.overlay}
          strokeWidth={2.4}
        />
      </TouchableOpacity>
    </View>
  );
}

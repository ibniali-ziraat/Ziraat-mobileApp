

import { colors } from "@/src/constants/colors";
import { Send } from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function DiscussionInput() {
  const [text, setText] = useState("");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.bgColor,
        borderRadius: 25,
        paddingHorizontal: 12,
      }}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write a comment..."
        placeholderTextColor={colors.darkHover}
        style={{
          flex: 1,
          paddingVertical: 10,
          color: colors.dark,
        }}
      />

      <TouchableOpacity>
        <Send size={18} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
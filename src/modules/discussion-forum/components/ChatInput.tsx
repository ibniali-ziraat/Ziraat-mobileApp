// components/discussion/DiscussionInput.tsx

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DiscussionInput() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type your question..."
        placeholderTextColor={colors.gray400}
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={styles.send}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 16,
    ...typography.body,
    color: colors.textPrimary,
  },
  send: {
    marginLeft: 10,
    ...typography.semibold,
    color: colors.primary,
  },
});
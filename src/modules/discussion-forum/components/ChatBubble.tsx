// components/discussion/DiscussionBubble.tsx

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { StyleSheet, Text, View } from "react-native";

export default function DiscussionBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.user : styles.expert,
      ]}
    >
      <Text style={isUser ? styles.userText : styles.text}>
        {message.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  expert: {
    alignSelf: "flex-start",
    backgroundColor: colors.gray100,
    borderBottomLeftRadius: 4,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
  },
  userText: {
    ...typography.body,
    color: colors.white,
  },
});
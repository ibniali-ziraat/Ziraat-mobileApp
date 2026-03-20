// components/discussion/DiscussionHeader.tsx

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DiscussionHeader({ onClose }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Expert Support</Text>
        <Text style={styles.status}>● Online</Text>
      </View>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    ...typography.semibold,
    color: colors.textPrimary,
  },
  status: {
    ...typography.caption,
    color: colors.success,
  },
  close: {
    ...typography.medium,
    color: colors.primary,
  },
});
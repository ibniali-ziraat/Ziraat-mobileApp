import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  count: number;
  onClearAll: () => void;
}

export default function NotificationHeader({ count, onClearAll }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.sub}>
          {count > 0
            ? `${count} message${count !== 1 ? "s" : ""}`
            : "You're all caught up"}
        </Text>
      </View>

      {count > 0 && (
        <Pressable onPress={onClearAll} style={styles.clearBtn}>
          <Trash2 size={14} color={colors.error} />
          <Text style={styles.clearText}>Clear all</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.dark,
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 13,
    color: colors.darkHover,
    marginTop: 2,
    fontWeight: "500",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  clearText: {
    fontSize: 13,
    color: colors.error,
    fontWeight: "600",
  },
});

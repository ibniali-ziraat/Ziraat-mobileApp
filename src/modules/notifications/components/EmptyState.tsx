import { colors } from "@/src/constants/colors";
import { Bell } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Bell size={40} color={colors.darkHover} strokeWidth={1.2} />
      <Text style={styles.title}>No notifications</Text>
      <Text style={styles.sub}>You're all caught up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkHover,
    marginTop: 4,
  },
  sub: {
    fontSize: 13.5,
    color: colors.darkHover,
    fontWeight: "400",
  },
});

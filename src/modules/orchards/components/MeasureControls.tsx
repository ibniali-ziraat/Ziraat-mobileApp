import { colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MeasureControls({
  unit,
  onPrimary,
  onReset,
  primaryLabel,
}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>

      <Pressable style={styles.primaryButton} onPress={onPrimary}>
        <Text style={styles.primaryText}>{primaryLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },

  resetButton: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  resetText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "500",
  },

  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "500",
  },
});

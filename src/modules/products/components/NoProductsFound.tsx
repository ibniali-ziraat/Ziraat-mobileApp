// components/NoProductsFound.tsx
import { colors } from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function NoProductsFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={styles.title}>No Products Found</Text>
      <Text style={styles.subtitle}>
        Try adjusting your filters or search terms
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 10,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.neutral,
  },
  subtitle: {
    fontSize: 14,
    color: colors.darkHover,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

import { colors } from "@/src/constants/colors";
import { MapPin } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
}

export default function LocationBanner({ visible }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.row}>
      <MapPin size={12} color={colors.warning} />
      <Text style={styles.text}>
        Location off —{" "}
        <Text style={styles.bold}>weather alerts may not be accurate</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.warning + "18",
    borderRadius: 10,
  },
  text: {
    fontSize: 12.5,
    color: colors.warning,
    fontWeight: "500",
    flex: 1,
  },
  bold: {
    fontWeight: "700",
    color: colors.warning,
  },
});

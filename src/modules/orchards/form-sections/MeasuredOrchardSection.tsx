import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Map } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function MeasuredOrchardSection() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingBottom: 16,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 20 }}>
        <Pressable
          onPress={() =>
            router.push(ROUTES.ORCHARDS.MEASUREMENT.MEASURE_BY_TAP)
          }
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            paddingVertical: 10,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Map size={18} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>Tap Measure</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            router.push(ROUTES.ORCHARDS.MEASUREMENT.MEASURE_BY_WALK)
          }
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingVertical: 10,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            borderWidth: 1,
            borderColor: colors.primary,
          }}
        >
          <Map size={18} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            Walk Measure
          </Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
        Approximate value. GPS measurements may have inaccuracy of ±3–5 meters.
      </Text>
    </View>
  );
}

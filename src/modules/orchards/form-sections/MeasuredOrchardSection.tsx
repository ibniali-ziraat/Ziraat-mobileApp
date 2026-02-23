import { colors } from "@/src/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { Map } from "lucide-react-native";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function MeasuredOrchardSection() {
  const params = useLocalSearchParams();
  const { setValue } = useFormContext();

  const measuredKanals = Number(params?.kanals ?? 0);
  const measuredMarlas = Number(params?.marlas ?? 0);
  const totalMarlas = measuredKanals * 20 + measuredMarlas;

  useEffect(() => {
    if (!params?.kanals && !params?.marlas) return;

    setValue("marlas", String(measuredMarlas), {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("kanals", "");
    setValue("orchardSize.mode", "measure");
  }, [params]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingBottom: 16,
        gap: 12,
        // paddingVertical: 18,
      }}
    >
      {totalMarlas > 0 && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#555" }}>
            Measured Area:{" "}
            <Text style={{ fontWeight: "700", color: colors.primary }}>
              ≈ {measuredMarlas} Marlas
            </Text>{" "}
            <Text style={{ color: "#777" }}>(≈ {measuredKanals} Kanals)</Text>
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 20 }}>
        <Pressable
          onPress={() => router.push("/orchards/tap-measure")}
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
          onPress={() => router.push("/orchards/walk-measure")}
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

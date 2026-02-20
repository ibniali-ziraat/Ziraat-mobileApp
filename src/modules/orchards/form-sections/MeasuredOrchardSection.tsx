import { colors } from "@/src/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { Map } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function MeasuredOrchardSection() {
  const params = useLocalSearchParams();
  const { setValue, control } = useFormContext();

  const orchardUnit = useWatch({
    control,
    name: "orchardUnit",
  });

  const hydrated = useRef(false);

  //--------------------------------------------------
  // Only fill value based on selected unit
  //--------------------------------------------------

  useEffect(() => {
    if (!params || !orchardUnit || hydrated.current) return;

    const kanals = params?.kanals;
    const marlas = params?.marlas;

    if (orchardUnit === "kanals" && kanals) {
      hydrated.current = true;
      setValue("kanals", kanals, { shouldValidate: true });
    }

    if (orchardUnit === "marlas" && marlas) {
      hydrated.current = true;
      setValue("marlas", marlas, { shouldValidate: true });
    }
  }, [params, orchardUnit]);

  //--------------------------------------------------
  // Display Row
  //--------------------------------------------------

  const Row = ({ label, value, unit }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ color: "#666" }}>{label}</Text>
      <Text style={{ fontWeight: "600" }}>
        {value || "--"} {unit}
      </Text>
    </View>
  );

  //--------------------------------------------------
  // UI
  //--------------------------------------------------

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Measured Orchard Size
        </Text>

        {/* Map Button */}
        <Pressable
          onPress={() => {
            if (!orchardUnit) {
              alert("Please select unit first");
              return;
            }
            router.push("/orchards/tap-measure");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Map size={18} color={colors.primary} />
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
            }}
          >
            Measure
          </Text>
        </Pressable>
      </View>

      {/* Show measured values */}
      <Row label="Kanals" value={params?.kanals} unit="kanals" />
      <Row label="Marlas" value={params?.marlas} unit="marlas" />
    </View>
  );
}

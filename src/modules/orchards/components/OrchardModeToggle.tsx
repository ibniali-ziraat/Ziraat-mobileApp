import { colors } from "@/src/constants/colors";
import { ToggleLeft, ToggleRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function OrchardModeToggle({ mode, onChange }) {
  const isMeasure = mode === "measure";

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: "600",
        }}
      >
        Orchard Size Method
      </Text>

      <Pressable
        onPress={() => onChange(isMeasure ? "manual" : "measure")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        {isMeasure ? (
          <ToggleRight size={32} color={colors.primary} />
        ) : (
          <ToggleLeft size={32} color="#aaa" />
        )}

        <Text
          style={{
            fontWeight: "600",
            color: colors.primary,
          }}
        >
          {isMeasure ? "Measure" : "Manual"}
        </Text>
      </Pressable>
    </View>
  );
}

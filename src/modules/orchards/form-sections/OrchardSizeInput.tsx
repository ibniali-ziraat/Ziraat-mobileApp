import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { colors } from "@/src/constants/colors";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function OrchardSizeInput({
  errors,
  measuredValue,
  areaLabel,
  areaUnit,
}) {
  return (
    <View
      style={{
        backgroundColor: colors.light,
        borderRadius: 14,
        marginBottom: 16,
        shadowColor: colors.cardShadow,
        shadowOpacity: 0.15,
        shadowRadius: 6,
      }}
    >
      <FormTextInput
        name="orchardSize.value"
        label={`Orchard Size`}
        // label={`Orchard Size `}
        type="pincode"
        disabled={true}
        required
        errors={errors?.orchardSize}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 0,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
        <Text
          style={{
            marginHorizontal: 8,
            fontSize: 14,
            color: colors.neutral,
            marginBottom: 30,
          }}
        >
          OR
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => router.push("/orchards/walk-measure")}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.light, textAlign: "center" }}>
            Measure by Walking
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/orchards/tap-measure")}
          style={{
            flex: 1,
            backgroundColor: colors.secondary,
            paddingVertical: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.light, textAlign: "center" }}>
            Measure by Tap
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

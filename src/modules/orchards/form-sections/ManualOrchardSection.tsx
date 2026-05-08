import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { View } from "react-native";

export default function ManualOrchardSection({ errors }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
      }}
    >
      <FormTextInput
        name="orchardSize.value"
        label="Enter size in Marla"
        required
        error={errors?.orchardSize?.value}
      />
    </View>
  );
}

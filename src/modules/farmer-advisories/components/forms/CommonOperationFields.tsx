import ChipInput from "@/src/components/form/inputs/ChipInput";
import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Trash2 } from "lucide-react-native";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { UNITS } from "../../constants/advisoryOptions";
import AddRowButton from "./AddRowButton";
import AdvisorySection from "../AdvisorySection";
import { getFieldError } from "./getFieldError";
import QuantityInput from "./QuantityInput";

// Fields every operation (spray, fertigation, pruning, harvest) sends
export function OperationBasicsFields() {
  return (
    <AdvisorySection title="When & where" description="Date and area covered">
      <FormDateInput name="operationDate" label="Operation date" />
      <QuantityInput name="coverage" label="Area covered" units={UNITS.coverage} />
    </AdvisorySection>
  );
}

export function LabourAndCostFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const equipmentHours = useFieldArray({ control, name: "equipmentHours" });

  return (
    <AdvisorySection title="Labour, equipment & cost" description="All optional">
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <FormTextInput
            name="labourHours"
            label="Labour hours"
            type="number"
            placeholder="0"
            error={getFieldError(errors, "labourHours")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormTextInput
            name="numberOfLabourers"
            label="Labourers"
            type="number"
            placeholder="0"
            error={getFieldError(errors, "numberOfLabourers")}
          />
        </View>
      </View>

      <ChipInput
        name="equipmentUsed"
        label="Equipment used"
        placeholder="e.g. Sprayer"
        required={false}
      />

      <Text
        style={[
          typography.Poppins_s_medium,
          { color: cardTokens.inkPrimary, marginTop: 8, marginBottom: 8 },
        ]}
      >
        Equipment hours
      </Text>

      {equipmentHours.fields.map((field, index) => (
        <View
          key={field.id}
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}
        >
          <View style={{ flex: 1 }}>
            <FormTextInput
              name={`equipmentHours.${index}.equipment`}
              label="Equipment"
              placeholder="e.g. Tractor"
              error={getFieldError(errors, `equipmentHours.${index}.equipment`)}
            />
          </View>
          <View style={{ width: 96 }}>
            <FormTextInput
              name={`equipmentHours.${index}.hours`}
              label="Hours"
              type="number"
              placeholder="0"
              error={getFieldError(errors, `equipmentHours.${index}.hours`)}
            />
          </View>
          <Pressable
            onPress={() => equipmentHours.remove(index)}
            hitSlop={8}
            style={{ marginTop: 40 }}
          >
            <Trash2 size={18} color={colors.error} />
          </Pressable>
        </View>
      ))}

      <AddRowButton
        label="Add equipment hours"
        onPress={() => equipmentHours.append({ equipment: "", hours: "" })}
      />

      <View style={{ marginTop: 18 }}>
        <FormTextInput
          name="cost"
          label="Total cost (₹)"
          type="number"
          placeholder="0"
          error={getFieldError(errors, "cost")}
        />
        <FormTextAreaInput
          name="notes"
          label="Notes"
          placeholder="Anything else worth recording"
          maxLength={500}
          error={getFieldError(errors, "notes")}
        />
      </View>
    </AdvisorySection>
  );
}

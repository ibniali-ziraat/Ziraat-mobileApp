import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { getFieldError } from "./getFieldError";

type QuantityInputProps = {
  name: string; // form path of a { value, unit } object, e.g. "coverage"
  label: string;
  units: { label: string; value: string }[];
  required?: boolean;
};

// value + unit pair used by every Quantity field in the api
export default function QuantityInput({
  name,
  label,
  units,
  required = false,
}: QuantityInputProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
      <View style={{ flex: 1 }}>
        <FormTextInput
          name={`${name}.value`}
          label={label}
          type="number"
          placeholder="0"
          required={required}
          error={getFieldError(errors, `${name}.value`)}
        />
      </View>
      <View style={{ width: 128 }}>
        <SingleSelectInput
          name={`${name}.unit`}
          label="Unit"
          placeholder="Unit"
          modalLabel={`${label} unit`}
          options={units}
          optional={!required}
          matchTextInput
          error={getFieldError(errors, `${name}.unit`)}
        />
      </View>
    </View>
  );
}

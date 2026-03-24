import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";
import {
  certOpts,
  digitalToolOpt,
  GOVT_SCHEMES,
} from "../constants/orchardOptions";

export default function FutureFieldSection({ control, errors }: any) {
  return (
    <View className="bg-light w-full">
      <MultiSelectInput
        name="governmentSchemesAvailed"
        control={control}
        label="Government Schemes Available (optional)"
        placeholder="Government Schemes Available"
        options={GOVT_SCHEMES}
        error={errors?.governmentSchemesAvailed?.message}
        optional
      />

      <View className="mt-4">
        <SingleSelectInput
          control={control}
          name="isFpoOrCooperativeMember"
          label="FPO / Cooperative Membership (optional)"
          placeholder="FPO / Cooperative Membership"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={errors.isFpoOrCooperativeMember?.message}
          modalLabel="Select (if any)"
          optional
        />
      </View>

      <View className="mt-4">
        <MultiSelectInput
          name="certifications"
          control={control}
          label="Certifications (optional)"
          placeholder="Certifications"
          options={certOpts}
          error={errors?.certifications?.message}
          optional
        />
      </View>

      <View className="mt-4">
        <MultiSelectInput
          name="digitalToolsUsed"
          control={control}
          label="Digital Tools Used (optional)"
          placeholder="Digital Tools Used"
          options={digitalToolOpt}
          error={errors.digitalToolsUsed?.message}
          optional
        />
      </View>
    </View>
  );
}

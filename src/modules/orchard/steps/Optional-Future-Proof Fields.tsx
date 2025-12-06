import CheckboxGroup from "@/src/components/form/inputs/Checkbox";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { ScrollView, Text, View } from "react-native";


import {
  certificationOptions,
  digitalToolOptions,
  schemeOptions,
} from "@/src/schemas/orchard schemas/stepISchema";

export default function StepI_OptionalFutureFields({ control, errors }:any) {
  const schemeOpts = schemeOptions.map((x) => ({ label: x, value: x }));
  const certOpts = certificationOptions.map((x) => ({ label: x, value: x }));
  const toolOpts = digitalToolOptions.map((x) => ({ label: x, value: x }));

  return (
    <ScrollView className="flex-1 w-full">
      <Text className="text-2xl font-bold mb-4 text-center text-primary">
        Optional / Future-Proof Fields
      </Text>

      <View className="bg-light rounded-2xl p-5 shadow-md shadow-neutral w-full">
        <Text className="text-lg font-semibold mb-3 text-primary">
          Additional Optional Information
        </Text>

        <CheckboxGroup
          control={control}
          name="govtSchemes"
          label="Government Schemes Availed (Multi-select)"
          options={schemeOptions} 
          error={errors.govtSchemes?.message}
        />

        <FormInput
          control={control}
          name="fpoMembership"
          label="FPO / Cooperative Membership (Optional)"
          optional={true}
          icon="account-group"
          iconColor="secondary"
          error={errors.fpoMembership?.message}
        />

        <SingleSelectInput
          control={control}
          name="certifications"
          label="Certifications"
          options={certOpts}
          error={errors.certifications?.message}
        />

        <CheckboxGroup
          control={control}
          name="digitalTools"
          label="Digital Tools Used (Multi-select)"
          options={digitalToolOptions}
          error={errors.digitalTools?.message}
        />
      </View>
    </ScrollView>
  );
}

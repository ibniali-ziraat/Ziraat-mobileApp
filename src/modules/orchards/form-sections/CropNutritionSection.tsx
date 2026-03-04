import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import { View } from "react-native";
import { applicationModeOptions } from "../constants/orchardOptions";

export default function CropNutrition({ control, errors }) {
  const fertilizerOptions = ["Organic", "Chemical", "Integrated"];

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        <SingleSelectInput
          control={control}
          name="fertilizerPractices"
          label="Fertilizer Practices"
          options={fertilizerOptions.map((v) => ({ label: v, value: v }))}
          error={errors.fertilizerPractice?.message}
          modalLabel="Fertilizer Practices"
        />

        <SingleSelectInput
          control={control}
          name="hasFertigation"
          label="Fertigation Facility"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={errors.hasFertigationFacility?.message}
          modalLabel="Fertilizer Practices"
        />

        <SingleSelectInput
          control={control}
          name="isMulchingApplied"
          label="Mulching Applied"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={errors.isMulchingApplied?.message}
          modalLabel="Mulching Applied"
        />

        <FormDateInput
          control={control}
          name="lastFertilizerApplicationDate"
          label="Last Fertiliser Date"
          error={errors.lastFertilizerApplicationDate}
          optional={true}
        />

        {/* 6️⃣ Application Mode */}
        <SingleSelectInput
          control={control}
          name="fertilizerApplicationMode"
          label="Mode of Fertiliser Application"
          options={applicationModeOptions}
          error={errors.applicationMode?.message}
          modalLabel="Fertiliser Mode"
        />

        <FormTextAreaInput
          name="nutritionPlan"
          label="Nutrition Plan"
          placeholder="e.g. Jan: Organic compost, Mar: NPK fertilizer, Jun: Micronutrient spray"
          error={errors.nutritionPlan}
          maxLength={120}
          // required
        />
      </View>
    </View>
  );
}

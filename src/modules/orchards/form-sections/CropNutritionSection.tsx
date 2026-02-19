import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { View } from "react-native";

export default function CropNutrition({ control, errors }) {
  const fertilizerOptions = ["Organic", "Chemical", "Integrated"];

  const yesNoOptions = ["Yes", "No"];

  const applicationModeOptions = ["Soil Application", "Foliar Application"];

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

        <FormTextInput
          name="nutritionPlan"
          label="Nutrition Plan"
          icon="book-open-page-variant"
          error={errors.nutritionPlan}
          type="name"
          required
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
          options={applicationModeOptions.map((v) => ({ label: v, value: v }))}
          error={errors.applicationMode?.message}
          modalLabel="Fertiliser Mode"
        />
      </View>
    </View>
  );
}

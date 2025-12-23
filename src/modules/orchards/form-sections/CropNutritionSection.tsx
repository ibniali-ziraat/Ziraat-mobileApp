import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
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
          name="fertilizerPractice"
          label="Fertilizer Practices"
          options={fertilizerOptions.map((v) => ({ label: v, value: v }))}
          error={errors.fertilizerPractice?.message}
          modalLabel="Fertilizer Practices"
        />

        <SingleSelectInput
          control={control}
          name="fertilizerPractice"
          label="Fertilizer Practices"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors.fertilizerPractice?.message}
          modalLabel="Fertilizer Practices"
        />

        {/* <RadioGroup
          control={control}
          name="fertigation"
          label="Fertigation Facilities"
          options={yesNoOptions}
          error={errors.fertigation?.message}
        /> */}

        <FormInput
          control={control}
          name="nutritionPlan"
          label="Nutrition Plan"
          icon="book-open-page-variant"
          error={errors.nutritionPlan?.message}
        />

        {/* 4️⃣ Mulching */}
        {/* <RadioGroup
          control={control}
          name="mulching"
          label="Mulching"
          options={yesNoOptions}
          error={errors.mulching?.message}
        /> */}
        {/* 
        <SingleSelectInput
          control={control}
          name="nutritionPlan"
          label="Nutrition Plan"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors.nutritionPlan?.message}
          modalLabel="Nutrition Plan"
        /> */}

        {/* 5️⃣ Last Fertilizer Date */}

        <FormDateInput
          control={control}
          name="lastFertiliserDate"
          label="Last Fertiliser Application Date"
          error={errors.lastFertiliserDate?.message}
        />

        {/* 6️⃣ Application Mode */}
        <SingleSelectInput
          control={control}
          name="applicationMode"
          label="Mode of Fertiliser Application"
          options={applicationModeOptions.map((v) => ({ label: v, value: v }))}
          error={errors.applicationMode?.message}
          modalLabel="Fertiliser Mode"
        />
      </View>
    </View>
  );
}

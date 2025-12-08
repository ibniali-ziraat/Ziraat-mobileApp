import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import RadioGroup from "@/src/components/form/inputs/RadioButton";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { ScrollView, Text, View } from "react-native";

export default function CropNutrition({ control, errors }) {
  const fertilizerOptions = ["Organic", "Chemical", "Integrated"];

  const yesNoOptions = ["Yes", "No"];

  const applicationModeOptions = ["Soil Application", "Foliar Application"];

  return (
    <ScrollView className="flex-1 w-full">
      <Text className="text-2xl font-bold mb-4 text-center text-primary">
        Crop & Nutrition Management
      </Text>

      <View className="bg-light rounded-2xl p-5 shadow-md shadow-neutral w-full">
        {/* 1️⃣ Fertilizer Practice */}
        <SingleSelectInput
          control={control}
          name="fertilizerPractice"
          label="Fertilizer Practices"
          options={fertilizerOptions.map((v) => ({ label: v, value: v }))}
          error={errors.fertilizerPractice?.message}
        />

        {/* 2️⃣ Fertigation */}
        <RadioGroup
          control={control}
          name="fertigation"
          label="Fertigation Facilities"
          options={yesNoOptions}
          error={errors.fertigation?.message}
        />

        {/* 3️⃣ Nutrition Plan */}
        <FormInput
          control={control}
          name="nutritionPlan"
          label="Nutrition Plan"
          icon="book-open-page-variant"
          error={errors.nutritionPlan?.message}
        />

        {/* 4️⃣ Mulching */}
        <RadioGroup
          control={control}
          name="mulching"
          label="Mulching"
          options={yesNoOptions}
          error={errors.mulching?.message}
        />

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
        />
      </View>
    </ScrollView>
  );
}

import { useZodForm } from "@/src/hooks/useZodForm";
import { orchardSchema } from "@/src/schemas/orchard schemas/stepASchemas";
import { stepBBasicInfoSchema } from "@/src/schemas/orchard schemas/stepBSchema";
import { stepCSoilWaterSchema } from "@/src/schemas/orchard schemas/stepCSchema";
import { stepDCropNutritionSchema } from "@/src/schemas/orchard schemas/stepDSchema";
import { stepEPlantProtectionSchema } from "@/src/schemas/orchard schemas/stepESchema";
import { stepFFarmInfrastructureSchema } from "@/src/schemas/orchard schemas/stepFSchema";
import { stepGProductionMarketingSchema } from "@/src/schemas/orchard schemas/stepGSchema";
import { stepHInputCostDetailsSchema } from "@/src/schemas/orchard schemas/stepHScema";
import { stepIOptionalFutureFieldsSchema } from "@/src/schemas/orchard schemas/stepISchema";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button, ScrollView, View } from "react-native";
import StepA from "./steps/BasicInfo";
import StepD from "./steps/Crop & Nutrition Management";
import StepF from "./steps/Farm Infrastructure and Resources";
import StepH from "./steps/Input Cost Details";
import StepI from "./steps/Optional-Future-Proof Fields";
import StepE from "./steps/Plant Protection & Health";
import StepG from "./steps/Production & Marketing";
import StepC from "./steps/Soil and Water profile";
import StepB from "./steps/Variety & Planting Details ";

export default function OrchardRegistrationForm() {
  const [step, setStep] = useState(0);

  const schemas = [
    orchardSchema,
    stepBBasicInfoSchema,
    stepCSoilWaterSchema,
    stepDCropNutritionSchema,
    stepEPlantProtectionSchema,
    stepFFarmInfrastructureSchema,
    stepGProductionMarketingSchema,
    stepHInputCostDetailsSchema,
    stepIOptionalFutureFieldsSchema,
  
  ];

  const methods = useZodForm(schemas[step]);

 
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  const handleStepSubmit = async (values: any) => {
  if (step < schemas.length - 1) {
    setStep(step + 1);
  } else {
    console.log("Final submission:", values);
    router.push("/");
   
  }
};

  return (
    <FormProvider {...methods}>
      <ScrollView className="flex-1 bg-light w-full">
        <View>
          {step === 0 && <StepA control={control} errors={errors} />}
          {step === 1 && <StepB control={control} errors={errors} />}
          {step === 2 && <StepC control={control} errors={errors} />}
          {step === 3 && <StepD control={control} errors={errors} />}
          {step === 4 && <StepE control={control} errors={errors} />}
          {step === 5 && <StepF control={control} errors={errors} />}
          {step === 6 && <StepG control={control} errors={errors} />}
          {step === 7 && <StepH control={control} errors={errors} />}
          {step === 8 && <StepI control={control} errors={errors} />}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          {step > 0 && <Button title="Back" onPress={goToPreviousStep} />}

          <Button
            title={step === 8? "Save" : "Next"}
            onPress={handleSubmit(handleStepSubmit)}
          />
        </View>
      </ScrollView>
    </FormProvider>
  );
}

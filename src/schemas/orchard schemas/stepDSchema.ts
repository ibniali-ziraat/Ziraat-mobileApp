// StepD_CropNutrition.schema.ts
import { z } from "zod";

/* ------------------ OPTIONS ------------------ */
export const fertilizerOptions = [
  "Organic",
  "Chemical",
  "Integrated",
] as const;

export const yesNoOptions = ["Yes", "No"] as const;

export const applicationModeOptions = [
  "Soil Application",
  "Foliar Application",
] as const;

/* ------------------ SCHEMA ------------------ */
export const stepDCropNutritionSchema = z.object({
  
  fertilizerPractice: z.enum(fertilizerOptions, {
    required_error: "Fertilizer practice is required.",
    invalid_type_error: "Please select a valid fertilizer practice.",
  }),

  fertigation: z.enum(yesNoOptions, {
    required_error: "Please select fertigation option.",
    invalid_type_error: "Please select Yes or No.",
  }),

  nutritionPlan: z
    .string()
    .max(500, "Nutrition plan description is too long.")
    .optional()
    .nullable(),

  mulching: z.enum(yesNoOptions, {
    required_error: "Please select mulching option.",
    invalid_type_error: "Please select Yes or No.",
  }),

  lastFertiliserDate: z.string({
    required_error: "Last fertilizing date is required.",
  
  }),
  

  applicationMode: z.enum(applicationModeOptions, {
    required_error: "Application mode is required.",
    invalid_type_error: "Please select a valid mode of application.",
  }),
});

export type StepDCropNutritionType = z.infer<typeof stepDCropNutritionSchema>;

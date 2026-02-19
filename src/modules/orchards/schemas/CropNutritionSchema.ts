import { fullNameValidator } from "@/src/lib/validation";
import { z } from "zod";

export const fertilizerOptions = ["Organic", "Chemical", "Integrated"] as const;

export const yesNoOptions = ["Yes", "No"] as const;

export const applicationModeOptions = [
  "Soil Application",
  "Foliar Application",
] as const;

export const CropNutritionSchema = z.object({
  fertilizerPractices: z.string().min(1, "Required Field"),
  hasFertigation: z.boolean({
    required_error: "Required Field",
  }),
  isMulchingApplied: z.boolean({
    required_error: "Required Field",
  }),
  nutritionPlan: fullNameValidator,
  lastFertilizerApplicationDate: z
    .string({
      required_error: "Required Field",
      invalid_type_error: "Required Field",
    })
    .min(1, "Required Field"),

  fertilizerApplicationMode: z.string().min(1, "Required Field"),
});

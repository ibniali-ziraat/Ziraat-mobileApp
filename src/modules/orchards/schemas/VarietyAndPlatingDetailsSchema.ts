// StepB_BasicInfo.schema.ts
import { z } from "zod";
import { soilTypeOptions } from "./SoilWaterProfileSchema";

export const varietiesList = [
  "Red Delicious",
  "Golden Delicious",
  "Gala",
  "Fuji",
  "Honeycrisp",
  "Ambri",
  "Other",
] as const;

export const rootstockOptions = ["M9", "MM106", "Seedling", "Other"] as const;

export const densityOptions = [
  "High Density",
  "Medium Density",
  "Traditional",
] as const;

export const treeAgeOptions = [
  "Less than 5 years",
  "5–10 years",
  "10+ years",
] as const;

export const VarietyAndPlatingDetailsSchema = z.object({
  varietyName: z.enum(soilTypeOptions),

  totalTrees: z.coerce
    .number({
      invalid_type_error: "Annual yield must be a number.",
    })
    .positive("Annual yield must be greater than zero."),

  treesPerVariety: z.coerce
    .number({
      invalid_type_error: "Enter a valid number of trees per variety.",
    })
    .int("Trees per variety must be a whole number.")
    .positive("Trees per variety must be greater than zero.")
    .optional(),

  rootstock: z.enum(rootstockOptions, {
    invalid_type_error: "Please select a valid rootstock.",
  }),

  plantDensity: z.enum(densityOptions, {
    invalid_type_error: "Please select a valid plant density.",
  }),

  treeAge: z.enum(treeAgeOptions, {
    invalid_type_error: "Please select tree age distribution.",
  }),
});

export type StepBBasicInfoType = z.infer<typeof stepBBasicInfoSchema>;

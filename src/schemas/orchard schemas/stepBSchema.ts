// StepB_BasicInfo.schema.ts
import { z } from "zod";

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

export const stepBBasicInfoSchema = z.object({
  varieties: z
    .array(z.enum(varietiesList))
    .min(1, "Please select at least one variety."),

  totalTrees: z.coerce
    .number({
      invalid_type_error: "Enter a valid number of trees.",
    })
    .int("Total trees must be a whole number.")
    .positive("Total trees must be greater than zero.")
    .max(50000, "Please enter a reasonable number of trees (below 50,000)."),

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

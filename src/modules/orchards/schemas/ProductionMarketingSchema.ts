// StepG_ProductionMarketing.schema.ts
import { z } from "zod";

/* -------------------- OPTIONS -------------------- */
export const sellingPreferenceOptions = [
  "Local Mandi",
  "Commission Agent",
  "FPO",
  "Direct Buyer",
  "Online Platform",
] as const;

/* -------------------- SCHEMA -------------------- */
export const ProductionMarketingSchema = z.object({
  // Average Annual Yield — required, numeric
  annualYield: z.coerce
    .number({
      invalid_type_error: "Annual yield must be a number.",
    })
    .positive("Annual yield must be greater than zero."),
    

  // Peak Harvest Season — required
  peakHarvestSeason: z
    .string()
    .min(2, "Peak harvest season is required."),

  // Selling Preference — required enum
  sellingPreference: z.enum(sellingPreferenceOptions, {
    required_error: "Select a selling preference.",
    invalid_type_error: "Invalid selling preference selected.",
  }),

  // Buyer Details — optional
  buyerDetails: z
    .string()
    .max(200, "Too long.")
    .optional()
    .nullable(),
});

export type StepGProductionMarketingType = z.infer<
  typeof stepGProductionMarketingSchema
>;

// StepH_InputCostDetails.schema.ts
import { z } from "zod";

/* -------------------- OPTIONS -------------------- */

export const supplierLocationOptions = [
  "Village Level",
  "From Town",
  "From City",
  "Online Mostly",
] as const;

export const paymentTypeOptions = [
  "Credit Purchase",
  "Cash Purchase",
  "Mixed",
] as const;

export const creditPeriodOptions = [
  "Month",
  "Crop Season",
  "No Limits",
] as const;

/* -------------------- SCHEMA (ALL MANDATORY) -------------------- */

export const stepHInputCostDetailsSchema = z.object({
  
  pesticideSupplierLocation: z.enum(supplierLocationOptions, {
    required_error: "Please select pesticide supplier location.",
  }),

  paymentType: z.enum(paymentTypeOptions, {
    required_error: "Please select payment type.",
  }),

  creditPeriod: z.enum(creditPeriodOptions, {
    required_error: "Please select credit period.",
  }),

});

export type StepHInputCostType = z.infer<typeof stepHInputCostDetailsSchema>;

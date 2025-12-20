// StepI_OptionalFutureFields.schema.ts
import { z } from "zod";

/* -------------------- OPTIONS -------------------- */

export const schemeOptions = [
  "Subsidy",
  "Crop Insurance",
  "Horticulture Mission Support",
  "PM-Kisan Support",
  "Other",
] as const;

export const certificationOptions = [
  "Organic",
  "GAP",
  "Fair Trade",
  "Global GAP",
  "Other",
] as const;

export const digitalToolOptions = [
  "Weather Apps",
  "Advisory Apps",
  "Farm Management Tools",
  "Soil Health Apps",
  "Mobile-based Irrigation Advisory",
  "Other",
] as const;

/* ---------------------- UPDATED SCHEMA ---------------------- */

export const OptionalFutureFieldsSchema = z.object({
  
  /** 1️⃣ Government Schemes (Required multi-select) */
  govtSchemes: z
    .array(z.enum(schemeOptions))
    .min(1, "Please select at least one government scheme."),

  /** 2️⃣ FPO Membership (Now mandatory text) */
  fpoMembership: z
    .string({
      required_error: "FPO Membership is required.",
    })
    .max(200, "Too long"),

  /** 3️⃣ Certifications (Required single select) */
  certifications: z.enum(certificationOptions, {
    required_error: "Please select a certification.",
    invalid_type_error: "Invalid certification value.",
  }),

  /** 4️⃣ Digital Tools (Required multi-select) */
  digitalTools: z
    .array(z.enum(digitalToolOptions))
    .min(1, "Please select at least one digital tool."),
});

export type StepIOptionalType = z.infer<typeof stepIOptionalFutureFieldsSchema>;

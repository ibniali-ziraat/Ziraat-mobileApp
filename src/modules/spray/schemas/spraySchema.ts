import { z } from "zod";

export const SpraySchema = z.object({
  orchard: z
    .string()
    .min(1, "Orchard selection is required"),

  pesticideName: z
    .string()
    .min(2, "Pesticide name is required")
    .max(100, "Pesticide name is too long"),

  brand: z
    .string()
    .optional()
    .or(z.literal("")),

  quantity: z
    .string()
    .min(1, "Quantity is required")
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a valid number"),

  unit: z
    .string()
    .min(1, "Unit is required"),

  cost: z
    .string()
    .min(1, "Cost is required")
    .regex(/^\d+(\.\d+)?$/, "Cost must be a valid number"),

  sprayDate: z
    .string()
    .min(1, "Spray date is required"),

  notes: z
    .string()
    .optional()
    .or(z.literal("")),

  photo: z
    .any()
    .optional(),

  targetCrop: z
  .string({
    invalid_type_error: "Target must be a string",
    required_error: "Target Crop is required",
  })
  .min(1, "Target Crop is required")
  .regex(/^[A-Za-z\s]+$/, "Target Crop must contain only letters"),

});

export type OrchardFormType = z.infer<typeof orchardSchema>;

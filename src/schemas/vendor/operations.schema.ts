import { z } from "zod";

export const operationalDetailsSchema = z.object({
  yearsInBusiness: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .min(1, "Years in business is required"),

  deliveryServiceAvailable: z.enum(["yes", "no"], {
    required_error: "Delivery Service selection is required",
  }),

  avgMonthlySalesVolume: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .optional(),

  // Arrays of strings
  serviceArea: z.array(z.string()).optional(),
  companyTieups: z.array(z.string()).optional(),
});

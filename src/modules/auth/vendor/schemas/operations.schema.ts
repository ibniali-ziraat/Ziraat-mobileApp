import { z } from "zod";

export const operationalDetailsSchema = z
  .object({
    yearsInBusiness: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(1, "Years in business is required"),

    deliveryServiceAvailable: z.enum([" ", "yes", "no"], {
      required_error: "Delivery Service selection is required",
      invalid_type_error: "Delivery Service selection is required",
    }),

    avgMonthlySalesVolume: z.coerce.number({ invalid_type_error: "Enter a number" }).optional(),

    serviceArea: z.array(z.string()).optional(), // will validate conditionally
    companyTieups: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryServiceAvailable === "yes") {
      if (!data.serviceArea || data.serviceArea.length === 0) {
        ctx.addIssue({
          path: ["serviceArea"],
          code: "custom",
          message: "Service Area is required when delivery service is available",
        });
      }
    }
  });

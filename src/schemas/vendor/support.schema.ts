import { z } from "zod";

export const supportServicesSchema = z
  .object({
    advisorySupport: z.enum(["yes", "no"]).transform((val) => val === "yes"),

    fieldStaffAvailable: z
      .enum(["yes", "no"])
      .transform((val) => val === "yes"),

    fieldStaffCount: z.coerce.number().int().positive().optional(),

    afterSalesService: z.string().min(1),

    deliveryRange: z.coerce.number().int().positive(),

    computerAvailable: z.enum(["yes", "no"]).transform((val) => val === "yes"),

    vehicleAvailable: z.enum(["yes", "no"]).transform((val) => val === "yes"),
  })
  .superRefine((data, ctx) => {
    if (
      data.fieldStaffAvailable &&
      (!data.fieldStaffCount || data.fieldStaffCount <= 0)
    ) {
      ctx.addIssue({
        path: ["fieldStaffCount"],
        code: z.ZodIssueCode.custom,
        message: "Number of Field Staff is required and must be positive",
      });
    }
  });

import { z } from "zod";

export const supportServicesSchema = z
  .object({
    // agronomyAdvisorySupport: z.boolean(),
    agronomyAdvisorySupport: z
      .enum(["yes", "no"], {
        required_error: "Required Field",
        invalid_type_error: "Required Field",
      })
      .transform((val) => val === "yes"),
    fieldStaffAvailable: z.boolean(),
    numberOfStaff: z.number().int().positive().optional(),
    afterSalesService: z
      .string()
      .min(1, "After-Sales Service details are required"),
    preferredDeliveryAreaRangeSqKm: z
      .number({ invalid_type_error: "Delivery range must be a number" })
      .int()
      .positive({ message: "Delivery range must be positive" }),
    computerFacilityAvailable: z.boolean(),
    deliveryVehicleAvailable: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.fieldStaffAvailable &&
      (data.numberOfStaff === undefined || data.numberOfStaff <= 0)
    ) {
      ctx.addIssue({
        path: ["numberOfStaff"],
        code: z.ZodIssueCode.custom,
        message: "Number of Field Staff is required and must be positive",
      });
    }
  });

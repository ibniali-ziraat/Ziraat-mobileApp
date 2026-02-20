import { fullNameValidator, pincodeValidator } from "@/src/lib/validation";
import { z } from "zod";

const currentYear = new Date().getFullYear();

export const BasicInfoSchema = z
  .object({
    orchardName: fullNameValidator,

    orchardSize: z
      .object({
        mode: z.enum(["measure", "manual"]),
      })
      .optional(),

    orchardUnit: z.enum(["marlas", "kanals"]).optional(),

    marlas: z.string().optional(),
    kanals: z.string().optional(),

    establishmentYear: z.coerce
      .number({
        invalid_type_error: "Establishment year must be a number",
      })
      .int("Year must be a whole number")
      .min(1900, "Year must be between 1900 and current year")
      .max(currentYear, `Year cannot exceed ${currentYear}`),

    plantationPattern: z.string().min(1, "Plantation pattern is required"),

    ownershipType: z.string().min(1, "Ownership type is required"),

    district: z.string().min(1, "District is required"),

    tehsil: z.string().min(1, "Tehsil is required"),

    pincode: pincodeValidator,
  })
  .superRefine((data, ctx) => {
    const mode = data.orchardSize?.mode ?? "measure";

    // If manual → orchardSize must exist
    if (mode === "manual") {
      if (!data.orchardSize?.mode) {
        ctx.addIssue({
          path: ["orchardSize", "mode"],
          message: "Mode is required",
          code: z.ZodIssueCode.custom,
        });
        return;
      }

      if (!data.orchardUnit) {
        ctx.addIssue({
          path: ["orchardUnit"],
          message: "Unit is required",
          code: z.ZodIssueCode.custom,
        });
        return;
      }

      if (data.orchardUnit === "marlas") {
        if (!data.marlas?.trim()) {
          ctx.addIssue({
            path: ["marlas"],
            message: "Required Field",
            code: z.ZodIssueCode.custom,
          });
        }
      }

      if (data.orchardUnit === "kanals") {
        if (!data.kanals?.trim()) {
          ctx.addIssue({
            path: ["kanals"],
            message: "Required Field",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }
  });

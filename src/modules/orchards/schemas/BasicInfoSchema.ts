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

      if (!data.kanals?.trim() && !data.marlas?.trim()) {
        ctx.addIssue({
          path: ["kanals"],
          message: "Enter size in Kanals and/or Marlas",
          code: z.ZodIssueCode.custom,
        });
        ctx.addIssue({
          path: ["marlas"],
          message: "Enter size in Kanals and/or Marlas",
          code: z.ZodIssueCode.custom,
        });
      }

      if (data.marlas?.trim() && Number(data.marlas) >= 20) {
        ctx.addIssue({
          path: ["marlas"],
          message: "20 Marlas = 1 Kanal. Enter up to 19, or add to Kanals instead",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

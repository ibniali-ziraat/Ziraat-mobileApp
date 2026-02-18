import { fullNameValidator, pincodeValidator } from "@/src/lib/validation";
import { z } from "zod";

const currentYear = new Date().getFullYear();

export const OrchardSizeSchema = z
  .object({
    mode: z.enum(["manual", "measure"]).default("manual"),

    unit: z.enum(["marla", "kanal"]).optional(),

    value: z.coerce.number().positive().optional(),

    type: z.enum(["walk", "tap"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "manual") {
      if (!data.unit) {
        ctx.addIssue({
          path: ["orchardSize", "unit"],
          message: "Unit is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (data.value === undefined) {
        ctx.addIssue({
          path: ["orchardSize", "value"],
          message: "Orchard size is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.mode === "measure") {
      if (!data.type) {
        ctx.addIssue({
          path: ["orchardSize", "type"],
          message: "Measurement method is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const BasicInfoSchema = z
  .object({
    orchardName: fullNameValidator,

    orchardUnit: z.enum(["marlas", "kanals"], {
      required_error: "Unit is required",
    }),

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
    if (data.orchardUnit === "marlas") {
      if (!data.marlas || data.marlas.trim() === "") {
        ctx.addIssue({
          path: ["marlas"],
          message: "Required Field",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.orchardUnit === "kanals") {
      if (!data.kanals || data.kanals.trim() === "") {
        ctx.addIssue({
          path: ["kanals"],
          message: "Required Field",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;

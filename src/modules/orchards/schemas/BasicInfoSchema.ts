import { z } from "zod";

// const currentYear = new Date().getFullYear();

// export const BasicInfoSchema = z.object({
//   orchardName: z.string().min(3, "Required Field"),

//   orchardSize: z.coerce.number().int().min(1, "Required Field"),

//   establishmentYear: z.coerce
//     .number({
//       invalid_type_error: "Establishment year must be a number",
//     })
//     .int("Year must be a whole number")
//     .min(1900, "Year must be between 1900 and current year")
//     .max(currentYear, `Year cannot exceed ${currentYear}`),

//   plantationPattern: z.string().min(1, "Plantation pattern is required"),

//   ownershipType: z.string().min(1, "Ownership type is required"),

//   district: z.string().min(1, "District is required"),

//   tehsil: z.string().min(1, "Tehsil is required"),

//   // zone: z.string().min(3, "zone is required"),

//   pincode: z.string().regex(/^\d{6}$/, "Enter Valid Pincode"),

//   // latitude: z
//   //   .string()
//   //   .min(1, "Latitude is required.")
//   //   .refine((val) => !isNaN(parseFloat(val)), "Latitude must be a number.")
//   //   .transform(Number)
//   //   .refine(
//   //     (val) => val >= -90 && val <= 90,
//   //     "Latitude must be between -90 and 90."
//   //   ),

//   // longitude: z
//   //   .string()
//   //   .min(1, "Longitude is required.")
//   //   .refine((val) => !isNaN(parseFloat(val)), "Longitude must be a number.")
//   //   .transform(Number)
//   //   .refine(
//   //     (val) => val >= -180 && val <= 180,
//   //     "Longitude must be between -180 and 180."
//   //   ),
// });

// export type OrchardSchemaType = z.infer<typeof orchardSchema>;
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
        // ✅ FIXED
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

export const BasicInfoSchema = z.object({
  orchardName: z.string().min(3, "Required Field"),

  orchardSize: OrchardSizeSchema,

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

  pincode: z.coerce.string().regex(/^\d{6}$/, "Enter Valid Pincode"),
});
export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;

import { z } from "zod";

const currentYear = new Date().getFullYear();

export const BasicInfoSchema = z.object({
  orchardName: z
    .string()
    .min(3, "Orchard name must be at least 3 characters"),

  orchardSize:  z.coerce
    .number({
      invalid_type_error: "Orchard size must be a number",
    })
    .min(1, "Year must be between 1900 and current year"),

  establishmentYear: z.coerce
    .number({
      invalid_type_error: "Establishment year must be a number",
    })
    .int("Year must be a whole number")
    .min(1900, "Year must be between 1900 and current year")
    .max(currentYear, `Year cannot exceed ${currentYear}`),

  plantationPattern: z
    .string()
    .min(1, "Plantation pattern is required"),

  ownershipType: z
    .string()
    .min(1, "Ownership type is required"),

  district: z
    .string()
    .min(1, "District is required"),

  tehsil: z
    .string()
    .min(1, "Tehsil is required"),

  zone:  z.string()
    .min(3, "zone is required"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be a valid 6-digit number"),

  latitude: z
    .string()
    .min(1, "Latitude is required.")
    .refine((val) => !isNaN(parseFloat(val)), "Latitude must be a number.")
    .transform(Number)
    .refine((val) => val >= -90 && val <= 90, "Latitude must be between -90 and 90."),

  longitude: z
    .string()
    .min(1, "Longitude is required.")
    .refine((val) => !isNaN(parseFloat(val)), "Longitude must be a number.")
    .transform(Number)
    .refine(
      (val) => val >= -180 && val <= 180,
      "Longitude must be between -180 and 180."
    ),
});

export type OrchardSchemaType = z.infer<typeof orchardSchema>;

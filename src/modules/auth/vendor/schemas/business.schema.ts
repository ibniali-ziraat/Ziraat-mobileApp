import { z } from "zod";

export const businessInformationSchema = z.object({
  shopName: z.string().min(1, "Required Field"),

  ownerName: z.string().min(1, "Required Field"),

  contactNumberPrimary: z
    .string()
    .min(1, "Required Field")
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),

  contactNumberAlternate: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit number")
    .optional()
    .or(z.literal("")),

  email: z.string().email("Enter a valid email").optional().or(z.literal("")),

  village: z.string().min(1, "Required Field"),
  tehsil: z.string().min(1, "Required Field"),
  // address: z.string().min(1, "Required Field"),
  district: z.string().min(1, "Required Field"),
  state: z.string().min(1, "Required Field"),

  pincode: z
    .string()
    .nonempty("Required Field") // 1️⃣ Empty check first
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6 digit pincode"),

  gps: z.string().min(1, "GPS location is required").optional(),
});

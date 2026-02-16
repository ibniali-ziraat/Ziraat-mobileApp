import z from "zod";

export const addressSchema = z.object({
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  tehsil: z.string().min(1, "Tehsil is required"),
  village: z.string().min(1, "Village is required"),
  pincode: z
    .number({
      required_error: "Pincode is required",
      invalid_type_error: "Pincode must be a number",
    })
    .int("Pincode must be an integer")
    .refine((val) => val >= 100000 && val <= 999999, {
      message: "Enter a valid 6 digit pincode",
    }),
});

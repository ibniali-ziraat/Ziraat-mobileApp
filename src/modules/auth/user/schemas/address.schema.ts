import z from "zod";

export const addressSchema = z.object({
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  tehsil: z.string().min(1, "Tehsil is required"),
  village: z.string().min(1, "Village is required"),
  pincode: z
    .string()
    .nonempty("Pincode is required") // 1️⃣ Empty check first
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6 digit pincode"),
});

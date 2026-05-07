import { pincodeValidator } from "@/src/lib/validation";
import z from "zod";

export const addressSchema = z.object({
  state: z.string().min(1, " Required Field"),
  district: z.string().min(1, "Required Field"),
  tehsil: z.string().min(1, "Required Field"),
  village: z.string().min(1, "Required Field"),
  pincode: pincodeValidator,
});

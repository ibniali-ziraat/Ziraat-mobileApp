import { phoneValidator } from "@/src/lib/validation";
import { z } from "zod";

export const VerifyPhoneSchema = z.object({
  mobileNumber: phoneValidator,
});
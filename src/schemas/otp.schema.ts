import z from "zod";
import { otpValidator } from "../lib/validation";

export const otpSchema = z.object({
  otp: otpValidator,
});

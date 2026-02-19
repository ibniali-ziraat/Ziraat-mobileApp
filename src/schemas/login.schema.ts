import { z } from "zod";
import { loginPasswordValidator, phoneValidator } from "../lib/validation";
// import { requiredPasswordOnly, requiredPhone } from "../lib/validation";

export const LoginSchema = z.object({
  mobileNumber: phoneValidator,
  password: loginPasswordValidator,
});

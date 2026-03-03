import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      "Minimum 8 characters with upper & lower case, number and symbol"
      ),

    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (data.oldPassword === data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password must be different from current password",
        path: ["newPassword"],
      });
    }
  });
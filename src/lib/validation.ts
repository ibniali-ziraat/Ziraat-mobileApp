import { z } from "zod";

export const requiredUsername = () =>
  z
    .string()
    .min(1, "Required Field")

    .min(3, "Full Name must be at least 3 characters");

export const requiredEmail = () =>
  z.string().min(1, "Required Field").email("Invalid email address");

export const requiredPhone = () =>
  z.string().min(1, "Required Field").min(10, "Enter a valid phone number");

export const requiredAge = () =>
  z
    .string()
    .min(1, "Required Field")

    .refine((v) => Number(v) > 0 && Number(v) <= 120, "Enter a valid age");

export const requiredGender = () =>
  z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  });

export const requiredPasswordStrong = () =>
  z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine(
      (v) => /[A-Z]/.test(v),
      "Password must contain one uppercase letter",
    )
    .refine((v) => /[0-9]/.test(v), "Password must contain a number");

export const requiredPasswordOnly = () => z.string().min(1, "Required Field");

export const requiredOTP = () =>
  z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]{6}$/, "Enter Valid OTP");
///////////

export const emailValidator = z
  .string()
  .trim()
  .toLowerCase()

  .optional()
  .or(z.literal(""));

export const passwordValidator = z
  .string()
  .min(1, "Required Field")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
    "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
  );

export const phoneValidator = z
  .string()
  .min(1, "Required Field")
  .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number");

export const nameValidator = z
  .string()
  .trim()
  .min(1, "Required Field")
  .min(3, "Minimum 3 characters required");

export const ageValidator = z
  .string()
  .min(1, "Required Field")
  .regex(/^[0-9]+$/, "Required Field")
  .refine((val) => val >= 18, "Age must be at least 18")
  .refine((val) => val <= 120, "Enter a valid age");

export const fullNameValidator = z
  .string()
  .min(1, "Required Field")
  .min(3, "Full Name must be at least 3 characters");
export const otpValidator = z
  .string()
  .regex(/^[0-9]{6}$/, "Enter a valid 6-digit OTP");

export const loginPasswordValidator = z.string().min(1, "Required Field");

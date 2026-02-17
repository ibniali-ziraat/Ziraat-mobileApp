// import { requiredUsername } from "@/src/lib/validation";
import {
  ageValidator,
  emailValidator,
  fullNameValidator,
  phoneValidator,
} from "@/src/lib/validation";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const profileSchema = z
  .object({
    fullName: fullNameValidator,

    phone: phoneValidator,

    email: emailValidator,

    age: ageValidator,

    gender: z.string().min(1, "Required Field"),

    password: z
      .string()
      .min(1, "Required Field")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
        "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      ),

    confirmPassword: z.string().min(1, "Required Field"),

    profilePic: z.any().optional(),
  })

  // Password match logic
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

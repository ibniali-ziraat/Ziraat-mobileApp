// import { requiredUsername } from "@/src/lib/validation";
import { z } from "zod";



export const NewPasswordSchema = z
    .object({


        password: z
            .string()
            .min(1, "Required Field")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
                "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
            ),

        confirmPassword: z.string().min(1, "Required Field"),


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

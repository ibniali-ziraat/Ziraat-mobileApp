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
  .regex(/^[0-9]{10}$/, "Enter a valid phone number");
export const optionalPhoneValidator = z.preprocess(
  (val) => {
    if (val === "" || val === null) return undefined;
    return val;
  },
  z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid phone number")
    .optional(),
);

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
  .min(3, "Name must be at least 3 characters");
export const otpValidator = z
  .string()
  .regex(/^[0-9]{6}$/, "Enter a valid 6-digit OTP");

export const loginPasswordValidator = z
  .string()
  .trim()
  .min(1, "Password is required");

export const pincodeValidator = z
  .string()
  .nonempty("Required Field")
  .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6 digit pincode");

export const multiSelectRequired = (message = "Required Field") =>
  z.preprocess(
    (val) => {
      if (val === undefined || val === null) return [];
      return val;
    },
    z.array(z.string()).min(1, message),
  );

export const multiSelectOptional = () =>
  z.preprocess((val) => {
    if (val === undefined || val === null) return [];
    return val;
  }, z.array(z.string()));

/* REQUIRED single select */
export const singleSelectRequired = (message = "Required Field") =>
  z.preprocess(
    (val) => {
      if (val === undefined || val === null) return "";
      return val;
    },
    z.string().min(1, message),
  );

/* OPTIONAL single select */
export const singleSelectOptional = () =>
  z.preprocess((val) => {
    if (val === undefined || val === null) return "";
    return val;
  }, z.string().optional());

export const countValidator = (message = "Required Field", required = true) => {
  if (!required) {
    return z.number().optional();
  }

  return z.number().min(1, message);
};

export const numberField = (message = "Required Field") =>
  z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    },
    z.number({
      required_error: message,
      invalid_type_error: "Must be a valid number",
    }),
  );

/**
 * =============================
 * BASE REQUIRED STRING
 * =============================
 */
export const requiredString = (message = "Required Field") =>
  z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    z.string().trim().min(1, message),
  );

/**
 * =============================
 * OPTIONAL STRING
 * =============================
 */
export const optionalString = () =>
  z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    z.string().optional(),
  );

export const optionalEmail = () =>
  z.string().trim().email("Invalid email address").optional().or(z.literal(""));

/**
 * =============================
]
/**
 * =============================
 * NAME
 * =============================
 */
export const requiredName = (message = "Required Field") =>
  requiredString(message).min(3, "Minimum 3 characters required");

/**
 * =============================
 * PASSWORD
 * =============================
 */
export const requiredPassword = (message = "Required Field") =>
  requiredString(message);

export const strongPassword = () =>
  requiredString().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
    "Password must include uppercase, lowercase, number, and special character",
  );

/**
 * =============================
 * PINCODE
 * =============================
 */
export const requiredPincode = () =>
  requiredString().regex(/^[1-9][0-9]{5}$/, "Enter valid 6 digit pincode");

/**
 * =============================
 * AGE
 * =============================


/**
 * optional number
 */
export const optionalNumberField = () =>
  z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    return Number(val);
  }, z.number().optional());

/**
 * =============================
 * MULTI SELECT
 * =============================
 */

/**
 * =============================
 * BOOLEAN SELECT (Yes/No)
 * =============================
 */
export const booleanRequired = (message = "Required Field") =>
  z.preprocess(
    (val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    },
    z.boolean({
      required_error: message,
      invalid_type_error: message,
    }),
  );

export const booleanOptional = () =>
  z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  }, z.boolean().optional());
export const requiredDate = (message = "Required Field") =>
  z
    .string({
      required_error: message,
    })
    .min(1, message);

export const optionalDate = () => z.string().optional();

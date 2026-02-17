import { FieldError } from "react-hook-form";

export type InputType =
  | "text"
  | "phone"
  | "email"
  | "password"
  | "number"
  | "age"
  | "pincode"
  | "bankaccount"
  | "gst"
  | "pan"
  | "ifsc"
  | "name";

export interface FormInputProps {
  name: string;
  label: string;
  type?: InputType;
  error?: FieldError;
  required?: boolean;
  countryCode?: string;
  placeholder?: string;
}

export interface FormOtpInputProps {
  name: string;
  label: string;
  errors?: FieldError;
  required?: boolean;
  length?: number;
}

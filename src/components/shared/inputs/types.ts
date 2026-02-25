import { Control, FieldError } from "react-hook-form";

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
interface Option {
  label: string;
  value: string | number;
}
export interface FormInputProps {
  name: string;
  label: string;
  type?: InputType;
  error?: FieldError;
  required?: boolean;
  countryCode?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface FormOtpInputProps {
  name: string;
  label: string;
  errors?: FieldError;
  required?: boolean;
  length?: number;
}
export interface SingleSelectInputProps {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
  optional?: boolean;
  error?: FieldError;
  modalLabel?: string;
  onValueChange?: (value: string | number | "") => void;
  disabled?: boolean;
  searchable?: boolean;
  showInputLabel?: boolean;
  placeholder?: string;
}

export interface MultiSelectInputProps {
  control: Control<any>;

  name: string;

  label: string;

  options?: Option[];

  error?: FieldError;

  optional?: boolean;
  placeholder?: string;

  disabled?: boolean;
  searchable?: boolean;

  onValueChange?: (values: (string | number)[]) => void;

  showInputLabel?: boolean;

  modalLabel?: string;
}

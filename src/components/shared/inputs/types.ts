import { Control, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

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
  | "name"
  | "alphanumeric"
  | "marlas"
  | "address"
  | "year"
  | "username"
  | "city";
interface Option {
  label: string;
  value: string | number;
}
export interface FormInputProps {
  name: string;
  label: string;
  type?: InputType;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  countryCode?: string;
  placeholder?: string;
  disabled?: boolean;
  warning?: string;
  onChangeText?: (rawText: string) => void;
}

export interface FormOtpInputProps {
  name: string;
  label: string;
  errors?: FieldError;
  required?: boolean;
  length?: number;
}
export interface SingleSelectInputProps {
  name: string;
  label: string;
  options: Option[];
  optional?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;

  modalLabel?: string;
  onValueChange?: (value: string | number | "") => void;
  disabled?: boolean;
  searchable?: boolean;
  showInputLabel?: boolean;
  placeholder?: string;
  // renders label/box/spacing exactly like FormTextInput, for side-by-side rows
  matchTextInput?: boolean;
}

export interface MultiSelectInputProps {
  control: Control<any>;

  name: string;

  label: string;

  options?: Option[];

  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;

  optional?: boolean;
  placeholder?: string;

  disabled?: boolean;
  searchable?: boolean;

  onValueChange?: (values: (string | number)[]) => void;

  showInputLabel?: boolean;

  modalLabel?: string;

  // only one option can be picked at a time; the value stays an array
  singleSelection?: boolean;
}
export interface ChipInputProps {
  required: any;
  name: string;
  label: string;
  placeholder?: string;
  error?: any;
}

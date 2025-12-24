import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";

export interface FormSectionProps {
  name: any;
  control: Control<any>;
  errors: FieldErrors<any>;
  data?: any;
  setValue?: UseFormSetValue<any>;
}

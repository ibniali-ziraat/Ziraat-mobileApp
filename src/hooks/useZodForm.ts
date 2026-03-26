import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { ZodType } from "zod";

export function useZodForm<T extends ZodType<any>>(
  schema?: T,
  options?: Partial<UseFormProps<any>>,
) {
  return useForm({
    ...(schema ? { resolver: zodResolver(schema) } : {}),

    mode: "onSubmit",
    reValidateMode: "onChange",

    ...options,
  });
}

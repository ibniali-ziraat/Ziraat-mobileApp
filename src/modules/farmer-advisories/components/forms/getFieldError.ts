import type { FieldError, FieldErrors } from "react-hook-form";

// reads a nested error like "coverage.value" or "saleLots.0.quantity.value"
export const getFieldError = (
  errors: FieldErrors,
  path: string,
): FieldError | undefined =>
  path
    .split(".")
    .reduce<any>((node, key) => (node ? node[key] : undefined), errors);

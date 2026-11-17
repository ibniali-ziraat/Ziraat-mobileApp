// pulls a readable message out of an axios error (plain message or ASP.NET problem details)
export const getErrorMessage = (error: any, fallback: string): string => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.length < 200) return data;

  const validationErrors = data?.errors
    ? Object.values(data.errors).flat().filter(Boolean)
    : [];

  return (
    data?.message ||
    data?.detail ||
    (validationErrors[0] as string | undefined) ||
    data?.title ||
    fallback
  );
};

// turns ASP.NET validation keys into form paths, e.g.
// "SaleLots[0].Quantity.Value" or "$.saleLots[0].quantity.value" -> "saleLots.0.quantity.value"
const toFormPath = (key: string) =>
  key
    .replace(/^\$\.?/, "")
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .map((part) => part.charAt(0).toLowerCase() + part.slice(1))
    .join(".");

// per-field messages from a 400 problem-details response, so they can sit on the inputs
export const getServerFieldErrors = (
  error: any,
): { path: string; message: string }[] => {
  const errors = error?.response?.data?.errors;
  if (!errors || typeof errors !== "object") return [];

  return Object.entries(errors)
    .map(([key, messages]) => ({
      path: toFormPath(key),
      message: String(Array.isArray(messages) ? messages[0] : messages),
    }))
    .filter(({ path, message }) => path && path !== "request" && message);
};

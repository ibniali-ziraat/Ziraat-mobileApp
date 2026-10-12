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

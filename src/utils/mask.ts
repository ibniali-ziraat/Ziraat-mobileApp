export const maskValue = (
  value?: string,
  visibleStart = 2,
  visibleEnd = 2,
  maskChar = "*"
) => {
  if (!value) return "N/A";
  if (value.length <= visibleStart + visibleEnd) return value;

  const start = value.slice(0, visibleStart);
  const end = value.slice(-visibleEnd);
  const masked = maskChar.repeat(value.length - visibleStart - visibleEnd);

  return `${start}${masked}${end}`;
};

/** Column with a rounded cap and a square foot planted on the baseline. */
export const columnPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  maxRadius = 4,
): string => {
  const radius = Math.min(maxRadius, width / 2, height);
  const bottom = y + height;

  return [
    `M${x} ${bottom}`,
    `L${x} ${y + radius}`,
    `Q${x} ${y} ${x + radius} ${y}`,
    `L${x + width - radius} ${y}`,
    `Q${x + width} ${y} ${x + width} ${y + radius}`,
    `L${x + width} ${bottom}`,
    "Z",
  ].join(" ");
};

export const niceCeiling = (value: number): number => {
  if (value <= 0) return 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  const step =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
};

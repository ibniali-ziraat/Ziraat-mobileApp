const MARLAS_PER_KANAL = 20;

export const toNumber = (value: unknown): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

/** Orchard size is stored as kanals + marlas; 1 kanal = 20 marlas. */
export const toKanals = (kanals: unknown, marlas: unknown): number =>
  toNumber(kanals) + toNumber(marlas) / MARLAS_PER_KANAL;

export const formatArea = (kanals: number): string => {
  if (kanals <= 0) return "0";
  if (kanals < 1) return `${Math.round(kanals * MARLAS_PER_KANAL)}`;
  return kanals >= 100 ? `${Math.round(kanals)}` : kanals.toFixed(1);
};

export const areaUnit = (kanals: number): string =>
  kanals > 0 && kanals < 1 ? "marlas" : "kanals";

export const formatCompact = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 10_000_000) return `${(value / 10_000_000).toFixed(1)}Cr`;
  if (abs >= 100_000) return `${(value / 100_000).toFixed(1)}L`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${Math.round(value)}`;
};

export const formatCurrency = (value: number): string =>
  `₹${formatCompact(value)}`;

export const formatRelativeDate = (timestamp: number): string => {
  if (!Number.isFinite(timestamp) || timestamp <= 0) return "";

  const diffDays = Math.floor((Date.now() - timestamp) / 86_400_000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;

  const months = Math.floor(diffDays / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

export const formatMonthLabel = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString("en-IN", { month: "short" });

/**
 * The API sends periods as "WEEKLY" / "MONTHLY", which read badly inline
 * ("vs last weekly"). Turn them into the noun the sentence actually wants.
 */
export const periodNoun = (period?: string): string => {
  const value = period?.trim().toLowerCase();
  if (!value) return "week";

  const map: Record<string, string> = {
    daily: "day",
    weekly: "week",
    fortnightly: "fortnight",
    monthly: "month",
    quarterly: "quarter",
    yearly: "year",
    annually: "year",
  };

  return map[value] ?? value.replace(/ly$/, "");
};

export const greetingForNow = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const todayLabel = (): string =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

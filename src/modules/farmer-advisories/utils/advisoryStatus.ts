import { colors } from "@/src/constants/colors";
import type { AdvisoryListItem } from "../services/farmeradvisories.service";

export type AdvisoryStatusKey =
  | "cancelled"
  | "completed"
  | "overdue"
  | "acknowledged"
  | "seen"
  | "new";

type StatusFields = Pick<
  AdvisoryListItem,
  "status" | "readOn" | "acknowledgedOn" | "completedOn" | "isOverdue"
>;

// the api only sends dates, so the badge is worked out from them
export const getAdvisoryStatus = (advisory: StatusFields): AdvisoryStatusKey => {
  if (advisory.status === "cancelled") return "cancelled";
  if (advisory.completedOn) return "completed";
  if (advisory.isOverdue) return "overdue";
  if (advisory.acknowledgedOn) return "acknowledged";
  if (advisory.readOn) return "seen";
  return "new";
};

export const STATUS_META: Record<
  AdvisoryStatusKey,
  { label: string; color: string; background: string }
> = {
  new: { label: "New", color: colors.secondary, background: "#FDF1E8" },
  seen: { label: "Seen", color: "#5A5A5A", background: "#F2F2F2" },
  acknowledged: {
    label: "Acknowledged",
    color: "#1F5FA8",
    background: "#EAF2FB",
  },
  overdue: { label: "Overdue", color: "#C0392B", background: "#FDECEA" },
  completed: { label: "Completed", color: colors.primary, background: "#EEF4E9" },
  cancelled: { label: "Cancelled", color: "#8C8C8C", background: "#F2F2F2" },
};

/* ============================== LIST FILTERS ============================== */

export type AdvisoryFilter = "all" | "pending" | "overdue" | "completed";

export const ADVISORY_FILTERS: { key: AdvisoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "overdue", label: "Overdue" },
  { key: "completed", label: "Completed" },
];

export const matchesFilter = (
  advisory: StatusFields,
  filter: AdvisoryFilter,
) => {
  const status = getAdvisoryStatus(advisory);
  switch (filter) {
    case "pending":
      return status === "new" || status === "seen" || status === "acknowledged";
    case "overdue":
      return status === "overdue";
    case "completed":
      return status === "completed";
    default:
      return true;
  }
};

/* ============================== DATES ============================== */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "7 Oct, 10:33 AM"
export const formatDateTime = (iso?: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const time = `${hours % 12 || 12}:${minutes} ${hours < 12 ? "AM" : "PM"}`;

  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${time}`;
};

// "7 Oct"
export const formatDay = (iso?: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

export const formatWindow = (start?: string, end?: string) => {
  const from = formatDay(start);
  const to = formatDay(end);
  if (!from) return to;
  if (!to || from === to) return from;
  return `${from} – ${to}`;
};

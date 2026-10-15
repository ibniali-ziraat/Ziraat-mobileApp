import type { LucideIcon } from "lucide-react-native";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  BellRing,
  BookOpen,
  Bug,
  Calendar,
  Clock,
  CloudRain,
  DollarSign,
  Droplets,
  Gauge,
  GaugeCircle,
  Image,
  LayoutDashboard,
  Leaf,
  MessageCircle,
  Percent,
  PiggyBank,
  Recycle,
  Shield,
  ShieldHalf,
  Tractor,
  TrendingUp,
  Users,
  Wallet,
  Wheat,
} from "lucide-react-native";
import { View } from "react-native";

/**
 * Soft background + matching ink. Line icons on these read as a clean,
 * professional app — the cartoon art is kept for Home and empty states.
 */
export const badgeTones = {
  green: { bg: "#EAF5E4", fg: "#2D6B06" },
  blue: { bg: "#E6F1FB", fg: "#1D64A8" },
  amber: { bg: "#FFF3E0", fg: "#B26100" },
  rose: { bg: "#FCE9EF", fg: "#B0305E" },
  violet: { bg: "#F0ECFA", fg: "#5E44A8" },
  teal: { bg: "#E3F5F3", fg: "#16766B" },
} as const;

export type BadgeTone = keyof typeof badgeTones;

/** Cycle for grids where every tile should differ from its neighbour. */
export const badgeToneCycle: BadgeTone[] = [
  "green",
  "blue",
  "amber",
  "rose",
  "violet",
  "teal",
];

// Lucide names the dashboard API's icon maps use.
const iconsByName: Record<string, LucideIcon> = {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  BellRing,
  BookOpen,
  Bug,
  Calendar,
  Clock,
  CloudRain,
  DollarSign,
  Droplets,
  Gauge,
  GaugeCircle,
  Image,
  Leaf,
  MessageCircle,
  Percent,
  PiggyBank,
  Recycle,
  Shield,
  ShieldHalf,
  Tractor,
  TrendingUp,
  Users,
  Wallet,
  Wheat,
};

export const getLineIcon = (name?: string): LucideIcon =>
  (name && iconsByName[name]) || LayoutDashboard;

type Props = {
  icon: LucideIcon;
  tone?: BadgeTone;
  /** Box size; the icon is drawn at ~45% of it. */
  size?: number;
  /** "circle" or a rounded square. */
  shape?: "circle" | "square";
};

export default function IconBadge({
  icon: Icon,
  tone = "green",
  size = 40,
  shape = "square",
}: Props) {
  const { bg, fg } = badgeTones[tone];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? size / 2 : Math.round(size * 0.3),
        borderCurve: "continuous",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
      }}
    >
      <Icon size={Math.round(size * 0.46)} color={fg} strokeWidth={2} />
    </View>
  );
}

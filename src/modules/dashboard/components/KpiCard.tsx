import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import {
  DollarSign,
  Percent,
  TrendingUp,
  Wallet,
  Wheat,
} from "lucide-react-native";
import { View } from "react-native";

const icons = {
  Wallet,
  DollarSign,
  TrendingUp,
  Percent,
  Wheat,
} as const;

type KpiItem = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof icons;
};

type Props = {
  item: KpiItem;
};

export default function KpiCard({ item }: Props) {
  const Icon = icons[item.icon];

  return (
    <View
      style={[
        {
          width: "100%",
          height: 160,
          backgroundColor: colors.light,
          borderRadius: 16,
         
          borderColor: colors.neutral,
          paddingVertical: 12,
          paddingHorizontal: 12,
          alignItems: "center",
          justifyContent: "space-evenly",
        },
        shadows.profile_card,
      ]}
    >
      {/* Icon */}
      {Icon && (
        <Icon size={38} color={colors.secondary} strokeWidth={1.3} />
      )}

      {/* Title */}
      <CsText
        style={{
          color: colors.dark,
          fontWeight: "600",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {item.title}
      </CsText>

      {/* Value */}
      <CsText
        style={{
          color: colors.dark,
          fontWeight: "700",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {item.value}
      </CsText>

      {/* Subtitle */}
      {item.subtitle && (
        <CsText
          style={{
            color: colors.neutral,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {item.subtitle}
        </CsText>
      )}
    </View>
  );
}
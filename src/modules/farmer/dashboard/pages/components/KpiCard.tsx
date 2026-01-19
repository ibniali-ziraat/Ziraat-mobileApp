import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
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
    <ZiraatCard width="49%" paddingVertical={2} paddingHorizontal={2}>
      <View className="h-40 items-center justify-evenly">
        {/* Icon */}
        {Icon && (
          <Icon size={38} color={colors.secondary} strokeWidth={1.3} />
        )}

        {/* Title */}
        <CsText className="text-black font-semibold text-[14px] text-center">
          {item.title}
        </CsText>

        {/* Value */}
        <CsText className="text-black font-bold text-[18px] text-center">
          {item.value}
        </CsText>

        {/* Subtitle */}
        {item.subtitle && (
          <CsText className="text-black text-[14px] text-center">
            {item.subtitle}
          </CsText>
        )}
      </View>
    </ZiraatCard>
  );
}

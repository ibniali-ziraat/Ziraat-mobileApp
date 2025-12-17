
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import {
  DollarSign,
  Percent,
  TrendingUp,
  Wallet,
  Wheat,
} from "lucide-react-native";
import { Text, View } from "react-native";

const icons = {
  Wallet,
  DollarSign,
  TrendingUp,
  Percent,
  Wheat,
};

export default function KpiCard({ item }) {
  const Icon = icons[item.icon];

  return (
    <ZiraatCard
      width="49%"
      height={120}
      paddingVertical={1}
      paddingHorizontal={1}
    >
      <View className="flex-1 items-center justify-center">
        <Icon size={28} color={colors.secondary} />

        <Text className="mt-1 text-black font-bold text-[16px] text-center">
          {item.title}
        </Text>

        <Text className="mt-1 text-black text-center text-[12px]">
          {item.value}
        </Text>

        <Text className="mt-1 text-black text-center text-sm">
          {item.subtitle}
        </Text>
      </View>
    </ZiraatCard>
  );
}

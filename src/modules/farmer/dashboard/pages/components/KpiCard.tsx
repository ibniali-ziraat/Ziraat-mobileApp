import { colors } from "@/src/constants/colors";
import { DollarSign, Percent, TrendingUp, Wallet, Wheat } from "lucide-react-native";
import { Text, View } from "react-native";

const icons = { Wallet, DollarSign, TrendingUp, Percent, Wheat };

export default function KpiCard({ item }) {
  const Icon = icons[item.icon];
  return (
    <View className="w-[49%] bg-white p-4 rounded-xl border border-dark">
      <View className="items-center mt-2 ">
        <Icon size={28} color={colors.secondary} />
        <Text className=" item-center text-left text-black font-bold text-xl">{item.title}</Text>
      </View>
    <Text className="text-md item-center text-center  text-black mt-3">{item.value}</Text>
      <Text className="text-md  item-center text-center  text-black mt-1">{item.subtitle}</Text>
    </View>
  );
}

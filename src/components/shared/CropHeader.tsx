import { colors } from "@/src/constants/colors";
import { Filter, Search } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface CropsHeaderProps {
  role?: "farmer" | "supplier"; // optional role prop
}

export default function CropsHeader({ role = "farmer" }: CropsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between h-16 bg-white">
      {/* Title & Subtitle */}
      <View>
        <Text className="text-lg font-bold" style={{ color: colors.dark }}>
          Crops
        </Text>

        <Text className="text-sm" style={{ color: colors.neutral }}>
          Manage Your Orchards & Fields
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row items-center space-x-3">
        {/* Search */}
        <TouchableOpacity
          className="p-2 rounded-full bg-white border mr-2"
          style={{ borderColor: colors.neutral }}
        >
          <Search color={colors.primary} size={20} />
        </TouchableOpacity>

        {/* Filter */}
        <TouchableOpacity
          className="p-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <Filter color={colors.secondary} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

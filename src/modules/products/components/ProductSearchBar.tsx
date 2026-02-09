import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { SlidersHorizontal } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

type Props = {
  search: string;
  setSearch: (text: string) => void;
  onFilterPress: () => void;
};

export default function ProductSearchBar({
  search,
  setSearch,
  onFilterPress,
}: Props) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1">
        <SearchBar search={search} setSearch={setSearch} />
      </View>

      <TouchableOpacity
        onPress={onFilterPress}
        className="h-12 w-12 rounded-full bg-light items-center justify-center"
        style={{ elevation: 3 }}
      >
        <SlidersHorizontal size={20} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

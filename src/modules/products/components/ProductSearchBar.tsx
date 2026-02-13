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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 16,
       

       
      }}
    >
      {/* SEARCH */}
      <View style={{ flex: 1 }}>
        <SearchBar search={search} setSearch={setSearch} />
      </View>

      {/* FILTER */}
      <TouchableOpacity
        onPress={onFilterPress}
        activeOpacity={0.85}
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: colors.secondary + "12",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <SlidersHorizontal size={21} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

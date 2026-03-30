import { colors } from "@/src/constants/colors";
import { LayoutGrid, List } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";



const GridListToggle = ({ isGrid, onToggle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 8,
        gap: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => onToggle(false)}
        style={{
          padding: 7,
          borderRadius: 10,
          backgroundColor: !isGrid ? colors.primary + "15" : "transparent",
        }}
      >
        <List size={20} color={!isGrid ? colors.primary : colors.neutral} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggle(true)}
        style={{
          padding: 7,
          borderRadius: 10,
          backgroundColor: isGrid ? colors.primary + "15" : "transparent",
        }}
      >
        <LayoutGrid size={20} color={isGrid ? colors.primary : colors.neutral} />
      </TouchableOpacity>
    </View>
  );
};

export default GridListToggle;
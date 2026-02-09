import { colors } from "@/src/constants/colors";
import { LucideIcon, Search } from "lucide-react-native";
import { Platform, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  search: string;
  setSearch: (text: string) => void;
  RightIcon?: LucideIcon;
  onIconPress?: () => void;
};
export default function SearchBar({
  search = "",
  setSearch,
  RightIcon,
  onIconPress,
  onPress,
  pressable = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressable ? onPress : undefined}
      disabled={!pressable}
      className="w-full pl-1"
      style={{ alignSelf: "stretch" }}
    >
      <View
        pointerEvents={pressable ? "none" : "auto"} // 🔑 KEY
        className="flex-row items-center bg-light rounded-full px-4"
        style={{
          height: 48,
          width: "100%",
          elevation: Platform.OS === "android" ? 4 : 0,

          ...(Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          }),

          ...(Platform.OS === "web" && {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          }),
        }}
      >
        <Search size={20} color={colors.secondary} strokeWidth={2} />

        <TextInput
          placeholder="Search products, brands, crops"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          editable={!pressable} // 🔑 disables typing when trigger
          autoCorrect={false}
          autoCapitalize="none"
          outlineColor="transparent"
          cursorColor={colors.neutral}
          underlineColor="transparent"
          selectionColor={colors.primary}
          textColor={colors.dark}
          style={{
            backgroundColor: "transparent",
            flex: 1,
            marginLeft: 12,
            fontSize: 16,
            height: 40,
            paddingVertical: 0,
            paddingTop: Platform.OS === "ios" ? 1 : 0,
          }}
        />

        {RightIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <RightIcon size={20} color={colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

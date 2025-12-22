import { colors } from "@/src/constants/colors";
import { LucideIcon, Search } from "lucide-react-native";
import { Platform, TouchableOpacity, View } from "react-native";

type Props = {
  search: string;
  setSearch: (text: string) => void;
  RightIcon?: LucideIcon;
  onIconPress?: () => void;
};

export default function SearchBar({
  search,
  setSearch,
  RightIcon,
  onIconPress,
}: Props) {
  return (
    <View
      className="w-full pl-1"
      style={{
        alignSelf: "stretch", // ✅ important for web
      }}
    >
      <View
        className="flex-row items-center bg-light rounded-full px-4"
        style={{
          height: 48,
          width: "100%", // ✅ stretch on web

          // Android shadow
          elevation: Platform.OS === "android" ? 4 : 0,

          // iOS shadow
          ...(Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          }),

          // Web shadow
          ...(Platform.OS === "web" && {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          }),
        }}
      >
        {/* Left Icon */}
        <Search size={20} color={colors.secondary} strokeWidth={2} />

        {/* Input */}
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
          allowFontScaling={false}
          multiline={false}
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 16,
            color: "#000",
            height: 40,
            paddingVertical: 0,
            paddingTop: Platform.OS === "ios" ? 1 : 0,
          }}
        />

        {/* Right Icon */}
        {RightIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <RightIcon size={20} color={colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

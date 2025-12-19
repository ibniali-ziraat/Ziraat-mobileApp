import { LucideIcon, Search } from "lucide-react-native";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";

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
    <View className="w-full flex justify-center items-center pl-1">
      <View
        className="
          flex-row
          items-center
          justify-center
          bg-light
          rounded-full
          px-4
        "
        style={{
          height: 48,
          // Android shadow
          elevation: Platform.OS === "android" ? 4 : 0,

          // iOS shadow
          ...(Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          }),
        }}
      >
        {/* Left Icon */}
        <Search size={20} color="#c7611f" strokeWidth={2} />

        {/* Input */}
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
          // 🔑 Important iOS fixes
          allowFontScaling={false}
          multiline={false}
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 16,
            color: "#000",

            // ✅ FIX: control height explicitly
            height: 40,

            // ✅ FIX: consistent padding
            paddingVertical: 0,
            paddingTop: Platform.OS === "ios" ? 1 : 0,
          }}
        />

        {/* Right Icon */}
        {RightIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <RightIcon size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

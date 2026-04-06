import { colors } from "@/src/constants/colors";
import { LucideIcon, Search, X } from "lucide-react-native";
import { Platform, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  search: string;
  setSearch: (text: string) => void;
  RightIcon?: LucideIcon;
  onIconPress?: () => void;
  onPress?: () => void;
  pressable?: boolean;
  placeholder?: string;
};

export default function SearchBar({
  search = "",
  setSearch,
  RightIcon,
  onIconPress,
  onPress,
  pressable = false,
  placeholder = "Search products, crops...",
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressable ? onPress : undefined}
      disabled={!pressable}
      className="w-full pl-1"
      style={{
        alignSelf: "stretch",
      }}
    >
      <View
        pointerEvents={pressable ? "none" : "auto"}
        className="flex-row items-center  rounded-full px-4"
        style={{
          height: 48,
          width: "100%",
          backgroundColor: colors.light,
          elevation: Platform.OS === "android" ? 4 : 0,

          ...(Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }),

          ...(Platform.OS === "web" && {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          }),
        }}
      >
        <Search size={20} color={colors.primary} strokeWidth={2} />

        <TextInput
          mode="flat"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          editable={!pressable}
          autoCorrect={false}
          autoCapitalize="none"
          outlineColor="transparent"
          cursorColor={colors.neutral}
          selectionColor={colors.primary}
          textColor={colors.dark}
          style={{
            backgroundColor: "transparent",
            flex: 1,
            fontSize: 16,
            height: 40,
            paddingVertical: 0,
            paddingTop: Platform.OS === "ios" ? 1 : 0,
          }}
        />

        {/* CLEAR X */}
        {!!search && (
          <TouchableOpacity
            onPress={() => setSearch("")}
            style={{
              marginRight: RightIcon ? 8 : 0,
            }}
          >
            <X size={18} color={colors.neutral} />
          </TouchableOpacity>
        )}

        {RightIcon && (
          <TouchableOpacity onPress={onIconPress}>
            <RightIcon size={20} color={colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function SectionCard({
  title,
  icon,
  onEdit,
  onDelete,
  children,
  style,
}) {
  return (
    <View className="  rounded-sm mb-5 mt-5" style={style}>
      <View className="flex-row justify-between mb-3">
        {/* LEFT : Icon + Title */}
        <View className="flex-row items-center gap-2">
          {icon}
          <CsText className="text-lg font-semibold">{title}</CsText>
        </View>

        {/* RIGHT : Edit/Delete */}
        <View className="flex-row gap-3">
          {onEdit && (
            <Pressable onPress={onEdit}>
              <Feather name="edit-3" size={18} color={colors.primary} />
            </Pressable>
          )}

          {onDelete && (
            <Pressable onPress={onDelete}>
              <Feather name="trash-2" size={18} color="red" />
            </Pressable>
          )}
        </View>
      </View>

      {children}
    </View>
  );
}

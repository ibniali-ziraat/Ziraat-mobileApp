import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  count: number;
  onClearAll: () => void;
}

export default function NotificationHeader({ count, onClearAll }: Props) {
  return (
    <View className="flex-row justify-between items-end pt-2 pb-4">
      <View>
        <Text
          className="text-[14px] mt-[2px] font-medium"
          style={{ color: colors.darkHover }}
        >
          {count > 0
            ? `${count} message${count !== 1 ? "s" : ""}`
            : "No new messages yet"}
        </Text>
      </View>

      {count > 0 && (
        <Pressable
          onPress={onClearAll}
          className="flex-row items-center gap-[5px] rounded-[10px] px-3 py-[2px]"
        >
          <Trash2 size={14} color={colors.secondary} />

          <Text
            className="text-[13px] font-semibold"
            style={{ color: colors.secondary }}
          >
            Clear all
          </Text>
        </Pressable>
      )}
    </View>
  );
}

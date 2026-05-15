import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  count: number;
  onClearAll: () => void;
}

export default function NotificationHeader({ count, onClearAll }: Props) {
  return (
    <View className="flex-row justify-between items-end pt-4 pb-4">
      <View>
        <Text
          className="text-[28px] font-extrabold tracking-[-0.5px]"
          style={{ color: colors.dark }}
        >
          Notifications
        </Text>

        <Text
          className="text-[13px] mt-[2px] font-medium"
          style={{ color: colors.darkHover }}
        >
          {count > 0
            ? `${count} message${count !== 1 ? "s" : ""}`
            : "See what's new and get notified about important updates"}
        </Text>
      </View>

      {count > 0 && (
        <Pressable
          onPress={onClearAll}
          className="flex-row items-center gap-[5px] rounded-[10px] px-3 py-[2px]"
          // style={{ backgroundColor: colors.bgColor }}
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

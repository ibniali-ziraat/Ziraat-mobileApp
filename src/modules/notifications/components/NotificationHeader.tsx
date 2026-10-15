import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  count: number;
  onClearAll: () => void;
}

export default function NotificationHeader({ count, onClearAll }: Props) {
  return (
    <View className="flex-row items-center justify-between pt-2 pb-3">
      <View>
        <Text className="text-[20px] font-bold text-black">Notifications</Text>

        <Text
          className="text-[15px] mt-[2px]"
          style={{ color: colors.darkHover }}
        >
          {count > 0
            ? `${count} message${count !== 1 ? "s" : ""}`
            : "No new messages"}
        </Text>
      </View>

      {count > 0 && (
        <Pressable
          onPress={onClearAll}
          className="flex-row items-center px-3 py-[6px] rounded-full border"
          style={{
            borderColor: "#E5E7EB",
            backgroundColor: "#FAFAFA",
          }}
        >
          <Trash2 size={14} color={colors.secondary} />

          <Text
            className="text-[14px] font-medium ml-1"
            style={{ color: colors.secondary }}
          >
            Clear all
          </Text>
        </Pressable>
      )}
    </View>
  );
}

import { Text, View } from "react-native";

export default function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <View className="flex-row justify-between py-2">
      <Text className="text-[14px] font-medium text-black">
        {label}
      </Text>
      <Text className="text-[13px] font-semibold text-black text-right max-w-[60%]">
        {value !== undefined && value !== null && value !== ""
          ? String(value)
          : "-"}
      </Text>
    </View>
  );
}

import { Text, TouchableOpacity, View } from "react-native";

export default function EnhancedCard({
  title,
  subtitle,
  value,
  accent,
  icon,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-light rounded-2xl px-4 py-4 mx-4 mb-4 flex-row justify-between items-center border border-neutral"
    >
      {/* LEFT SECTION */}
      <View className="flex-1 pr-4">
        {/* Title - 18px bold */}
        <Text className="text-[18px] font-bold text-dark">{title}</Text>

        {/* Subtitle - 16px medium */}
        <Text className="text-[16px] font-medium  mt-1">
          {subtitle}
        </Text>

        {/* Value + Accent below subtitle */}
        {(value || accent) && (
          <View className="mt-2">
            {value && (
              <Text className="text-[15px] font-semibold text-primary">
                {value}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* RIGHT SIDE ICON (Full height) */}
      <View className="h-30 justify-center items-center  rounded-xl px-3 py-4">
        {icon}
      </View>
    </TouchableOpacity>
  );
}

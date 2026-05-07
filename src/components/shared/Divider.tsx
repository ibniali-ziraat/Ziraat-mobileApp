import { Text, View } from "react-native";

type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className = "my-6" }: DividerProps) {
  return (
    <View className={`flex-row items-center ${className}`}>
      <View className="flex-1 h-px bg-neutral/20" />

      {label ? (
        <Text className="mx-3 text-sm text-neutral/60">{label}</Text>
      ) : null}

      <View className="flex-1 h-px bg-neutral/20" />
    </View>
  );
}

import { Image, Pressable, Text, View } from "react-native";

type GoogleAuthButtonProps = {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
};

export function GoogleAuthButton({
  label = "Continue with Google",
  onPress,
  disabled = false,
}: GoogleAuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`
        flex-row items-center mb-4
        h-12
        rounded-lg
        border
        border-gray-300
        bg-light
        px-4
        ${disabled ? "opacity-50" : "active:scale-[0.98]"}
      `}
    >
      <Image
        source={require("@/assets/images/google-logo.png")}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          flexShrink: 0,
        }}
      />

      <View className="flex-1 items-center">
        <Text className="text-[15px] font-medium text-neutral">{label}</Text>
      </View>
    </Pressable>
  );
}

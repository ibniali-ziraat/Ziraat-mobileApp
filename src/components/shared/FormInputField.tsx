import { colors } from "@/src/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  children: React.ReactNode;
};

export default function FormInputField({ title, icon, children }: Props) {
  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View
          className="w-9 h-9 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${colors.secondary}20` }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.secondary}
          />
        </View>

        <Text className="text-lg font-semibold text-black">
          {title}
        </Text>
      </View>

      {/* Content */}
      <View className="space-y-4">
        {children}
      </View>
    </View>
  );
}

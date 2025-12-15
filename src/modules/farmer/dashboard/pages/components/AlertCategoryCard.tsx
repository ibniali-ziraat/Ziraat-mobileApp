import { Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function AlertCategoryCard({ icon, title, delay }: any) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay)}
      className="bg-white rounded-xl border border-dark p-4 mb-3 flex-row items-center"
    >
      {icon}
      <Text className="ml-3 text-xl font-semibold">{title}</Text>
    </Animated.View>
  );
}

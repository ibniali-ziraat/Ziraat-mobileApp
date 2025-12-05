import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function ScoreRow({ label, value, color }) {
    const percent = Number(String(value).replace("%", ""));

    const barStyle = useAnimatedStyle(() => ({
        width: withTiming(`${percent}%`, { duration: 600 }),
    }));

    return (
        <View className="mb-3">
            <Text className="text-sm text-black font-medium">{label}</Text>

            <View className="h-2 w-full rounded-full bg-neutral/10 mt-2 overflow-hidden">
                <Animated.View
                    style={[barStyle, { height: 8, backgroundColor: color, borderRadius: 999 }]}
                />
            </View>

            <Text className="text-xs text-black opacity-60 mt-1">{value}</Text>
        </View>
    );
}

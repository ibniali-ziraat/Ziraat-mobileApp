import { View, Text } from "react-native";

export default function ChatHeader({ status }) {
    return (
        <View className="flex-row items-center justify-between p-4 bg-green-900">

            <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🕌</Text>

                <View>
                    <Text className="text-white font-bold text-lg">
                        Kashmir Craft Assistant
                    </Text>
                    <Text className="text-green-200 text-xs">
                        Authentic GI-Certified Handicrafts
                    </Text>
                </View>
            </View>

            <View
                className={`w-3 h-3 rounded-full ${status === "ready" ? "bg-green-400" : "bg-yellow-400"
                    }`}
            />
        </View>
    );
}
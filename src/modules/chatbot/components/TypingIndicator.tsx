import { View, Text } from "react-native";

export default function TypingIndicator() {
    return (
        <View className="flex-row items-center mb-2">
            <Text className="mr-2">🤖</Text>
            <View className="bg-gray-200 px-4 py-2 rounded-full">
                <Text>Typing...</Text>
            </View>
        </View>
    );
}
import { Text, View } from "react-native";
import { Sun } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value?: number;
    level?: string;
};

export function UVIndexCard({
    value = 2,
    level = "Low",
}: Props) {
    return (
        <ZiraatCard
            width="48%"
            height="9%"
            paddingHorizontal={1}
            paddingVertical={1}
            marginBottom={1}
            className="justify-between"
        >
            {/* Header */}
            <View className="flex-row items-center mb-1">
                <Sun size={16} color="#c7611f" />
                <Text className="ml-2 text-xs font-bold tracking-wide text-neutral-500">
                    UV INDEX
                </Text>
            </View>

            {/* Value */}
            <Text className="text-3xl font-bold text-neutral-900">
                {value}
            </Text>

            {/* Level */}
            <Text className="text-sm text-neutral-500 mb-2">
                {level}
            </Text>

            {/* Gradient bar */}
            <View className="flex-row h-1.5 rounded-full overflow-hidden">
                <View className="flex-1 bg-green-500" />
                <View className="flex-1 bg-yellow-400" />
                <View className="flex-1 bg-orange-400" />
                <View className="flex-1 bg-red-500" />
                <View className="flex-1 bg-purple-600" />
            </View>

            {/* Note */}
            <Text className="text-xs text-neutral-500 mt-2">
                Low for the rest of the day.
            </Text>
        </ZiraatCard>
    );
}

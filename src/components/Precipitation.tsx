import { Text, View } from "react-native";
import { Droplets } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    amount?: string;
    note?: string;
};

export function Precipitation({
    amount = `0"`,
    note = "None expected in next 10 days.",
}: Props) {
    return (
        <ZiraatCard
            width="48%"
            height="22%"
            marginVertical={0.2}
            paddingHorizontal={1}
            paddingVertical={1}
            marginBottom={1}
            className="justify-between"
        >
            {/* Header */}
            <View className="flex-row items-center mb-1">
                <Droplets size={16} color="#c7611f" />
                <Text className="ml-2 text-xs font-bold tracking-wide text-neutral-500">
                    PRECIPITATION
                </Text>
            </View>

            {/* Amount */}
            <Text className="text-3xl font-bold text-neutral-900">
                {amount}
            </Text>

            {/* Subtext */}
            <Text className="text-sm text-neutral-500 mb-1">
                in last 24 hours
            </Text>

            {/* Note */}
            <Text className="text-xs text-neutral-500">
                {note}
            </Text>
        </ZiraatCard>
    );
}

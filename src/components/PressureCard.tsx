import { Text, View } from "react-native";
import { Gauge } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    pressure?: number;
};

export function PressureCard({
    pressure = 1018,
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
                <Gauge size={16} color="#c7611f" />
                <Text className="ml-2 text-xs font-bold tracking-wide text-neutral-500 uppercase">
                    Pressure
                </Text>
            </View>

            {/* Value */}
            <Text className="text-3xl font-bold text-neutral-900">
                {pressure} hPa
            </Text>

            {/* Note */}
            <Text className="text-xs text-neutral-500 mt-2">
                Normal range
            </Text>
        </ZiraatCard>
    );
}

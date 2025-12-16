import { View, Text } from "react-native";
import { Wind } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";
import WindCompass from "./WindCompass";

type Props = {
    speed: number;
    gusts: number;
    degree: number;
    direction: string;
};

export default function WindCard({
    speed,
    gusts,
    degree,
    direction,
}: Props) {
    return (
        <ZiraatCard
            width="100%"
            height="5%"
            paddingHorizontal={1.5}
            paddingVertical={1.5}
        >
            <View className="flex-row items-center mb-3">
                <Wind size={16} color="#c7611f" />
                <Text className="ml-2 text-sm font-semibold text-[#c7611f]">
                    WIND
                </Text>
            </View>

            {/* CONTENT */}
            <View className="flex-row justify-between items-center">
                {/* LEFT DATA */}
                <View className="w-[55%]">
                    <Row label="Wind  ---- 2kph" />
                    <Row label="Gusts ---- 8kph " />
                    <Row
                        label="Direction ---- 233° SW"

                    />
                </View>

                {/* COMPASS */}
                <View className="w-[45%] items-center justify-center">
                    <WindCompass speed={speed} degree={degree} />
                </View>
            </View>
        </ZiraatCard>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-neutral-700">
                {label}
            </Text>
            <Text className="text-sm font-medium text-neutral-900">
                {value}
            </Text>
        </View>
    );
}

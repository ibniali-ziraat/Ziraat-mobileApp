import { View, Text } from "react-native";
import { Droplets } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value: number; // 89
    note: string;  // "The dew point is 13° right now."
};

export default function HumidityCard({ value, note }: Props) {
    return (
        <ZiraatCard width="48%"
            height="22%"
            paddingHorizontal={1.4} paddingVertical={1.4}>
            {/* HEADER */}
            <View className="flex-row items-center mb-2">
                <Droplets size={14} color="#c7611f" />
                <Text className="ml-2 text-xs font-semibold tracking-wide text-dark">
                    HUMIDITY
                </Text>
            </View>

            {/* VALUE */}
            <Text className="text-3xl font-bold text-dark">
                {value} 89%
            </Text>

            {/* DESCRIPTION */}
            <Text className="mt-2 text-sm leading-5 text-dark">
                {note} "The dew point is 13° right now
            </Text>
        </ZiraatCard>
    );
}

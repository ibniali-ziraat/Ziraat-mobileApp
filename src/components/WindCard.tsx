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
            paddingHorizontal={1.6}
            paddingVertical={1.6}
        >
            {/* HEADER */}
            <View className="flex-row items-center mb-3">
                <Wind size={16} color="#c7611f" />
                <Text className="ml-2 text-md font-semibold tracking-wide text-dark">
                    WIND
                </Text>
            </View>


            <View className="flex-row justify-between items-center ">

                <View className="w-[55%]">
                    <Row label="Wind" value={`2 kph `} />
                    <Row label="Gusts" value={`8 kph `} />
                    <Row label="Direction" value={`123 ESE `} />

                </View>


                <View className="w-[52%] items-center">
                    <WindCompass speed={speed} degree={degree} />
                    <Text className="mt-1 text-sm font-semibold text-dark">
                        {direction}
                    </Text>
                </View>
            </View>
        </ZiraatCard>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-dark">{label}</Text>
            <Text className="text-sm font-medium text-dark">{value}</Text>
        </View>
    );
}

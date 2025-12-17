import { Droplets } from "lucide-react-native";
import { Text, View } from "react-native";
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
            paddingHorizontal={1}
            paddingVertical={1}
            className="justify-between"
        >

            <View className="flex-row items-center mb-1">
                <Droplets size={16} color="#c7611f" />
                <Text className="ml-2 text-sm font-bold tracking-wide text-dark">
                    PRECIPITATION
                </Text>
            </View>


            <Text className="text-3xl font-bold text-dark">
                {amount}
            </Text>


            <Text className="text-sm text-dark pt-2">
                In last 24 hours
            </Text>


            <Text className="text-xs text-dark pt-2">
                {note}
            </Text>
        </ZiraatCard>
    );
}

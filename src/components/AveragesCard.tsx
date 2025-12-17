import { View, Text } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";
import { Line } from "react-native-svg";
import { GitGraph } from "lucide-react-native";

export default function AveragesCard() {
    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1}
            paddingVertical={1}
            className="border border-white"
        >
            <View className="justify-center">
                <View className="flex-row items-center mb-1">
                    <GitGraph size={16} color="#c7611f" />
                    <Text className="ml-2 text-sm font-bold tracking-wide text-dark">
                        AVERAGES
                    </Text>
                </View>

                <Text className="text-3xl font-bold text-dark">
                    +1°
                </Text>


                <Text className="mt-1 text-xs text-dark">
                    Above average daily high.
                </Text>
                <Text className="mt-1 text-xs text-dark">
                    Today Average ----------- H:15---- H:8

                </Text>
            </View>
        </ZiraatCard>
    );
}

import { GitGraph } from "lucide-react-native";
import { Text, View } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function AveragesCard() {
    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1}
            paddingVertical={1}
            className="border border-white"
        >
            <View className=" flex justify-center">
                <View className="flex-row items-center mb-1">
                    <GitGraph size={16} color="#c7611f"/>
                    <Text className="ml-2 text-sm font-bold tracking-wide text-dark">
                        AVERAGES
                    </Text>
                </View>

                <Text className="text-3xl font-bold text-dark">
                    +1°
                </Text>


                <Text className=" text-xs text-dark pt-2">
                    Above average daily high.
                </Text>
                <Text className="text-xs text-dark pt-2">
                    Today Average --- H:15 --- H:8

                </Text>
            </View>
        </ZiraatCard>
    );
}

import { View, Text } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";
import { Thermometer } from "lucide-react-native";

type Props = {
    temp: number;
};

export default function FeelsLikeCard({ temp }: Props) {
    return (
        <ZiraatCard
            width="48%"
            // height="15%"
            marginVertical={1}
            paddingHorizontal={1}
            paddingVertical={1}

        >
            <View className="flex-row items-center mb-2">
                <Thermometer size={18} color="#c7611f" />
                <Text className="ml-2 text-sm font-semibold tracking-wide text-dark">
                    Feels Like
                </Text>
            </View>


            <Text className="mt-1 text-3xl font-bold text-dark">
                {temp}°
            </Text>
            <Text className="mt-1 text-sm  text-dark">
                use sun protection as a weather becomes day.
            </Text>


            <Text className="mt-1 text-sm leading-5 text-dark">
                Similar to the actual temperature.
            </Text>
        </ZiraatCard>
    );
}

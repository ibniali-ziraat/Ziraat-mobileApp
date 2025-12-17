import { Umbrella } from "lucide-react-native";
import { Text, View } from "react-native";
import PrecipitationMap from "./PrecipitationMap";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function PrecipitationCard() {
    return (
        <ZiraatCard
            width="100%"
            paddingHorizontal={1.4}
            paddingVertical={1.4}
            marginTop={1}
            className="border border-white"
        >

            <View className="flex-row items-center mb-3">
                <Umbrella size={18} color="#c7611f" />
                <Text className="ml-2 text-md font-semibold tracking-wide text-neutral-600">
                    PRECIPITATION
                </Text>
            </View>


            <PrecipitationMap />
        </ZiraatCard>
    );
}

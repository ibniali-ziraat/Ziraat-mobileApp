import { View, Text } from "react-native";
import { Eye } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    distance: string;
    note: string;
};

export default function VisibilityCard({ distance, note }: Props) {
    return (
        <ZiraatCard
            width="48%"
            // marginVertical={0.5}
            paddingHorizontal={1.4}
            paddingVertical={1.4}>
            <View className="flex-row items-center mb-2">
                <Eye size={18} color="#c7611f" />
                <Text className="ml-2 text-md font-semibold tracking-wide text-dark">
                    VISIBILITY
                </Text>
            </View>
            <Text className="text-3xl font-bold text-dark">
                {distance} 10km
            </Text>


            <Text className="mt-1 text-sm leading-5 text-dark">
                {note} Light haze is affecting visibility.
            </Text>
            <Text className=" mt-1 text-sm text-left text-dark">
                {note}  Perfect Clear View.
            </Text>
        </ZiraatCard>
    );
}

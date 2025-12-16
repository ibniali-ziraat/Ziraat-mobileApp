import { View, Text } from "react-native";
import { Eye } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    distance: string; // "10 km"
    note: string;     // "Light haze is affecting visibility."
};

export default function VisibilityCard({ distance, note }: Props) {
    return (
        <ZiraatCard width="48%"
            height="22%"
            marginVertical={0.5}
            paddingHorizontal={1.4}
            paddingVertical={1.4}>
            <View className="flex-row items-center mb-2">
                <Eye size={14} color="#c7611f" />
                <Text className="ml-2 text-sm font-semibold tracking-wide text-dark">
                    VISIBILITY
                </Text>
            </View>
            <Text className="text-3xl font-bold text-dark">
                {distance} 10km
            </Text>


            <Text className="mt-2 text-sm leading-5 text-dark">
                {note} Light haze is affecting visibility.
            </Text>
        </ZiraatCard>
    );
}

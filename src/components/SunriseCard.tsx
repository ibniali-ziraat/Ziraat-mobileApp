import { Sunrise, Sunset } from "lucide-react-native";
import { Text, View } from "react-native";

export default function SunriseCard({ sunrise, sunset }) {
    return (
        <View className="bg-white rounded-2xl p-4 mb-4 border border-neutral border-sm shadow-md">

            <Text className="text-black text-md font-semibold mb-3">Sunrise & Sunset</Text>
            <View className="flex-row items-center mb-2">
                <Sunrise size={20} color="#c7611f" />
                <Text className="text-black text-lg font-semibold ml-2">
                    {sunrise}
                </Text>
            </View>




            <View className="flex-row items-center mt-3">
                <Sunset size={20} color="#c6711f" />
                <Text className="text-black text-xs ml-2">
                    {sunset}
                </Text>
            </View>
        </View>
    );
}

import { Text, View } from "react-native";
import { Sunset } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  sunset?: string;
  sunrise?: string;
};

export function SunsetCard({
  sunset = "6:03 PM",
  sunrise = "7:18 AM",
}: Props) {
  return (
    <ZiraatCard
      width="48%"
      height="25%"
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={1}
      className="justify-between"
    >
      {/* Header */}
      <View className="flex-row items-center mb-1">
        <Sunset size={16} color="#c7611f" />
        <Text className="ml-2 text-xs font-bold tracking-wide text-neutral-500">
          SUNSET
        </Text>
      </View>

      {/* Time */}
      <Text className="text-3xl font-bold text-neutral-900">
        {sunset}
      </Text>

      {/* Curve */}
      <View className="relative h-10 justify-center mt-2">
        <View className="absolute w-full h-[2px] bg-neutral-300 rounded-full" />
        <View className="absolute right-6 w-2.5 h-2.5 rounded-full bg-neutral-900" />
      </View>

      {/* Sunrise */}
      <Text className="text-xs text-neutral-500 mt-1">
        Sunrise: {sunrise}
      </Text>
    </ZiraatCard>
  );
}

import { View, Text } from "react-native";
import { Sun } from "lucide-react-native";
import Svg, { Line, Circle } from "react-native-svg";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value: number;
    level: string;
    advice: string;
};

export default function UVCard({ value, level, advice }: Props) {
    const BAR_WIDTH = 150;
    const markerX = Math.min(Math.max((value / 11) * BAR_WIDTH, 0), BAR_WIDTH);

    return (
        <ZiraatCard
            width="48%"
            height="22%"
            paddingHorizontal={1.4}
            paddingVertical={1.4}
        >
            <View className="flex-row items-center">
                <Sun size={14} color="#c7611f" />
                <Text className="ml-1.5 text-sm font-semibold tracking-wide text-dark">
                    UV INDEX
                </Text>
            </View>


            <Text className="mt-1 text-3xl font-bold text-dark">
                {value} 1
            </Text>
            <Text className="text-md text-dark">
                {level} Low
            </Text>


            <Svg
                width={BAR_WIDTH}
                height={14}
                style={{ marginVertical: 10 }}
            >
                <Line x1="0" y1="7" x2="30" y2="7" stroke="#22C55E" strokeWidth="4" />
                <Line x1="30" y1="7" x2="60" y2="7" stroke="#FACC15" strokeWidth="4" />
                <Line x1="60" y1="7" x2="90" y2="7" stroke="#F97316" strokeWidth="4" />
                <Line x1="90" y1="7" x2="120" y2="7" stroke="#EF4444" strokeWidth="4" />
                <Line x1="120" y1="7" x2="150" y2="7" stroke="#A855F7" strokeWidth="4" />

                {/* MARKER */}
                <Circle
                    cx={markerX}
                    cy={7}
                    r={4}
                    fill="#c7611f"
                />
            </Svg>


            <Text className="text-sm leading-5 text-dark">
                {advice} Low for the rest of the day.
            </Text>
        </ZiraatCard>
    );
}

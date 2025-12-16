import { View, Text } from "react-native";
import { Gauge } from "lucide-react-native";
import Svg, { Circle, Line, G } from "react-native-svg";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value: number;
};

export default function PressureCard({ value }: Props) {
    const size = 120;
    const center = size / 2;
    const radius = 44;

    const angle = ((value - 980) / (1040 - 980)) * 180 - 90;

    return (
        <ZiraatCard width="48%"
            height="22%"
            paddingHorizontal={1.4}
            paddingVertical={1.4}>

            <View className="flex-row items-center mb-2">
                <Gauge size={14} color="#c7611f" />
                <Text className="ml-2 text-sm font-semibold tracking-wide text-dark">
                    PRESSURE
                </Text>

            </View>


            <View className="items-center">
                <Svg width={size} height={size}>

                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#c7611f"
                        strokeWidth={6}
                        fill="none"
                        strokeDasharray="2 6"
                    />


                    <G rotation={angle} origin={`${center}, ${center}`}>
                        <Line
                            x1={center}
                            y1={center}
                            x2={center}
                            y2={center - 38}
                            stroke="#000000"
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                    </G>


                    <Circle cx={center} cy={center} r={4} fill="#000000" />
                </Svg>


                <Text className="mt-1 text-lg font-semibold text-dark">

                </Text>


                <View className="mt-1 flex-row justify-between ">
                    <Text className="text-sm text-dark">Low</Text>
                    <Text className="text-sm text-dark">High</Text>
                </View>
            </View>
        </ZiraatCard>
    );
}

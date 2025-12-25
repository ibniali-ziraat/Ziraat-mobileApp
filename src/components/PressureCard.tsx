import { Gauge } from "lucide-react-native";
import { View } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value: number;
};

export default function PressureCard({ value }: Props) {
    const SIZE = 120;
    const CENTER = SIZE / 2;
    const RADIUS = 44;
    const angle = Math.min(
        Math.max(((value - 980) / (1040 - 980)) * 180 - 90, -90),
        90
    );

    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1}
            paddingVertical={1}
            className="border border-white"
        >

            <View className="flex-row items-center">
                <Gauge size={18} color="#c7611f" />
                <CsText className="ml-2 text-md font-semibold tracking-wide text-dark">
                    PRESSURE
               </CsText>
            </View>


            <View className="items-center">
                <Svg width={SIZE} height={SIZE / 1.2}>

                    <Path
                        d={`
              M ${CENTER - RADIUS} ${CENTER}
              A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}
            `}
                        stroke="#000000"
                        strokeWidth={6}
                        fill="none"
                        strokeDasharray="2 6"
                    />


                    <G rotation={angle} origin={`${CENTER}, ${CENTER}`}>
                        <Line
                            x1={CENTER}
                            y1={CENTER}
                            x2={CENTER}
                            y2={CENTER - 50}
                            stroke="#c7611f"
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                    </G>


                    <Circle cx={CENTER} cy={CENTER} r={4} fill="#c7611f" />
                </Svg>
                <View className=" w-full flex-row justify-between px-4">
                    <CsText className="text-xs text-neutral-500">Low</CsText>
                    <CsText className="text-xs text-neutral-500">High</CsText>
                </View>
            </View>
        </ZiraatCard>
    );
}

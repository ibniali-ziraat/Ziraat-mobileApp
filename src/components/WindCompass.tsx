import { View } from "react-native";
import Svg, { Circle, G, Line, Text as SvgText } from "react-native-svg";

type Props = {
    speed: number;
    degree: number;
};

export default function WindCompass({ speed, degree }: Props) {
    const SIZE = 120;
    const CENTER = SIZE / 2;
    const RADIUS = 46;

    return (
        <View className="items-center justify-center">
            <Svg width={SIZE} height={SIZE}>
                <Circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    stroke="#000000"
                    strokeWidth={6}
                    fill="none"
                    strokeDasharray="2 5"
                />


                <SvgText x={CENTER} y={12} fontSize="12" fill="#000000" textAnchor="middle">N</SvgText>
                <SvgText x={SIZE - 10} y={CENTER + 4} fontSize="12" fill="#000000" textAnchor="middle">E</SvgText>
                <SvgText x={CENTER} y={SIZE - 4} fontSize="12" fill="#000000" textAnchor="middle">S</SvgText>
                <SvgText x={10} y={CENTER + 4} fontSize="12" fill="#000000" textAnchor="middle">W</SvgText>


                <G rotation={degree} origin={`${CENTER}, ${CENTER}`}>
                    <Line
                        x1={CENTER}
                        y1={CENTER}
                        x2={CENTER}
                        y2={CENTER - 38}
                        stroke="#c7611f"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                    />
                </G>


                <Circle cx={CENTER} cy={CENTER + 38} r={3.8} fill="#c7611f" />


                <SvgText
                    x={CENTER}
                    y={CENTER + 6}
                    fontSize="18"
                    fill="#000000"
                    textAnchor="middle"
                    fontWeight="600"
                >
                    {speed}
                </SvgText>
                <SvgText
                    x={CENTER}
                    y={CENTER + 22}
                    fontSize="10"
                    fill="#000000"
                    textAnchor="middle"
                >
                    mph
                </SvgText>
            </Svg>
        </View>
    );
}

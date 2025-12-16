import { View } from "react-native";
import Svg, { Circle, Line, G, Text as SvgText } from "react-native-svg";

type Props = {
    speed: number;
    degree: number;
};

export default function WindCompass({ speed, degree }: Props) {
    const size = 120;
    const center = size / 2;
    const radius = 48;

    return (
        <View>
            <Svg width={size} height={size}>
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#c7611f"
                    strokeWidth={2}
                    fill="none"
                />


                {[
                    { t: "N", x: center, y: 14 },
                    { t: "E", x: size - 12, y: center + 4 },
                    { t: "S", x: center, y: size - 6 },
                    { t: "W", x: 8, y: center + 4 },
                ].map((d, i) => (
                    <SvgText
                        key={i}
                        x={d.x}
                        y={d.y}
                        fontSize="10"
                        fill="#000000"
                        textAnchor="middle"
                    >
                        {d.t}
                    </SvgText>
                ))}
                <G rotation={degree} origin={`${center}, ${center}`}>
                    <Line
                        x1={center}
                        y1={center}
                        x2={center}
                        y2={center - 40}
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />
                </G>


                <Circle cx={center} cy={center} r={4} fill="#00000" />


                <SvgText
                    x={center}
                    y={center + 30}
                    fontSize="14"
                    fill="#000000"
                    textAnchor="middle"
                >
                    {speed} km/h
                </SvgText>
            </Svg>
        </View>
    );
}

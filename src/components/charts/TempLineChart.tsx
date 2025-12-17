import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

export default function TempLineChart({
    data,
    minTemp = 16,
    maxTemp = 22,
    height = 40,
    pointGap = 80,
}) {
    const mapTempToY = (temp) => {
        const range = maxTemp - minTemp;
        const normalized = (temp - minTemp) / range;
        return height - normalized * height;
    };

    const points = data.map((item, index) => ({
        x: index * pointGap + 10,
        y: mapTempToY(item.temp),
    }));


    const path = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    return (
        <View style={{ height, marginTop: 8 }}>
            <Svg width={data.length * pointGap} height={height}>

                <Path
                    d={path}
                    stroke="#c7611f"   // yellow line like screenshot
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                />

                {points.map((p, i) => (
                    <Circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={4}
                        fill="#c7611f"
                    />
                ))}
            </Svg>
        </View>
    );
}

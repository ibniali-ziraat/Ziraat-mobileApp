import { Wind } from "lucide-react-native";
import { Animated, Text, View } from "react-native";
import ZiratCard from "./shared/ZiratCard";

export default function WindCard({ speed, gust, dir }) {
    const degMap = {
        N: 0,
        NE: 45,
        E: 90,
        SE: 135,
        S: 180,
        SW: 225,
        W: 270,
        NW: 315,
    };

    const deg = degMap[dir] ?? 0;

    return (
        <ZiratCard
            title="Wind"
            subtitle="Speed, gusts & direction"
            leftIcon={<Wind size={20} color="#c7611f" />}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                {/* LEFT: Wind details */}
                <View style={{ gap: 10 }}>
                    {/* Speed */}
                    <View>
                        <Text style={{ fontSize: 12, color: "#6B7280" }}>
                            Wind Speed
                        </Text>
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "700",
                                color: "#111827",
                            }}
                        >
                            {speed} kph
                        </Text>
                    </View>

                    {/* Gusts */}
                    <View>
                        <Text style={{ fontSize: 12, color: "#6B7280" }}>
                            Gusts
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                            {gust} kph
                        </Text>
                    </View>

                    {/* Direction */}
                    <View>
                        <Text style={{ fontSize: 12, color: "#6B7280" }}>
                            Direction
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                            {dir} ({deg}°)
                        </Text>
                    </View>
                </View>

                {/* RIGHT: Compass */}
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View
                        style={{
                            width: 110,
                            height: 110,
                            borderRadius: 55,
                            borderWidth: 2,
                            borderColor: "#c7611f",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Cardinal points */}
                        <Text style={{ position: "absolute", top: 6, fontSize: 10, color: "#6B7280" }}>N</Text>
                        <Text style={{ position: "absolute", bottom: 6, fontSize: 10, color: "#6B7280" }}>S</Text>
                        <Text style={{ position: "absolute", left: 6, fontSize: 10, color: "#6B7280" }}>W</Text>
                        <Text style={{ position: "absolute", right: 6, fontSize: 10, color: "#6B7280" }}>E</Text>

                        {/* Rotating wind icon */}
                        <Animated.View
                            style={{
                                transform: [{ rotate: `${deg}deg` }],
                            }}
                        >
                            <Wind size={42} color="#c7611f" />
                        </Animated.View>
                    </View>

                    <Text
                        style={{
                            marginTop: 6,
                            fontSize: 12,
                            color: "#6B7280",
                        }}
                    >
                        {speed} kph • {dir}
                    </Text>
                </View>
            </View>
        </ZiratCard>
    );
}

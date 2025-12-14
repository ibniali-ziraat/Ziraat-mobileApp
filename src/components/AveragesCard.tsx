import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ZiratCard from "./shared/ZiratCard";

export default function AveragesCard() {
    return (
        <ZiratCard
            style={{ width: "48%" }}
            title="Averages"
            subtitle="Today’s temperature average"
            leftIcon={
                <Ionicons
                    name="analytics-outline"
                    size={22}
                    color="#c7611f"
                />
            }
        >
            <View>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: "#111827",
                    }}
                >
                    +1°
                </Text>

                <Text
                    style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "#6B7280",
                    }}
                >
                    Above today’s high
                </Text>
            </View>
        </ZiratCard>
    );
}

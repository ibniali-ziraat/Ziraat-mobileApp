import { View, Text } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function AveragesCard() {
    return (
        <ZiraatCard
            width="100%"
            height="2%"

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
        </ZiraatCard>
    );
}

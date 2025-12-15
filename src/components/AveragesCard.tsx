import { View, Text } from "react-native";
import ZiratCard from "./shared/ZiratCard";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function AveragesCard() {
    return (
        <ZiraatCard
            width={250}
            height={150}

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

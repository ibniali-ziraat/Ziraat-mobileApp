import { Text, View, StyleSheet } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    humidity?: number;
};

export default function HumidityCard({
    humidity = 62,
}: Props) {
    return (
        <ZiraatCard
            width="48%"
            height={140}
            paddingHorizontal={1}
            paddingVertical={1}
            marginBottom={1}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Humidity</Text>

                <Text style={styles.value}>
                    {humidity}%
                </Text>

                <Text style={styles.note}>
                    Dew point −6°
                </Text>
            </View>
        </ZiraatCard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 6,
    },
    value: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
    },
    note: {
        marginTop: 6,
        fontSize: 12,
        color: "#6B7280",
    },
});

import { View, Text, StyleSheet } from "react-native";
import { Sun } from "lucide-react-native";
import ZiratCard from "./shared/ZiratCard";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value?: number;
    level?: string;
};

export default function UVIndexCard({
    value = 2,
    level = "Low",
}: Props) {
    return (
        <ZiraatCard
            title="UV Index"
            leftIcon={<Sun size={18} color="#c7611f" />}
        >
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.level}>{level}</Text>

            {/* UV gradient bar */}
            <View style={styles.bar}>
                <View style={[styles.barSegment, { backgroundColor: "#22c55e" }]} />
                <View style={[styles.barSegment, { backgroundColor: "#facc15" }]} />
                <View style={[styles.barSegment, { backgroundColor: "#fb923c" }]} />
                <View style={[styles.barSegment, { backgroundColor: "#ef4444" }]} />
                <View style={[styles.barSegment, { backgroundColor: "#7c3aed" }]} />
            </View>

            <Text style={styles.note}>
                Low for the rest of the day.
            </Text>
        </ZiraatCard>
    );
}

const styles = StyleSheet.create({
    value: {
        fontSize: 30,
        fontWeight: "700",
        color: "#111827",
    },
    level: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 10,
    },
    bar: {
        height: 6,
        borderRadius: 999,
        overflow: "hidden",
        flexDirection: "row",
    },
    barSegment: {
        flex: 1,
    },
    note: {
        marginTop: 10,
        fontSize: 12,
        color: "#6B7280",
    },
});

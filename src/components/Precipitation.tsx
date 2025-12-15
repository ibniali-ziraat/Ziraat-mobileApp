import { View, Text, StyleSheet } from "react-native";
import { Droplets } from "lucide-react-native";
import ZiratCard from "./shared/ZiratCard";

type Props = {
    amount?: string;
    note?: string;
};

export default function Precipitation({
    amount = `0"`,
    note = "None expected in next 10 days.",
}: Props) {
    return (
        <ZiratCard
            title="Precipitation"
            leftIcon={<Droplets size={18} color="#c7611f" />}
        >
            <Text style={styles.amount}>{amount}</Text>
            <Text style={styles.subtext}>in last 24 hours</Text>
            <Text style={styles.note}>{note}</Text>
        </ZiratCard>
    );
}

const styles = StyleSheet.create({
    amount: {
        fontSize: 30,
        fontWeight: "700",
        color: "#111827",
    },
    subtext: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 6,
    },
    note: {
        fontSize: 12,
        color: "#6B7280",
    },
});

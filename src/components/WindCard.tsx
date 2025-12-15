import { View, Text, StyleSheet } from "react-native";
import { Wind } from "lucide-react-native";
import ZiratCard from "./shared/ZiratCard";

type Props = {
    speed?: number;
    gust?: number;
    deg?: number;
    dir?: string;
};

export default function WindCard({
    speed = 16,
    gust = 31,
    deg = 155,
    dir = "SSE",
}: Props) {
    return (
        <ZiratCard
            title="Wind"
            subtitle="Speed, gusts & direction"
            leftIcon={<Wind size={18} color="#c7611f" />}
        >
            <View style={styles.row}>
                {/* LEFT INFO */}
                <View style={styles.left}>
                    <InfoRow label="Wind" value={`${speed} km/h`} />
                    <InfoRow label="Gusts" value={`${gust} km/h`} />
                    <InfoRow label="Direction" value={`${deg}° ${dir}`} />
                </View>

                {/* RIGHT DIAL */}
                <View style={styles.right}>
                    <View style={styles.dial}>
                        {/* Compass letters */}
                        <Text style={[styles.compass, styles.north]}>N</Text>
                        <Text style={[styles.compass, styles.south]}>S</Text>
                        <Text style={[styles.compass, styles.west]}>W</Text>
                        <Text style={[styles.compass, styles.east]}>E</Text>

                        {/* Arrow */}
                        <View style={{ transform: [{ rotate: `${deg}deg` }] }}>
                            <View style={styles.arrowMain} />
                            <View style={styles.arrowTail} />
                        </View>

                        {/* Center speed */}
                        <View style={styles.center}>
                            <Text style={styles.speed}>{speed}</Text>
                            <Text style={styles.unit}>km/h</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ZiratCard>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    left: {
        gap: 10,
    },
    right: {
        alignItems: "center",
        justifyContent: "center",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 140,
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    dial: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    compass: {
        position: "absolute",
        fontSize: 10,
        color: "#6B7280",
    },
    north: { top: 6 },
    south: { bottom: 6 },
    west: { left: 6 },
    east: { right: 6 },
    arrowMain: {
        width: 4,
        height: 40,
        backgroundColor: "#111827",
        borderRadius: 999,
    },
    arrowTail: {
        width: 4,
        height: 12,
        backgroundColor: "#111827",
        borderRadius: 999,
        marginTop: -4,
        alignSelf: "center",
    },
    center: {
        position: "absolute",
        alignItems: "center",
    },
    speed: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    unit: {
        fontSize: 12,
        color: "#6B7280",
    },
});

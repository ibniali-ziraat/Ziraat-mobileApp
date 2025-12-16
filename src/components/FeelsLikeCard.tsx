import { View, Text } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    temp: number;
};

export default function FeelsLikeCard({ temp }: Props) {
    return (
        <ZiraatCard
            width="48%"
            height="22%"
            paddingHorizontal={1.2}
            paddingVertical={1.2}>
            <Text style={styles.label}>FEELS LIKE</Text>

            <Text style={styles.value}>{temp}°</Text>

            <Text style={styles.sub}>Similar to the actual temperature</Text>
        </ZiraatCard>
    );
}

const styles = {
    label: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "600",
    },
    value: {
        fontSize: 32,
        fontWeight: "700",
        color: "#c7611f",
        marginVertical: 6,
    },
    sub: {
        fontSize: 13,
        color: "#000000",
    },
};

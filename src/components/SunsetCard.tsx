import { View, Text, StyleSheet } from "react-native";
import { Sunset } from "lucide-react-native";
import ZiratCard from "./shared/ZiratCard";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  sunset?: string;
  sunrise?: string;
};

export default function SunsetCard({
  sunset = "6:03 PM",
  sunrise = "7:18 AM",
}: Props) {
  return (
    <ZiraatCard
      width={250}
      height={150}
    >
      <Text style={styles.time}>{sunset}</Text>

      {/* Static curve (Expo + iOS safe) */}
      <View style={styles.curveContainer}>
        <View style={styles.curveLine} />
        <View style={styles.sunDot} />
      </View>

      <Text style={styles.sunrise}>
        Sunrise: {sunrise}
      </Text>
    </ZiraatCard>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },
  curveContainer: {
    height: 48,
    justifyContent: "center",
    marginTop: 6,
  },
  curveLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "rgba(17,24,39,0.2)",
    borderRadius: 999,
  },
  sunDot: {
    position: "absolute",
    right: 24,
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  sunrise: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
});

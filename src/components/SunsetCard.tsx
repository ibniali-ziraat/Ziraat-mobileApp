import { View, Text } from "react-native";
import { Sunset } from "lucide-react-native";
import Svg, { Path, Circle } from "react-native-svg";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  sunset: string;
  sunrise: string;
};

export default function SunsetCard({ sunset, sunrise }: Props) {
  return (
    <ZiraatCard width="48%"
      height="22%"
      paddingHorizontal={1.2} paddingVertical={1.2}>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Sunset size={14} color="#c7611f" />
        <Text style={styles.label}>SUNSET</Text>
      </View>


      <Text style={styles.time}>{sunset}</Text>


      <Svg width={150} height={50}>
        <Path
          d="M10 40 Q75 5 140 40"
          stroke="#c7611f"
          strokeWidth={2}
          fill="none"
        />
        <Circle cx="75" cy="18" r="5" fill="#c7611f" />
      </Svg>


      <Text style={styles.sub}>Sunrise: {sunrise}</Text>
    </ZiraatCard>
  );
}

const styles = {
  label: {
    marginLeft: 6,
    fontSize: 12,
    color: "#000000",
    fontWeight: "700",
  },
  time: {
    fontSize: 26,
    fontWeight: "700",
    color: "#00000",
    marginVertical: 6,
  },
  sub: {
    fontSize: 13,
    color: "#c7611f",
  },
};

import Animated, { FadeInUp } from "react-native-reanimated";
import ScoreRow from "./ScoreRow";

export default function ScoreGroup({ data = [], color = "#c7611f" }) {
    return (
        <Animated.View
            entering={FadeInUp.duration(400).springify()}
            className="w-36"
        >
            {data.map((item, index) => (
                <Animated.View
                    key={index}
                    entering={FadeInUp.delay(index * 80).duration(350)}
                >
                    <ScoreRow
                        label={item.label}
                        value={item.value}
                        color={color}
                    />
                </Animated.View>
            ))}
        </Animated.View>
    );
}

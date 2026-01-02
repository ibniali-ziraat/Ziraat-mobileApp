import { Wind } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";
import WeatherCarousel, { SLIDE_WIDTH } from "./WeatherCarousel";

const STORM_ALERTS = [
    { title: "Storms possible Thursday morning", chance: "41%" },
    { title: "Heavy rain & lightning expected", chance: "56%" },
    { title: "Heavy rain & lightning expected", chance: "56%" },
    { title: "Heavy rain & lightning expected", chance: "56%" },
];

export default function StormCard() {
    return (
        <ZiraatCard width="100%" marginVertical={0.6} paddingHorizontal={0.3} paddingVertical={1.5}>
            <WeatherCarousel
                data={STORM_ALERTS}
                renderItem={({ item }) => (
                    <View style={{ width: SLIDE_WIDTH, paddingHorizontal: 10 }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10
                        }}>
                            <Wind size={18} color="#c7611f" />
                            <CsText style={typography.Poppins_m_medium}
                                className="ml-2 tracking-wide"
                            >
                                Storms Coming

                            </CsText>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <CsText
                                style={typography.Poppins_m_regular}
                            >
                                {item.title}
                            </CsText>

                            <CsText style={typography.Poppins_l_semibold}
                                className="ml-3">

                                {item.chance}
                            </CsText>
                        </View>
                    </View>
                )}
            />
        </ZiraatCard>
    );
}

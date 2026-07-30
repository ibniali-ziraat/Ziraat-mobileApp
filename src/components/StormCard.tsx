import { Wind } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";
import WeatherCarousel, { SLIDE_WIDTH } from "./WeatherCarousel";

const STORM_ALERTS = [
  { title: "Storms possible Thursday morning", chance: "41%" },
  { title: "Heavy rain & lightning expected", chance: "56%" },
  { title: "Heavy rain & lightning expected", chance: "56%" },
  { title: "Heavy rain & lightning expected", chance: "56%" },
];

export default function StormCard() {
  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 6,
          paddingVertical: 16,
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
        },
        cardShadow,
      ]}
    >
      <WeatherCarousel
        data={STORM_ALERTS}
        renderItem={({ item }) => (
          <View style={{ width: SLIDE_WIDTH, paddingHorizontal: 16 }}>
            
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Wind size={18} color={colors.secondary} />
              <Text
                style={[
                  typography.Poppins_m_medium,
                  { marginLeft: 8, color: cardTokens.inkPrimary },
                ]}
              >
                Storms Coming
              </Text>
            </View>

            {/* Content */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  typography.Poppins_m_regular,
                  { flex: 1, color: cardTokens.inkSecondary },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  typography.Poppins_l_semibold,
                  { marginLeft: 10, color: cardTokens.inkPrimary },
                ]}
              >
                {item.chance}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
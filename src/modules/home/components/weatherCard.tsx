import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { CloudLightning, Droplets, Sun, Wind } from "lucide-react-native";
import { ImageBackground, Text, View } from "react-native";

type WeatherCardProps = {
  current: any;
  city?: string | null;
};

export default function WeatherCard({ current, city }: WeatherCardProps) {
  const hasData =
    current &&
    typeof current?.tempC === "number" &&
    typeof current?.humidity === "number";

  return (
    <View className="rounded-3xl overflow-hidden shadow-lg ">
      <ImageBackground
        source={require("@/assets/images/weatherBg.png")}
        resizeMode="cover"
        className="w-full rounded-3xl overflow-hidden"
      >
        <View className="p-6 bg-dark/10 backdrop-blur-3xl rounded-3xl">
          <View className="flex-row items-end justify-between">
            <Text style={typography.Poppins_m_regular} className="text-light">
              {city || "Srinagar"}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text
              style={typography.Poppins_xxl_semibold}
              className="text-light"
            >
              {current?.tempC}
              <Text
                style={typography.Poppins_l_regular}
                className="text-light "
              >
                °
              </Text>
            </Text>

            <Sun size={70} color="yellow" />
          </View>

          <Text
            className="mb-3 text-light tracking-wide"
            style={typography.Poppins_m_regular}
          >
            Feels like {current?.feelsLikeC}° — {current?.condition}
          </Text>

          <View className="flex-row justify-between">
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Droplets size={24} color={colors.light} />
              </View>
              <Text style={typography.Poppins_s_regular} className="text-light">
                {current?.humidity}%
              </Text>
              <Text style={typography.Poppins_s_regular} className="text-light">
                Humidity
              </Text>
            </View>

            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Wind size={24} color={colors.light} />
              </View>
              <Text style={typography.Poppins_s_regular} className="text-light">
                {current?.windKph} km/h
              </Text>
              <Text style={typography.Poppins_s_regular} className="text-light">
                {current?.windDir ?? "--"}
              </Text>
            </View>

            {/* STORM */}
            <View className="w-24 items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <CloudLightning size={24} color={colors.light} />
              </View>
              <Text style={typography.Poppins_s_regular} className="text-light">
                {current?.stormRisk ?? "---"}
              </Text>
              <Text style={typography.Poppins_s_regular} className="text-light">
                Storm risk
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

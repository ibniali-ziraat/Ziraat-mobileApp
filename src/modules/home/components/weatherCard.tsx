import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { CloudLightning, Droplets, Sun, Wind } from "lucide-react-native";
import { ImageBackground, View } from "react-native";

type WeatherCardProps = {
  current: any;
  city?: string | null;
};

export default function WeatherCard({ current, city }: WeatherCardProps) {
  const hasData =
    current &&
    typeof current?.tempC === "number" &&
    typeof current?.humidity === "number";

  // 🔻 FALLBACK (API failed / empty / corrupted)
  if (!hasData) {
    return (
      <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
        <ImageBackground
          source={require("@/assets/images/weatherBg.png")}
          resizeMode="cover"
          className="w-full rounded-3xl overflow-hidden"
        >
          <View className="p-6 bg-dark backdrop-blur-3xl rounded-3xl">
            <View className="flex-row items-end justify-between">
              <CsText variant="bigHeading text-xl" className="text-light">
                {city || "Current location"}
              </CsText>

              <CsText variant="subtitle" className="text-light">
                Today
              </CsText>
            </View>

            <CsText variant="title" className="text-light mt-2">
              Weather unavailable
            </CsText>

            <CsText variant="subtitle" className="text-light mt-1">
              We couldn’t load the weather right now.
            </CsText>

            <CsText variant="caption" className="text-light mt-2">
              Please check your connection or try again later.
            </CsText>
          </View>
        </ImageBackground>
      </View>
    );
  }

  // 🔹 NORMAL RENDER
  return (
    <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={require("@/assets/images/weatherBg.png")}
        resizeMode="cover"
        className="w-full rounded-3xl overflow-hidden"
      >
        <View className="p-6 bg-black/25 backdrop-blur-3xl rounded-3xl">

          {/* HEADER */}
          <View className="flex-row items-end justify-between">
            <CsText variant="bigHeading text-xl" className="text-light">
              {city || "Srinagar"}
            </CsText>

            <CsText variant="subtitle" className="text-light">
              Today
            </CsText>
          </View>

          {/* TEMP */}
          <View className="flex-row items-center justify-between">
            <CsText variant="title" className="text-light">
              {current?.tempC}°
            </CsText>
            <Sun size={70} color="yellow" />
          </View>

          {/* CONDITION */}
          <CsText variant="title" className="text-light">
            Feels like {current?.feelsLikeC}° — {current?.condition}
          </CsText>

          {/* INFO */}
          <View className="flex-row justify-between">

            {/* HUMIDITY */}
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Droplets size={24} color={colors.light} />
              </View>
              <CsText variant="caption" className="text-light">
                {current?.humidity}%
              </CsText>
              <CsText variant="subtitle" className="text-light">
                Humidity
              </CsText>
            </View>

            {/* WIND */}
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Wind size={24} color={colors.light} />
              </View>
              <CsText variant="caption" className="text-light">
                {current?.windKph} km/h
              </CsText>
              <CsText variant="subtitle" className="text-light">
                {current?.windDir ?? "--"}
              </CsText>
            </View>

            {/* STORM */}
            <View className="w-24 items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <CloudLightning size={24} color={colors.light} />
              </View>
              <CsText variant="caption" className="text-light">
                {current?.stormRisk ?? "--"}
              </CsText>
              <CsText variant="subtitle" className="text-light">
                Storm risk
              </CsText>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

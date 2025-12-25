import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { CloudLightning, Droplets, Sun, Wind } from "lucide-react-native";
import { ImageBackground, Text, View } from "react-native";

export default function WeatherCard({ current }) {
  return (
    <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={require("@/assets/images/weatherBg.png")}
        resizeMode="cover"
        className="w-full rounded-3xl overflow-hidden"
      >
        <View className="p-6 bg-dark/25 backdrop-blur-3xl rounded-3xl">
          <View className="flex-row items-end justify-between">
            <CsText
              style={[
                typography.Poppins_xxl_bold,
              ]}
              className="text-light "
            >
              {current?.tempC}°
            </CsText>
            <Sun size={65} color="yellow" />
          </View>

          <Text 

          style={[typography.Poppins_s_medium
            
          ]}
        
          className="text-light">
            Feels like {current?.feelsLikeC}° — {current?.condition}
          </Text>

          <View className="w-full h-[1px] bg-light/30 my-5" />

          <View className="flex-row justify-between">
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light/40">
                <Droplets size={24} color={colors.light} />
              </View>
              <CsText 
              style={[typography.Poppins_s_medium]}
              className="text-light">
                {current?.humidity}%
              </CsText>
              <CsText 
              style={[typography.Poppins_s_medium]}
              className="text-light/70">
                Humidity
              </CsText>
            </View>

            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light/40">
                <Wind size={24} color={colors.light} />
              </View>
              <CsText 
              style={[typography.Poppins_s_medium]}
               className="text-light">
                {current?.windKph} km/h
              </CsText>
              <CsText 
              style={[typography.Poppins_s_medium]}
               className="text-light/70 ">
                {current?.windDir}
              </CsText>
            </View>

            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light/40">
                <CloudLightning size={24} color={colors.light} />
              </View>
              <CsText 
              style={[typography.Poppins_s_medium]}
               className="text-light">
                Low
              </CsText>
              <CsText 
              style={[typography.Poppins_s_medium]}
               className="text-light/70 ">
                Hail risk
              </CsText>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

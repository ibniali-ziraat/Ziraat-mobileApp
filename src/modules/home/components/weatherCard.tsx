import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
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
  // if (!hasData) {
  //   return (
  //     <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
  //       <ImageBackground
  //         source={require("@/assets/images/weatherBg.png")}
  //         resizeMode="cover"
  //         className="w-full rounded-3xl overflow-hidden"
  //       >
  //         <View className="p-6 bg-dark backdrop-blur-3xl rounded-3xl">
  //           <View className="flex-row items-end justify-between">
  //             <CsText style={typography.Poppins_xl_regular} className="text-light">
  //               {city || "Current location"}
  //             </CsText>

  //             <CsText style={typography.Poppins_s_regular} className="text-light">
  //               Today
  //             </CsText>
  //           </View>

  //           <CsText style={typography.Poppins_xl_regular} className="text-light mt-2">
  //             Weather unavailable
  //           </CsText>

  //           <CsText style={typography.Poppins_s_regular} className="text-light mt-1">
  //             We couldn’t load the weather right now.
  //           </CsText>

  //           <CsText style={typography.Poppins_s_regular} className="text-light mt-2">
  //             Please check your connection or try again later.
  //           </CsText>
  //         </View>
  //       </ImageBackground>
  //     </View>
  //   );
  // }


  return (
    <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={require("@/assets/images/weatherBg.png")}
        resizeMode="cover"
        className="w-full rounded-3xl overflow-hidden"
      >
        <View className="p-6 bg-dark/10 backdrop-blur-3xl rounded-3xl">


          <View className="flex-row items-end justify-between">
            <CsText style={typography.Poppins_m_regular} className="text-light">
              {city || "Srinagar"}
            </CsText>
          </View>

          <View className="flex-row items-center justify-between">
            <CsText style={typography.Poppins_xxl_semibold} className="text-light">
              {current?.tempC}
              <CsText style={typography.Poppins_l_regular} className="text-light ">
                °
              </CsText>
            </CsText>

            <Sun size={70} color="yellow" />
          </View>



          <CsText
            className="mb-3 text-light tracking-wide"
            style={typography.Poppins_m_regular}>
            Feels like {current?.feelsLikeC}° — {current?.condition}
          </CsText>

          <View className="flex-row justify-between">
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Droplets size={24} color={colors.light} />
              </View>
              <CsText
                style={typography.Poppins_s_regular} className="text-light"
              >
                {current?.humidity}%
              </CsText>
              <CsText
                style={typography.Poppins_s_regular} className="text-light">
                Humidity
              </CsText>
            </View>


            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <Wind size={24} color={colors.light} />
              </View>
              <CsText style={typography.Poppins_s_regular} className="text-light">
                {current?.windKph} km/h
              </CsText>
              <CsText
                style={typography.Poppins_s_regular} className="text-light">
                {current?.windDir ?? "--"}
              </CsText>
            </View>

            {/* STORM */}
            <View className="w-24 items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-light/30 items-center justify-center border border-light">
                <CloudLightning size={24} color={colors.light} />
              </View>
              <CsText style={typography.Poppins_s_regular} className="text-light">
                {current?.stormRisk ?? "---"}
              </CsText>
              <CsText style={typography.Poppins_s_regular} className="text-light">
                Storm risk
              </CsText>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

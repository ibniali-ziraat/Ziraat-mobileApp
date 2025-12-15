import { View, Text, ImageBackground } from "react-native";
import { Droplets, Wind, CloudLightning, Sun } from "lucide-react-native";

export default function WeatherCard({ current }) {
  return (
    <View className="my-6 rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={require("@/assets/images/weatherBg.png")}
        resizeMode="cover"
        className="w-full rounded-3xl overflow-hidden"
      >
        <View className="p-6 bg-black/25 backdrop-blur-3xl rounded-3xl">

          <View className="flex-row items-end justify-between">
            <Text className="text-white text-7xl font-bold">
              {current?.tempC}°
            </Text>
            <Sun size={65} color="#c7611f" />
          </View>

          <Text className="text-white/90 text-lg font-medium mt-1">
            Feels like {current?.feelsLikeC}° — {current?.condition}
          </Text>

          <View className="w-full h-[1px] bg-white/30 my-5" />


          <View className="flex-row justify-between">
            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-white/30 items-center justify-center border border-white/40">
                <Droplets size={24} color="white" />
              </View>
              <Text className="text-white font-bold">{current?.humidity}%</Text>
              <Text className="text-white/70 text-xs">Humidity</Text>
            </View>

            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-white/30 items-center justify-center border border-white/40">
                <Wind size={24} color="white" />
              </View>
              <Text className="text-white font-bold">
                {current?.windKph} km/h
              </Text>
              <Text className="text-white/70 text-xs">{current?.windDir}</Text>
            </View>


            <View className="items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-white/30 items-center justify-center border border-white/40">
                <CloudLightning size={24} color="white" />
              </View>
              <Text className="text-white font-bold">Low</Text>
              <Text className="text-white/70 text-xs">Hail risk</Text>
            </View>

          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

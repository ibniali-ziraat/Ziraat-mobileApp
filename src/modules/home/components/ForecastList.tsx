// components/home/SevenDayForecast.tsx
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

const forecast = [
  { day: "Mon", temp: "29°", low: "15°", rain: "20%", icon: "partly-sunny-outline" },
  { day: "Tue", temp: "27°", low: "14°", rain: "40%", icon: "sunny-outline" },
  { day: "Wed", temp: "25°", low: "12°", rain: "60%", icon: "rainy-outline" },
  { day: "Thu", temp: "28°", low: "14°", rain: "10%", icon: "cloud-outline" },
  { day: "Fri", temp: "30°", low: "13°", rain: "20%", icon: "cloud-outline" },
  { day: "Sat", temp: "31°", low: "16°", rain: "30%", icon: "partly-sunny-outline" },
  { day: "Sun", temp: "26°", low: "12°", rain: "50%", icon: "rainy-outline" },
];

export default function SevenDayForecast() {
  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6 }}
      >
        {forecast.map((item, index) => (
          <ForecastCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}



function ForecastCard({ item }) {
  const rainValue = parseInt(item.rain);

  return (
   <View
  className="mr-4"
  style={{
    width: 95,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2, 
  }}
>

      {/* Day */}
      <Text
        className="text-center text-[15px] font-semibold"
        style={{ color: colors.dark }}
      >
        {item.day}
      </Text>

      {/* Weather Icon */}
      <View className="items-center my-3">
        <View
          style={{
            padding: 10,
            borderRadius: 50,
           
          }}
        >
          <Ionicons name={item.icon} size={26} color={colors.secondary} />
        </View>
      </View>

      {/* Temperature */}
      <View className="items-center mt-1 mb-1">
        <Text
          className="font-extrabold text-[18px]"
          style={{ color: colors.dark }}
        >
          {item.temp}
        </Text>
        <Text className="text-[12px]" style={{ color: colors.dark + "99" }}>
          {item.low}
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: colors.neutral,
          marginVertical: 8,
          opacity: 0.5,
        }}
      />

      {/* Rain badge */}
      <View className="items-center">
        <View
          style={{
            backgroundColor:
              rainValue > 40
                ? colors.secondary + "33"
                : colors.primary + "33",
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderRadius: 12,
          }}
        >
          <Text
            className="text-[11px] font-semibold"
            style={{ color: colors.dark }}
          >
            {item.rain}
          </Text>
        </View>
      </View>
    </View>
  );
}

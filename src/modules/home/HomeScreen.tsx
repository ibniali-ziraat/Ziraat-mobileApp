import { router } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import ProductCarousel from "@/src/components/shared/ProductCarousel";
import FarmOverviewChart from "./components/FarmOverviewChart";
import FarmerTipsCard from "./components/FarmerTipsCard";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

// Data & Hooks
import { imageMapper } from "@/src/data/imageMapper";
import products from "@/src/data/products.json";
import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";

export default function HomeScreen() {
  const { coords, loading: locLoading, error: locError } = useLocation();

  const { data, isLoading } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  // Calculate the most accurate current weather data
  const currentWeather = useMemo(() => {
    if (!data) return null;

    // 1. Try to get 'data_current' (Real-time observation)
    if (data.data_current) {
      return {
        tempC: data.data_current.temperature,
        feelsLikeC: Math.round(data.data_current.temperature), // Standard fallback
        condition: data.data_current.pictocode,
        humidity: data.data_current.relativehumidity || 0,
        windKph: Math.round(data.data_current.windspeed),
        windDir: 0,
        isDaylight: data.data_current.isdaylight,
        highTemp: Math.round(data.data_day.temperature_max[0]),
        lowTemp: Math.round(data.data_day.temperature_min[0]),
      };
    }

    console.log(data, "the api data ");
    // 2. Fallback: Find the index in data_1h that matches the current hour
    // This prevents showing 1.8°C (midnight/early morning) when it's actually 10°C now.
    const currentHour = new Date().getHours();

    return {
      tempC: data.data_1h.temperature[currentHour],
      feelsLikeC: Math.round(data.data_1h.felttemperature[currentHour]),
      condition: data.data_1h.pictocode[currentHour],
      humidity: data.data_1h.relativehumidity[currentHour],
      windKph: Math.round(data.data_1h.windspeed[currentHour]),
      windDir: data.data_1h.winddirection[currentHour],
      highTemp: Math.round(data.data_day.temperature_max[0]),
      lowTemp: Math.round(data.data_day.temperature_min[0]),
      stormRisk:
        data.data_1h.convective_precipitation[currentHour] > 2 &&
        data.data_1h.windspeed[currentHour] > 3
          ? "High"
          : "Low",
    };
  }, [data]);

  const sections = [
    { title: "Top Pesticides for Healthy Crop Growth", slice: [0, 8] },
  ];

  if (locLoading || isLoading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#c7611f" />
      </View>
    );
  }

  return (
    <AnimatedTabContent>
      <View className="flex-1 bg-white pt-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Weather Card - Now passes dynamic high/low too */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/dashboards/(farmer)/weather-profile",
                params: { weatherData: JSON.stringify(currentWeather) },
              })
            }
          >
            {currentWeather && <WeatherCard current={currentWeather} />}
          </TouchableOpacity>

          <QuickActions />

          {sections.map((section, index) => (
            <View key={index} className="mb-6">
              <SectionTitle title={section.title} icon="flask-outline" />
              <ProductCarousel
                items={products.slice(...section.slice)}
                imageMapper={imageMapper}
              />
            </View>
          ))}

          <View className="mb-6">
            <SectionTitle title="Farm Overview" icon="stats-chart-outline" />
            <FarmOverviewChart />

            <SectionTitle title="Farmer Tips & Awareness" icon="bulb-outline" />
            <FarmerTipsCard />
          </View>
        </ScrollView>
      </View>
    </AnimatedTabContent>
  );
}

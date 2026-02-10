import { router } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";

import ProductCarousel from "@/src/components/shared/ProductCarousel";
import { colors } from "@/src/constants/colors";
import { useProductsData } from "../products/hooks/data/useProductsData";
import FarmOverviewChart from "./components/FarmOverviewChart";
import FarmerTipsCard from "./components/FarmerTipsCard";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen() {
  const { coords, loading: locLoading } = useLocation();
  const { products, isLoading: productsLoading } = useProductsData();

  const { data, isLoading: weatherLoading } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  const currentWeather = useMemo(() => {
    if (!data) return null;
    if (data.data_current) {
      return {
        tempC: data.data_current.temperature,
        condition: data.data_current.pictocode,
        highTemp: Math.round(data.data_day.temperature_max[0]),
        lowTemp: Math.round(data.data_day.temperature_min[0]),
      };
    }
    return null;
  }, [data]);

  if (locLoading || weatherLoading || productsLoading) {
    return null; // Loader
  }

  return (
    <ScreenLayout>
      <ScreenContent>
        <AnimatedTabContent>
          <View
          style={{backgroundColor:colors.light}}
           className="flex-1  pt-4">
            <TouchableOpacity
              onPress={() =>
                router.push("/dashboards/(farmer)/weather-profile")
              }
            >
              <WeatherCard current={currentWeather} />
            </TouchableOpacity>

            <QuickActions />

            <SectionTitle
              title="Top Pesticides for Healthy Crop Growth"
            icon="cube-outline"       

            />

            <ProductCarousel items={products.slice(0, 8)} />

            <SectionTitle
             
             title="Farm Overview"
              icon="stats-chart-outline" />
            <FarmOverviewChart />

            <SectionTitle title="Farmer Tips & Awareness" icon="bulb-outline" />
            <FarmerTipsCard />
          </View>
        </AnimatedTabContent>
      </ScreenContent>
    </ScreenLayout>
  );
}

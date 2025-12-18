import { ScrollView, TouchableOpacity, View } from "react-native";

import FarmOverviewChart from "./components/FarmOverviewChart";

import { router } from "expo-router";
import FarmerTipsCard from "./components/FarmerTipsCard";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import ProductCarousel from "@/src/components/shared/ProductCarousel";
import { imageMapper } from "@/src/Data/imageMapper";
import products from "@/src/Data/products.json";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import { useState } from "react";

export default function HomeScreen() {
  const [cityData, setCityData] = useState("srinagar");
  const { data, isPending, isError } = useWeatherQuery(cityData);
  console.log(data, "data...");

  // if (isPending) return <Loader />;

  const sections = [
    { title: "Top Pesticides for Healthy Crop Growth", slice: [0, 8] },
  ];

  return (
    <AnimatedTabContent>
      <View className="flex-1 bg-white pt-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Weather */}
          {/* <SectionTitle title="Today's Weather" icon="sunny-outline" /> */}
          <TouchableOpacity
            onPress={() => router.push("/dashboards/(farmer)/weather-profile")}
          >
            <WeatherCard
              current={{
                tempC: 27,
                feelsLikeC: 29,
                condition: "Partly cloudy",
                humidity: 62,
                windKph: 14,
                windDir: "NE",
              }}
            />
          </TouchableOpacity>
          {/* Quick Actions */}
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

          {sections.map((section, index) => (
            <View key={index} className="mb-6">
              {/* Farm Overview */}
              <SectionTitle title="Farm Overview" icon="stats-chart-outline" />
              <FarmOverviewChart />

              {/* Tips */}
              <SectionTitle
                title="Farmer Tips & Awareness"
                icon="bulb-outline"
              />
              <FarmerTipsCard />
            </View>
          ))}
        </ScrollView>
      </View>
    </AnimatedTabContent>
  );
}

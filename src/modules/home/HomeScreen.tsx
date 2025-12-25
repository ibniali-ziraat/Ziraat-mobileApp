import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import ProductCarousel from "@/src/components/shared/ProductCarousel";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { imageMapper } from "@/src/data/imageMapper";
import products from "@/src/data/products.json";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import FarmerTipsCard from "./components/FarmerTipsCard";
import FarmOverviewChart from "./components/FarmOverviewChart";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen() {
  const [cityData, setCityData] = useState("srinagar");
  const { data, isPending, isError } = useWeatherQuery(cityData);
  console.log(data, "data...");

  // // if (isPending) return <Loader />;

  const sections = [
    { title: "Top Pesticides for Healthy Crop Growth", slice: [0, 8] },
  ];

  return (
    <ScreenLayout>

      <AnimatedTabContent>
        <View className="flex-1">
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
              <View key={index} className="">
                <SectionTitle title={section.title} icon="flask-outline" />

                <ProductCarousel
                  items={products.slice(...section.slice)}
                  imageMapper={imageMapper}
                />
              </View>
            ))}

            {sections.map((section, index) => (
              <View key={index} className="">
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

    </ScreenLayout>
  );
}

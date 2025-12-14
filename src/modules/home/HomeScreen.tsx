import {
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import FarmOverviewChart from "./components/FarmOverviewChart";

import FarmerTipsCard from "./components/FarmerTipsCard";
import FeaturedPesticides from "./components/FeaturedPesticides";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";

import WeatherCard from "./components/weatherCard";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white pt-8">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Weather */}
        <SectionTitle title="Today's Weather" icon="sunny-outline" />
        <TouchableOpacity onPress={() => router.push("/dashboards/(farmer)/weather-profile")}>
          <WeatherCard
            current={{
              tempC: 27,
              feelsLikeC: 29,
              condition: "Partly cloudy",
              humidity: 62,
              windKph: 14,
              windDir: "NE"
            }}
          />

        </TouchableOpacity>
        {/* Quick Actions */}
        <SectionTitle title="Quick Actions" icon="flash-outline" />
        <QuickActions />

        {/* Featured Pesticides */}
        <SectionTitle title="Featured Pesticides" icon="flask-outline" />
        <FeaturedPesticides />



        {/* Farm Overview */}
        <SectionTitle title="Farm Overview" icon="stats-chart-outline" />
        <FarmOverviewChart />

        {/* Tips */}
        <SectionTitle title="Farmer Tips & Awareness" icon="bulb-outline" />
        <FarmerTipsCard />
      </ScrollView>
    </View>
  );
}


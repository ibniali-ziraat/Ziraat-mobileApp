import {
  ScrollView,
  View
} from "react-native";
import FarmOverviewChart from "./components/FarmOverviewChart";

import FarmerTipsCard from "./components/FarmerTipsCard";
import FeaturedPesticides from "./components/FeaturedPesticides";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";

import WeatherCard from "./components/weatherCard";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white pt-8">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Weather */}
        <SectionTitle title="Today's Weather" icon="sunny-outline" />
        <WeatherCard />

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


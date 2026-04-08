import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";

import ProductsList from "../products/components/ProductList";
import { useProductsData } from "../products/hooks/data/useProductsData";

import { useHomeWeather } from "./hooks/useHomeWeather";
import { useHomeWishlist } from "./hooks/useHomeWishlist";

import { JSX } from "react";
import FarmOverviewChart from "./components/FarmOverviewChart";
import FarmerTipsCard from "./components/FarmerTipsCard";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen(): JSX.Element {
  const { currentWeather } = useHomeWeather();
  const { sharedWishlistProps } = useHomeWishlist();
  const { products: allProducts = [] } = useProductsData();

  return (
    <ScreenLayout>
      <ScreenContent>
        <AnimatedTabContent>
          <View style={{ backgroundColor: colors.light }} className="flex-1">
            <TouchableOpacity
              onPress={() => router.push(ROUTES.WEATHER.DETAILS)}
            >
              <WeatherCard current={currentWeather} />
            </TouchableOpacity>

            <QuickActions />

            <View className="mb-8">
              <ProductsList
                {...sharedWishlistProps}
                items={allProducts}
                title="Top Picks This Season"
              />
            </View>

            {/* <ProductsList
              {...sharedWishlistProps}
              items={allProducts}
              title="Farmers' Choice"
            /> */}

            <SectionTitle title="Farm Overview" icon="stats-chart-outline" />
            <FarmOverviewChart />

            <SectionTitle title="Farmer Tips & Awareness" icon="bulb-outline" />
            <FarmerTipsCard />

            <View className="mb-20">
              <LegalDisclaimer />
            </View>
          </View>
        </AnimatedTabContent>
      </ScreenContent>
    </ScreenLayout>
  );
}

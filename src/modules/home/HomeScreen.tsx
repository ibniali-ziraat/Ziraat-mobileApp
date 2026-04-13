import { router } from "expo-router";
import { Pressable, View } from "react-native";

import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";

import { useProductsData } from "../products/hooks/data/useProductsData";

import { useHomeWeather } from "./hooks/useHomeWeather";
import { useHomeWishlist } from "./hooks/useHomeWishlist";

import { Flame, Tag } from "lucide-react-native";
import { JSX } from "react";
import BestDealsList from "../products/components/BestDealsList";
import ListHeader from "../products/components/ListHeader";
import TrendingProductsList from "../products/components/TrendingProductsList";
import {
  useBestDeals,
  useTrendingProducts,
} from "../products/hooks/queries/products.queries";
import FarmerTipsCard from "./components/FarmerTipsCard";
import FarmOverviewChart from "./components/FarmOverviewChart";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen(): JSX.Element {
  const { currentWeather } = useHomeWeather();
  const { sharedWishlistProps } = useHomeWishlist();
  const { data: trendingData, isLoading: trendingLoading } =
    useTrendingProducts();
  const { data: bestDealsData, isLoading: bestDealsLoading } = useBestDeals();
  console.log(bestDealsData, "best deals data...");

  console.log(trendingData, "trending data");
  const { products: allProducts = [] } = useProductsData();
  console.log(allProducts, "allproducts...");

  return (
    <ScreenLayout>
      <ScreenContent>
        <AnimatedTabContent>
          <View
            style={{ backgroundColor: colors.light }}
            className="flex-1 pt-4"
          >
            <Pressable onPress={() => router.push(ROUTES.WEATHER.DETAILS)}>
              <WeatherCard current={currentWeather} />
            </Pressable>
            <QuickActions />
            <View style={{ marginTop: 18 }}>
              <ListHeader
                title="Trending Products"
                icon={<Flame size={22} color={colors.secondary} />}
              />
              <TrendingProductsList
                items={trendingData}
                {...sharedWishlistProps}
                variant="carousel"
              />
            </View>

            <View style={{ marginTop: 52 }}>
              <ListHeader
                title="Best Deals"
                icon={<Tag size={22} color={colors.secondary} />}
              />

              <BestDealsList
                data={bestDealsData}
                {...sharedWishlistProps}
                variant="carousel"
              />
            </View>
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

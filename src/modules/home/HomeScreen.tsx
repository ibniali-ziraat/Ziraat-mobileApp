import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useLocationWatcher } from "@/src/hooks/useLocationWatcher";
import { router } from "expo-router";
import { Flame, Tag } from "lucide-react-native";
import { JSX, useState } from "react";
import { Pressable, View } from "react-native";
import { useRegisterToken } from "../notifications/hooks/useRegisterToken";
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
import { useHomeWeather } from "./hooks/useHomeWeather";
import { useHomeWishlist } from "./hooks/useHomeWishlist";

export default function HomeScreen(): JSX.Element {
  const { currentWeather } = useHomeWeather();
  const { sharedWishlistProps } = useHomeWishlist();
  const { data: trendingData, refetch: refetchTrending } =
    useTrendingProducts();
  const { data: bestDealsData, refetch: refetchBestDeals } = useBestDeals();
  const [refreshing, setRefreshing] = useState(false);

  const { coords, status } = useLocationWatcher({ updateInterval: 10_000 });

  useRegisterToken(coords);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchTrending(), refetchBestDeals()]);
    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <ScreenContent>
        <View
          style={{ backgroundColor: colors.light, flex: 1, paddingTop: 16 }}
        >
          <Pressable onPress={() => router.push(ROUTES.WEATHER.DETAILS)}>
            <WeatherCard current={currentWeather} coords={coords} />
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
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

          <SectionTitle title="Farm Overview" icon={null} />
          <FarmOverviewChart />

          <SectionTitle title="Farmer Tips & Awareness" icon={null} />
          <FarmerTipsCard />

          <View style={{ marginBottom: 80 }}>
            <LegalDisclaimer />
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

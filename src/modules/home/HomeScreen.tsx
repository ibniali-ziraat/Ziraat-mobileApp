import DisclaimerNote from "@/src/components/shared/DisclaimerNote";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { homeArt, statIcons } from "@/src/constants/iconArt";
import { useHomeScrollY } from "@/src/contexts/HomeScrollContext";
import { JSX, useState } from "react";
import { RefreshControl, View } from "react-native";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { useRegisterToken } from "../notifications/hooks/useRegisterToken";
import BestDealsSection from "./components/dashboard/BestDealsSection";
import DashboardSectionHeader from "./components/dashboard/DashboardSectionHeader";
import TrendingProductsSection from "./components/dashboard/TrendingProductsSection";
import ExploreGrid from "./components/ExploreGrid";
import FarmerTipsCarousel from "./components/FarmerTipsCarousel";
import HomeWeatherCard from "./components/HomeWeatherCard";
import QuickActions from "./components/QuickActions";
import { useHomeDashboard } from "./hooks/useHomeDashboard";

export default function HomeScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  useRegisterToken();

  // Feeds the collapsing header, which lives outside this scroll view.
  // A worklet, not a plain JS callback — updates scrollY on the UI thread
  // in sync with the actual scroll instead of crossing the JS bridge, which
  // was causing the header (weather card included) to visibly snap/blink
  // under JS-thread load instead of animating smoothly.
  const scrollY = useHomeScrollY();
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (scrollY) scrollY.value = event.contentOffset.y;
    },
  });

  // Home is a launchpad now: the orchard figures live on the Orchards tab and
  // the farm dashboard, so only tips and the disclaimer come from here.
  const { tips, legalDisclaimer, refetchAll } = useHomeDashboard();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchAll();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScreenLayout
      topPadding={2}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <ScreenContent>
        <View style={{ backgroundColor: colors.light, flex: 1 }}>
          {/* Scrolls away with the rest of the page now — no longer part of
              the sticky collapsing header, which made it feel pinned/static
              instead of like a normal piece of the dashboard. */}
          <HomeWeatherCard />

          <DashboardSectionHeader
            title="Explore Ziraat"
            subtitle="Community, insights, orders and saved items"
            art={statIcons.district}
            topSpacing={22}
          />
          <ExploreGrid />

          <QuickActions />

          <TrendingProductsSection />
          <BestDealsSection />

          <DashboardSectionHeader
            title="Farmer tips & awareness"
            art={homeArt.tips}
            subtitle="Guidance tailored to this season"
          />
          <FarmerTipsCarousel tips={tips} />

          <View style={{ marginTop: 28, marginBottom: 80 }}>
            <DisclaimerNote text={legalDisclaimer} />
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

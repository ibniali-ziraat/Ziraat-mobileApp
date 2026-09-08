import DashboardCard from "@/src/components/shared/DashboardCard";
import DisclaimerNote from "@/src/components/shared/DisclaimerNote";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useHomeScrollY } from "@/src/contexts/HomeScrollContext";
import { useOrchardCompleteness } from "@/src/modules/orchards/hooks/useOrchardCompleteness";
import { router } from "expo-router";
import { JSX, useState } from "react";
import { RefreshControl, View } from "react-native";
import { useAnimatedScrollHandler } from "react-native-reanimated";
import { useRegisterToken } from "../notifications/hooks/useRegisterToken";
import BestDealsSection from "./components/dashboard/BestDealsSection";
import DashboardSectionHeader from "./components/dashboard/DashboardSectionHeader";
import DashboardSkeleton from "./components/dashboard/DashboardSkeleton";
import DashboardStatsGrid from "./components/dashboard/DashboardStatsGrid";
import FarmActivityChart from "./components/dashboard/FarmActivityChart";
import MonthlyOrchardsChart from "./components/dashboard/MonthlyOrchardsChart";
import OrchardCompletenessCard from "./components/dashboard/OrchardCompletenessCard";
import OrchardOverviewCard from "./components/dashboard/OrchardOverviewCard";
import TrendingProductsSection from "./components/dashboard/TrendingProductsSection";
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

  const {
    orchards,
    stats,
    history,
    areaTrend,
    orchardGrowth,
    areaByOrchard,
    ownershipMix,
    monthlyRegistrations,
    completion,
    activity,
    period,
    tips,
    legalDisclaimer,
    isLoading,
    refetchAll,
  } = useHomeDashboard();

  const sectionCompleteness = useOrchardCompleteness(orchards);

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

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <DashboardSectionHeader
                title="Your farm at a glance"
                subtitle="Built from your registered orchard records"
                actionLabel="Orchards"
                onAction={() => router.push(ROUTES.TABS.ORCHARDS)}
                topSpacing={20}
              />

              <DashboardCard>
                <DashboardStatsGrid
                  stats={stats}
                  activity={activity}
                  areaTrend={areaTrend}
                  orchardGrowth={orchardGrowth}
                  completionPercent={completion.percent}
                  datedPercent={stats.datedPercent}
                  period={period}
                />

                {stats.totalOrchards > 0 ? (
                  <View style={{ marginTop: 22 }}>
                    <OrchardOverviewCard
                      bars={areaByOrchard.bars}
                      unmeasured={areaByOrchard.unmeasured}
                      ownership={ownershipMix}
                      totalArea={stats.totalArea}
                    />
                  </View>
                ) : null}
              </DashboardCard>

              <QuickActions />

              {monthlyRegistrations.length > 0 ? (
                <View style={{ marginTop: 14 }}>
                  <MonthlyOrchardsChart points={monthlyRegistrations} />
                </View>
              ) : null}

              {stats.totalOrchards > 0 ? (
                <>
                  <DashboardSectionHeader
                    title="Finish your orchard records"
                    subtitle="Sections still waiting on details"
                    actionLabel="Orchards"
                    onAction={() => router.push(ROUTES.TABS.ORCHARDS)}
                  />

                  <OrchardCompletenessCard
                    orchards={sectionCompleteness.orchards}
                    done={sectionCompleteness.done}
                    total={sectionCompleteness.total}
                    percent={sectionCompleteness.percent}
                    incomplete={sectionCompleteness.incomplete}
                  />
                </>
              ) : null}

              {activity.length > 0 ? (
                <View style={{ marginTop: 14 }}>
                  <FarmActivityChart activity={activity} period={period} />
                </View>
              ) : null}

              <TrendingProductsSection />
              <BestDealsSection />
            </>
          )}

          <DashboardSectionHeader
            title="Farmer tips & awareness"
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

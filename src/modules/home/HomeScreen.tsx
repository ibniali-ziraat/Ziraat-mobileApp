import DisclaimerNote from "@/src/components/shared/DisclaimerNote";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useHomeScrollY } from "@/src/contexts/HomeScrollContext";
import { useLocationWatcher } from "@/src/hooks/useLocationWatcher";
import { useOrchardCompleteness } from "@/src/modules/orchards/hooks/useOrchardCompleteness";
import { router } from "expo-router";
import { JSX, useState } from "react";
import {
  RefreshControl,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useRegisterToken } from "../notifications/hooks/useRegisterToken";
import DashboardSectionHeader from "./components/dashboard/DashboardSectionHeader";
import DashboardSkeleton from "./components/dashboard/DashboardSkeleton";
import DashboardStatsGrid from "./components/dashboard/DashboardStatsGrid";
import FarmActivityChart from "./components/dashboard/FarmActivityChart";
import MonthlyOrchardsChart from "./components/dashboard/MonthlyOrchardsChart";
import OrchardCompletenessCard from "./components/dashboard/OrchardCompletenessCard";
import OrchardOverviewCard from "./components/dashboard/OrchardOverviewCard";
import ProductInsightsCard from "./components/dashboard/ProductInsightsCard";
import FarmerTipsCarousel from "./components/FarmerTipsCarousel";
import QuickActions from "./components/QuickActions";
import { useHomeDashboard } from "./hooks/useHomeDashboard";

export default function HomeScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const { coords } = useLocationWatcher({ updateInterval: 10_000 });
  useRegisterToken(coords);

  // Feeds the collapsing header, which lives outside this scroll view.
  const scrollY = useHomeScrollY();
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (scrollY) scrollY.value = event.nativeEvent.contentOffset.y;
  };

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
    products,
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

              <DashboardStatsGrid
                stats={stats}
                activity={activity}
                areaTrend={areaTrend}
                orchardGrowth={orchardGrowth}
                completionPercent={completion.percent}
                datedPercent={stats.datedPercent}
                period={period}
              />

              <QuickActions />

              {stats.totalOrchards > 0 ? (
                <View style={{ marginTop: 6 }}>
                  <OrchardOverviewCard
                    bars={areaByOrchard.bars}
                    unmeasured={areaByOrchard.unmeasured}
                    ownership={ownershipMix}
                    totalOrchards={stats.totalOrchards}
                    totalArea={stats.totalArea}
                    districts={stats.districts}
                  />
                </View>
              ) : null}

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

            

              <DashboardSectionHeader
                title="Mostly used this season"
                subtitle="What farmers are buying right now"
                actionLabel="Shop"
                onAction={() => router.push(ROUTES.TABS.PRODUCTS)}
              />

              <ProductInsightsCard
                metric={products.metric}
                bars={products.bars}
                priceBands={products.priceBands}
                trendingCount={products.trendingCount}
                dealsCount={products.dealsCount}
                averagePrice={products.averagePrice}
              />
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

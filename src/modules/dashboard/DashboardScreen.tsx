import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Ruler, Sprout, Trees } from "lucide-react-native";
import { View } from "react-native";
import OrchardListCard from "./components/OrchardListCard";
import StatChip from "./components/StatChip";
import { useDashboardHome } from "./hooks/useDashboardHome";
import type { DashboardOrchardSummary } from "./types/dashboardHome";

export default function DashboardScreen() {
  const { data, isLoading } = useDashboardHome();

  const summary = data?.summary;
  const orchards = data?.orchards ?? [];

  const openOrchard = (orchard: DashboardOrchardSummary) => {
    router.push({
      pathname: ROUTES.DASHBOARD.ORCHARD_DETAIL,
      params: {
        orchardProfileId: String(orchard.orchardProfileId),
        orchardName: orchard.orchardName,
        district: orchard.district ?? "",
        tehsil: orchard.tehsil ?? "",
        areaHa: String(orchard.areaHa),
        totalTrees: String(orchard.totalTrees),
        establishmentYear:
          orchard.establishmentYear != null ? String(orchard.establishmentYear) : "",
      },
    });
  };

  return (
    <ScreenLayout>
      <BackHeader title="Dashboard" desc="Your farm at a glance" />

      <ScreenContent className="pb-10">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <View className="flex-row flex-wrap justify-between mt-2">
              <StatChip
                Icon={Trees}
                title="Orchards"
                value={String(summary?.totalOrchards ?? 0)}
              />
              <StatChip
                Icon={Ruler}
                title="Total Area"
                value={`${(summary?.totalAreaHa ?? 0).toFixed(2)} ha`}
              />
              <StatChip
                Icon={Sprout}
                title="Total Trees"
                value={String(summary?.totalTrees ?? 0)}
              />
            </View>

            <CsText
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 18, color: colors.dark, marginTop: 20, marginBottom: 12 },
              ]}
            >
              Your Orchards
            </CsText>

            {orchards.length === 0 ? (
              <CsText style={{ color: colors.neutral }}>No orchards registered yet.</CsText>
            ) : (
              orchards.map((orchard) => (
                <OrchardListCard
                  key={orchard.orchardProfileId}
                  orchard={orchard}
                  onPress={() => openOrchard(orchard)}
                />
              ))
            )}
          </>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import DashboardSectionHeader from "../home/components/dashboard/DashboardSectionHeader";
import { compactNumber, SummaryStrip } from "./components/DashboardBlocks";
import OrchardListCard from "./components/OrchardListCard";
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
          orchard.establishmentYear != null
            ? String(orchard.establishmentYear)
            : "",
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
            <SummaryStrip
              stats={[
                {
                  label: summary?.totalOrchards === 1 ? "Orchard" : "Orchards",
                  value: String(summary?.totalOrchards ?? 0),
                },
                {
                  label: "Hectares",
                  value: compactNumber(summary?.totalAreaHa ?? 0),
                },
                {
                  label: "Trees",
                  value: compactNumber(summary?.totalTrees ?? 0),
                },
              ]}
            />

            <DashboardSectionHeader title="Your orchards" topSpacing={28} />

            {orchards.length === 0 ? (
              <CsText style={{ color: colors.neutral }}>
                No orchards registered yet.
              </CsText>
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

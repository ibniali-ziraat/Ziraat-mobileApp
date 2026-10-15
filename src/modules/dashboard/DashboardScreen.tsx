import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { productArt, statIcons } from "@/src/constants/iconArt";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import DashboardSectionHeader from "../home/components/dashboard/DashboardSectionHeader";
import OrchardListCard from "./components/OrchardListCard";
import { useDashboardHome } from "./hooks/useDashboardHome";
import type { DashboardOrchardSummary } from "./types/dashboardHome";

/** Plain white figure tile — a small icon does the picture work. */
function SummaryTile({
  art,
  tint,
  label,
  value,
  caption,
}: {
  art: string;
  tint: string;
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 12,
          borderRadius: 18,
          backgroundColor: tint,
        },
      ]}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SvgXml xml={art} width={30} height={30} />
      </View>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_l_semibold,
          { color: cardTokens.inkPrimary, fontSize: 18, marginTop: 10 },
        ]}
      >
        {value}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkMuted, fontSize: 11 },
        ]}
      >
        {label}
      </Text>
      {caption ? (
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_xs_medium,
            { color: cardTokens.inkSecondary, fontSize: 10.5, marginTop: 1 },
          ]}
        >
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

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
            <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
              <SummaryTile
                art={statIcons.orchard}
                tint="#EAF5E4"
                label={summary?.totalOrchards === 1 ? "Orchard" : "Orchards"}
                value={String(summary?.totalOrchards ?? 0)}
              />
              <SummaryTile
                art={statIcons.area}
                tint="#FFF4E5"
                label="Total area"
                value={`${(summary?.totalAreaHa ?? 0).toFixed(2)} ha`}
                caption={`${summary?.totalAreaKanals ?? 0} kanals`}
              />
              <SummaryTile
                art={productArt.seeds}
                tint="#E6F3FC"
                label="Total trees"
                value={String(summary?.totalTrees ?? 0)}
              />
            </View>

            <DashboardSectionHeader
              title="Your Orchards"
              subtitle="Tap an orchard for resources, pests & finances"
              art={statIcons.orchard}
              topSpacing={22}
            />

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

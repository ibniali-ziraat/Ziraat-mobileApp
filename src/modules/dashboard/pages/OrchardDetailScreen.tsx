import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { dashboardTabArt } from "@/src/constants/iconArt";
import { getOrchardTile } from "@/src/constants/illustrations";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { useLocalSearchParams } from "expo-router";
import {
  Bell,
  Bug,
  CreditCard,
  Droplet,
  MessageSquare,
  Package,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SvgXml } from "react-native-svg";
import AdvisorySection from "../components/sections/AdvisorySection";
import AlertsSection from "../components/sections/AlertsSection";
import FinancialSection from "../components/sections/FinancialSection";
import NutrientSection from "../components/sections/NutrientSection";
import PestDiseaseSection from "../components/sections/PestDiseaseSection";
import ResourcesSection from "../components/sections/ResourcesSection";

// Each tab hits its own API, scoped to this orchard's orchardProfileId, and
// only fetches once it's actually opened — not all six up front.
const TABS = [
  { key: "resources", label: "Resources", icon: Package },
  { key: "pestDisease", label: "Pest & Disease", icon: Bug },
  { key: "nutrients", label: "Nutrients", icon: Droplet },
  { key: "financial", label: "Financial", icon: CreditCard },
  { key: "advisory", label: "Advisory", icon: MessageSquare },
  { key: "alerts", label: "Alerts", icon: Bell },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function OrchardDetailScreen() {
  const params = useLocalSearchParams<{
    orchardProfileId: string;
    orchardName: string;
    district: string;
    tehsil: string;
    areaHa: string;
    totalTrees: string;
    establishmentYear: string;
  }>();

  const [activeTab, setActiveTab] = useState<TabKey>("resources");

  const orchardProfileId = Number(params.orchardProfileId);
  const location = [params.tehsil, params.district].filter(Boolean).join(", ");

  return (
    <ScreenLayout scrollable={false} bottomPadding={0}>
      <BackHeader
        title={params.orchardName || "Orchard"}
        desc={location || "Orchard detail"}
      />

      <View style={{ flex: 1 }}>
        <ScreenContent>
          {/* Basic info — already known from the orchards list, no extra call */}
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderRadius: 16,
                backgroundColor: colors.light,
              },
              shadows.profile_card,
            ]}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                overflow: "hidden",
                marginRight: 14,
              }}
            >
              <SvgXml
                xml={getOrchardTile({
                  orchardProfileId: params.orchardProfileId,
                })}
                width={48}
                height={48}
              />
            </View>

            {[
              {
                label: "Area",
                value: `${Number(params.areaHa || 0).toFixed(2)} ha`,
              },
              { label: "Trees", value: params.totalTrees || "0" },
              ...(params.establishmentYear
                ? [{ label: "Established", value: params.establishmentYear }]
                : []),
            ].map((stat) => (
              <View key={stat.label} style={{ flex: 1 }}>
                <CsText style={{ fontSize: 13.5, color: colors.neutral }}>
                  {stat.label}
                </CsText>
                <CsText
                  style={[
                    typography.Poppins_s_semibold,
                    { fontSize: 16, color: colors.dark },
                  ]}
                >
                  {stat.value}
                </CsText>
              </View>
            ))}
          </View>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingLeft: 6,
                    paddingRight: 14,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: isActive ? colors.primary : colors.light,
                    borderWidth: 1,
                    borderColor: isActive ? colors.primary : colors.cardBorder,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <SvgXml
                      xml={dashboardTabArt[tab.key]}
                      width={17}
                      height={17}
                    />
                  </View>
                  <CsText
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: isActive ? colors.light : colors.dark,
                    }}
                  >
                    {tab.label}
                  </CsText>
                </Pressable>
              );
            })}
          </ScrollView>
        </ScreenContent>

        {/* Tab content — its own scroll area below the fixed header/tabs */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <ScreenContent>
            {activeTab === "resources" && (
              <ResourcesSection
                orchardProfileId={orchardProfileId}
                key={`resources-${orchardProfileId}`}
              />
            )}
            {activeTab === "pestDisease" && (
              <PestDiseaseSection
                orchardProfileId={orchardProfileId}
                key={`pestDisease-${orchardProfileId}`}
              />
            )}
            {activeTab === "nutrients" && (
              <NutrientSection
                orchardProfileId={orchardProfileId}
                key={`nutrients-${orchardProfileId}`}
              />
            )}
            {activeTab === "financial" && (
              <FinancialSection
                orchardProfileId={orchardProfileId}
                key={`financial-${orchardProfileId}`}
              />
            )}
            {activeTab === "advisory" && (
              <AdvisorySection
                orchardProfileId={orchardProfileId}
                key={`advisory-${orchardProfileId}`}
              />
            )}
            {activeTab === "alerts" && (
              <AlertsSection
                orchardProfileId={orchardProfileId}
                key={`alerts-${orchardProfileId}`}
              />
            )}
          </ScreenContent>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
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
import { compactNumber, SummaryStrip } from "../components/DashboardBlocks";
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
          <SummaryStrip
            stats={[
              {
                label: "Hectares",
                value: compactNumber(Number(params.areaHa || 0)),
              },
              {
                label: "Trees",
                value: compactNumber(Number(params.totalTrees || 0)),
              },
              ...(params.establishmentYear
                ? [{ label: "Since", value: params.establishmentYear }]
                : []),
            ]}
          />

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              const TabIcon = tab.icon;

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: isActive ? colors.primary : colors.light,
                    borderWidth: 1,
                    borderColor: isActive ? colors.primary : colors.cardBorder,
                  }}
                >
                  <TabIcon
                    size={16}
                    strokeWidth={2}
                    color={isActive ? colors.light : colors.primary}
                  />
                  <CsText
                    style={{
                      fontSize: 13,
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

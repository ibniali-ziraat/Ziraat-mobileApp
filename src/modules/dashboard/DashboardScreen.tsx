import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdvisoryProfile from "@/src/app/(dashboards)/(sections)/advisory-profile";
import AlertProfile from "@/src/app/(dashboards)/(sections)/alert-profile";
import FinancialProfile from "@/src/app/(dashboards)/(sections)/financial-profile";
import NutrientProfile from "@/src/app/(dashboards)/(sections)/nutrient-profile";
import OrchardProfile from "@/src/app/(dashboards)/(sections)/orchard-profile";
import PestDiseaseProfile from "@/src/app/(dashboards)/(sections)/pestdisease-profile";
import ResourcesProfile from "@/src/app/(dashboards)/(sections)/resources-profile";
import WeatherProfile from "@/src/app/(dashboards)/(sections)/weather-profile";
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { DashboardTabs } from "@/src/navigation/DashboardTabs";

export default function DashboardScreen() {
  const { role } = useLocalSearchParams();
  const [expandedStep, setExpandedStep] = useState(0);
  const insets = useSafeAreaInsets();

  const tabs = Object.values(DashboardTabs).filter(
    (screen) => screen.role === role,
  );

  const renderComponent = (tabName: string) => {
    switch (tabName) {
      case "orchardProfile":
        return <OrchardProfile />;
      case "weatherProfile":
        return <WeatherProfile />;
      case "nutrientProfile":
        return <NutrientProfile />;
      case "pestDiseaseProfile":
        return <PestDiseaseProfile />;
      case "resourcesProfile":
        return <ResourcesProfile />;
      case "financialProfile":
        return <FinancialProfile />;
      case "advisoryProfile":
        return <AdvisoryProfile />;
      case "alertProfile":
        return <AlertProfile />;
      default:
        return (
          <CsText style={{ color: colors.dark }}>No Component Found</CsText>
        );
    }
  };

  return (
    <View style={{ backgroundColor: colors.light, flex: 1 }}>
      <BackHeader
        title="Dashboard"
        desc={
          role === "farmer"
            ? "Manage Your Orchards & Fields"
            : role === "supplier"
              ? "Manage Your Products & Orders"
              : undefined
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon ?? (() => null);
          const isExpanded = expandedStep === index;

          return (
            <View
              key={tab.name}
              style={{ marginBottom: 12, marginHorizontal: 12 }}
            >
              {/* Step Header */}
              <TouchableOpacity
                onPress={() => setExpandedStep(isExpanded ? -1 : index)}
                style={{
                  backgroundColor: isExpanded ? colors.primary : colors.neutral,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Icon
                    size={20}
                    color={isExpanded ? colors.light : colors.dark}
                  />
                  <CsText
                    style={{
                      color: isExpanded ? colors.light : colors.dark,
                      fontWeight: isExpanded ? "600" : "500",
                      fontSize: 14,
                    }}
                  >
                    Step {index}: {tab.label}
                  </CsText>
                </View>
                <CsText
                  style={{
                    color: isExpanded ? colors.light : colors.dark,
                    fontSize: 18,
                  }}
                >
                  {isExpanded ? "−" : "+"}
                </CsText>
              </TouchableOpacity>

              {/* Step Content */}
              {isExpanded && (
                <View
                  style={{
                    backgroundColor: colors.light,
                    borderWidth: 1,
                    borderColor: colors.neutral,
                    borderTopWidth: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <ScreenLayout>{renderComponent(tab.name)}</ScreenLayout>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

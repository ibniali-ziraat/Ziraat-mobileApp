import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import observationsData from "@/src/data/observationsData.json";
import { statTileData } from "@/src/data/statTileData";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import {
  Activity,
  AlertCircle,
  Bug,
  Clock,
  Image,
  ShieldHalf,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import ObservationCard from "../components/ObservationCard";
import StatTile from "../components/StatTile";

export default function PestDiseaseProfile() {
  const [modalVisible, setModalVisible] = useState(false);

  const renderIcon = (item: any) => {
    const iconMap: any = {
      pestIncidence: Bug,
      diseaseIncidence: Activity,
      riskLevel: AlertCircle,
      resistance: ShieldHalf,
      photoDiagnoses: Image,
      avgResponseTime: Clock,
    };
    const IconComponent = iconMap[item.id];
    if (!IconComponent) return null;

    return (
      <IconComponent size={36} color={colors.secondary} strokeWidth={1.3} />
    );
  };

  return (
    <ScreenLayout>
      <ScreenContent>
        {/* Stat Tiles */}
        <View className="flex-row flex-wrap justify-between">
          {statTileData.map((item) => {
            const content = (
              <StatTile
                title={item.title}
                value={item.value}
                footer={item.footer}
                icon={renderIcon(item)}
              />
            );

            return (
              <Pressable
                key={item.id}
                onPress={
                  item.isClickable ? () => setModalVisible(true) : undefined
                }
                className="w-[48%] mb-2"
              >
                {content}
              </Pressable>
            );
          })}
        </View>

        {/* High Risk Pests */}
        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 22, marginVertical: 16, color: colors.dark }]}
        >
          High-Risk Pests Identified
        </CsText>

        {observationsData.highRiskPests.map((item) => (
          <ObservationCard
            key={item.id}
            title={item.title}
            description={item.description}
            recommended={item.recommended}
          />
        ))}

        {/* Disease Observations */}
        <CsText
          style={[typography.Poppins_m_medium, { fontSize: 22, marginVertical: 16, color: colors.dark }]}
        >
          Disease Observations
        </CsText>

        {observationsData.highRiskPests.map((item) => (
          <ObservationCard
            key={item.id}
            title={item.title}
            description={item.description}
            recommended={item.recommended}
          />
        ))}

        {/* Spray Schedule */}
        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 22, marginTop: 20, marginBottom: 16, color: colors.dark }]}
        >
          Spray Schedule & History
        </CsText>

        <View
          style={[
            {
              backgroundColor: colors.light,
              borderRadius: 16,
              
              borderColor: colors.neutral,
              padding: 16,
              marginBottom: 24,
            },
            shadows.profile_card,
          ]}
        >
          {[
            {
              title: "Last Applied Spray",
              description: "Chlorantraniliprole — 3 days ago",
            },
            {
              title: "Next Scheduled Spray",
              description: "Neem Oil — In 5 days",
            },
            {
              title: "Missed Sprays",
              description: "2 missed sprays this month",
              isError: true,
            },
          ].map((item, index) => (
            <View key={index}>
              <CsText
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: item.isError ? colors.error : colors.dark,
                }}
              >
                {item.title}
              </CsText>

              <CsText
                style={{
                  marginTop: 4,
                  color: item.isError ? colors.error : colors.neutral,
                }}
              >
                {item.description}
              </CsText>

              {index < 2 && (
                <View
                  style={{
                   
                    borderColor: colors.neutral,
                    marginVertical: 16,
                  }}
                />
              )}
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 22, marginTop: 24, marginBottom: 8, color: colors.dark }]}
        >
          Pest & Disease Trend (30 Days)
        </CsText>

        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 14, marginBottom: 16, color: colors.neutral }]}
        >
          Chart showing incidence trends to help plan interventions.
        </CsText>

        <View
          style={[
            {
              backgroundColor: colors.light,
              borderRadius: 16,
             
              borderColor: colors.neutral,
              padding: 16,
              marginBottom: 24,
            },
            shadows.profile_card,
          ]}
        >
          <CustomBarChart labels={[]} values={[]} type="bar" />

          <CsText
            style={[
              typography.Poppins_m_medium,
              {
                textAlign: "center",
                color: colors.neutral,
                marginTop: 8,
              },
            ]}
          >
            (Analytics integration coming soon)
          </CsText>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
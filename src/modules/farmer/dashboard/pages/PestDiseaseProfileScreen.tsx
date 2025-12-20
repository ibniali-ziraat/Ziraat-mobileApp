import CustomBarChart from "@/src/components/charts/CustomBarChart";
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import observationsData from "@/src/data/observationsData.json";
import { statTileData } from "@/src/data/statTileData";
import ObservationCard from "@/src/modules/farmer/dashboard/pages/components/ObservationCard";
import StatTile from "@/src/modules/farmer/dashboard/pages/components/StatTile";
import {
  Activity,
  AlertCircle,
  Bug,
  Clock,
  Image,
  ShieldHalf,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

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
    <ScreenLayout className="flex-1 bg-light px-2">
      <BackHeader
        title="Pest & Disease Profile"
        desc="Real-time tracking and risk analytics to manage orchard health."
      />

      {/* STAT TILES (2 per row) */}
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

      {/* HIGH-RISK PESTS */}
      <Text className="text-2xl font-bold my-4">
        High-Risk Pests Identified
      </Text>
      {observationsData.highRiskPests.map((item) => (
        <ObservationCard
          key={item.id}
          title={item.title}
          description={item.description}
          recommended={item.recommended}
        />
      ))}

      {/* DISEASE OBSERVATIONS */}
      <Text className="text-2xl font-bold my-4">Disease Observations</Text>
      {observationsData.diseaseObservations.map((item) => (
        <ObservationCard
          key={item.id}
          title={item.title}
          description={item.description}
        />
      ))}

      {/* SPRAY SCHEDULE */}
      <Text className="text-2xl font-bold mt-5 mb-4">
        Spray Schedule & History
      </Text>
      <View className="bg-white rounded-xl p-4 shadow mb-6">
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
            <Text
              className={`font-semibold text-lg ${item.isError ? "text-error" : ""}`}
            >
              {item.title}
            </Text>
            <Text
              className={`mt-1 ${item.isError ? "text-error" : "text-neutral"}`}
            >
              {item.description}
            </Text>
            {index < 2 && <View className="border-t border-neutral-200 my-4" />}
          </View>
        ))}
      </View>

      {/* TREND CHART */}
      <Text className="text-2xl font-bold mt-6 mb-2">
        Pest & Disease Trend (30 Days)
      </Text>
      <Text className="text-base mb-4">
        Chart showing incidence trends to help plan interventions.
      </Text>

      <View className="bg-white rounded-xl p-4 shadow mb-6">
        <CustomBarChart labels={[]} values={[]} type="bar" />
        <Text className="text-center text-sm text-overlay mt-2">
          (Analytics integration coming soon)
        </Text>
      </View>
    </ScreenLayout>
  );
}

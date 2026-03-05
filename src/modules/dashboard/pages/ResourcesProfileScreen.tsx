import {
  AlertTriangle,
  GaugeCircle,
  Leaf,
  PiggyBank,
  Shield,
  Tractor,
  Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import resourceData from "../../../data/resourceUsageData.json";
import InputModal from "../components/InputModal";

const iconMap: Record<string, any> = {
  Shield,
  AlertTriangle,
  Tractor,
  Wallet,
  Leaf,
  GaugeCircle,
  PiggyBank,
};

const MetricCard = ({ title, value, icon, width }: any) => (
  <View style={{ width, marginBottom: 12 }}>
    <View
      style={[
        {
          width: "100%",
          height: 150,
          backgroundColor: colors.light,
          borderRadius: 16,
         
          borderColor: colors.neutral,
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "space-between",
        },
        shadows.profile_card,
      ]}
    >
      {iconMap?.[icon] &&
        React.createElement(iconMap[icon], {
          size: 38,
          color: colors.secondary,
          strokeWidth: 1.3,
        })}

      <CsText style={{ fontSize: 14, color: colors.dark }}>{title}</CsText>

      <CsText
        style={{
          textAlign: "center",
          fontSize: 18,
          color: colors.dark,
          fontWeight: "600",
        }}
      >
        {value}
      </CsText>
    </View>
  </View>
);

const SummaryRow = ({ label, value, bold }: any) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 }}>
    <CsText
      style={{
        fontWeight: bold ? "700" : "400",
        fontSize: bold ? 18 : 14,
        color: colors.dark,
      }}
    >
      {label}
    </CsText>
    <CsText
      style={{
        fontWeight: bold ? "700" : "400",
        fontSize: bold ? 18 : 14,
        color: colors.dark,
      }}
    >
      {value}
    </CsText>
  </View>
);

const EfficiencyTag = ({ label, score }: any) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
    <CsText style={{ fontSize: 15, color: colors.dark }}>{label}</CsText>
    <CsText style={{ fontSize: 16, fontWeight: "600", color: colors.primary }}>
      {score || "0"}
    </CsText>
  </View>
);

const InsightItem = ({ icon, text }: any) => {
  const Icon = iconMap?.[icon];

  return (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: colors.light,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      {Icon && <Icon size={26} color={colors.secondary} strokeWidth={1.3} />}
      <CsText style={{ marginLeft: 8, flex: 1, color: colors.dark }}>
        {text}
      </CsText>
    </View>
  );
};

export default function InputResourceUsageScreen() {
  const [fertilizer, setFertilizer] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [costInputs, setCostInputs] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { width } = useWindowDimensions();

  const isSmall = width < 380;
  const cardWidth = isSmall ? "100%" : "48%";

  const materialCost = costInputs ? parseInt(costInputs) : 0;
  const laborCost = laborHours ? parseInt(laborHours) * 85 : 0;
  const fertilizerCost = fertilizer ? parseInt(fertilizer) * 12 : 0;
  const overallCost = materialCost + laborCost + fertilizerCost;

  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-8">

        {/* Metrics */}
        <View className="w-full flex-row flex-wrap justify-between">
          {resourceData.metrics.map((m: any, i: number) => (
            <MetricCard
              key={i}
              title={m.title}
              value={
                m.title === "Total Input Cost" ? `₹ ${overallCost}` : m.value
              }
              icon={m.icon}
              width={cardWidth}
            />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 12,
            marginTop: 16,
            padding: 16,
            marginBottom: 24,
          }}
          onPress={() => setOpenModal(true)}
        >
          <CsText
            style={{
              color: colors.light,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Calculate Efficiency
          </CsText>
        </TouchableOpacity>

        {/* Summary */}
        <CsText style={{ fontSize: 22, fontWeight: "700", marginBottom: 16, color: colors.dark }}>
          Resource Summary
        </CsText>

        <View
          style={[
            {
              backgroundColor: colors.light,
              borderRadius: 16,
             
              borderColor: colors.neutral,
              padding: 14,
              marginBottom: 12,
            },
            shadows.profile_card,
          ]}
        >
          <SummaryRow label="Fertilizer Cost" value={`₹ ${fertilizerCost}`} />
          <SummaryRow label="Labor Cost" value={`₹ ${laborCost}`} />
          <SummaryRow label="Material Cost" value={`₹ ${materialCost}`} />
          <SummaryRow
            label="Overall Expenditure"
            value={`₹ ${overallCost}`}
            bold
          />
        </View>

        {/* Efficiency */}
        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 22, marginTop: 20, marginBottom: 16, color: colors.dark }]}
        >
          Input Efficiency Overview
        </CsText>

        <View
          style={[
            {
              backgroundColor: colors.light,
              borderRadius: 16,
             
              borderColor: colors.neutral,
              padding: 14,
              marginBottom: 12,
            },
            shadows.profile_card,
          ]}
        >
          {resourceData.efficiencyLabels.map((label: string, i: number) => (
            <EfficiencyTag
              key={i}
              label={label}
              score={i === 0 ? fertilizer : i === 1 ? laborHours : costInputs}
            />
          ))}
        </View>

        {/* Insights */}
        <CsText
          style={[typography.Poppins_m_semibold, { fontSize: 22, marginTop: 20, marginBottom: 16, color: colors.dark }]}
        >
          Performance Insights
        </CsText>

        <View
          style={[
            {
              backgroundColor: colors.light,
              borderRadius: 16,
            
              borderColor: colors.neutral,
              padding: 14,
            },
            shadows.profile_card,
          ]}
        >
          {resourceData.insights.map((insight: any, i: number) => (
            <InsightItem key={i} icon={insight.icon} text={insight.text} />
          ))}
        </View>
      </ScreenContent>

      <InputModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        fertilizer={fertilizer}
        laborHours={laborHours}
        costInputs={costInputs}
        setFertilizer={setFertilizer}
        setLaborHours={setLaborHours}
        setCostInputs={setCostInputs}
      />
    </ScreenLayout>
  );
}
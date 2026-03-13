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
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
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
    <ZiraatCard
      width="100%"
      height={150}
      paddingHorizontal={1}
      paddingVertical={0.75}
    >
      <View className="h-full justify-between items-center">
        {iconMap?.[icon] &&
          React.createElement(iconMap[icon], {
            size: 38,
            color: colors.secondary,
            strokeWidth: 1.3,
          })}

        <CsText className="text-[14px]">{title}</CsText>

        <CsText className="text-center text-dark text-[18px] font-semibold">
          {value}
        </CsText>
      </View>
    </ZiraatCard>
  </View>
);

const SummaryRow = ({ label, value, bold }: any) => (
  <View className="flex-row justify-between py-2">
    <CsText className={bold ? "font-bold text-lg" : ""}>{label}</CsText>
    <CsText className={bold ? "font-bold text-lg" : ""}>{value}</CsText>
  </View>
);

const EfficiencyTag = ({ label, score }: any) => (
  <View className="flex-row items-center mb-2 justify-between">
    <CsText className="text-[15px]">{label}</CsText>
    <CsText className="text-[16px] font-semibold">{score || "0"}</CsText>
  </View>
);

const InsightItem = ({ icon, text }: any) => {
  const Icon = iconMap?.[icon];

  return (
    <View className="mb-3 bg-white px-3 py-3 rounded-lg">
      <View className="flex-row items-start">
        {Icon && <Icon size={26} color={colors.secondary} strokeWidth={1.3} />}
        <CsText className="ml-2 flex-1 text-black">{text}</CsText>
      </View>
    </View>
  );
};

export default function InputResourceUsageScreen() {
  const [fertilizer, setFertilizer] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [costInputs, setCostInputs] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { width } = useWindowDimensions();

  // ✅ Responsive grid (1 column on small screens, 2 columns otherwise)
  const isSmall = width < 380;
  const cardWidth = isSmall ? "100%" : "48%";

  const materialCost = costInputs ? parseInt(costInputs) : 0;
  const laborCost = laborHours ? parseInt(laborHours) * 85 : 0;
  const fertilizerCost = fertilizer ? parseInt(fertilizer) * 12 : 0;
  const overallCost = materialCost + laborCost + fertilizerCost;

  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-8">
        {/* ✅ Metrics Grid */}
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

        {/* ✅ Button */}
        <TouchableOpacity
          className="bg-secondary rounded-xl mt-4 p-4 mb-6"
          onPress={() => setOpenModal(true)}
          activeOpacity={0.9}
        >
          <CsText className="text-light text-center text-lg font-semibold">
            Calculate Efficiency
          </CsText>
        </TouchableOpacity>

        {/* ✅ Summary */}
        <CsText className="text-2xl font-bold mb-4">Resource Summary</CsText>

        <ZiraatCard
          width="100%"
          paddingHorizontal={1}
          paddingVertical={1}
          marginBottom={1}
        >
          <SummaryRow label="Fertilizer Cost" value={`₹ ${fertilizerCost}`} />
          <SummaryRow label="Labor Cost" value={`₹ ${laborCost}`} />
          <SummaryRow label="Material Cost" value={`₹ ${materialCost}`} />
          <SummaryRow
            label="Overall Expenditure"
            value={`₹ ${overallCost}`}
            bold
          />
        </ZiraatCard>

        {/* ✅ Efficiency */}
        <CsText
          style={typography.Poppins_m_semibold}
          className="text-2xl mt-6 mb-4"
        >
          Input Efficiency Overview
        </CsText>

        {/* ✅ Remove height="10%" (this breaks layout on phones) */}
        <ZiraatCard
          width="100%"
          paddingHorizontal={1}
          paddingVertical={1}
          marginBottom={1}
        >
          {resourceData.efficiencyLabels.map((label: string, i: number) => (
            <EfficiencyTag
              key={i}
              label={label}
              score={i === 0 ? fertilizer : i === 1 ? laborHours : costInputs}
            />
          ))}
        </ZiraatCard>

        {/* ✅ Insights */}
        <CsText
          style={typography.Poppins_m_semibold}
          className="text-2xl mt-6 mb-4"
        >
          Performance Insights
        </CsText>

        <ZiraatCard
          width="100%"
          paddingHorizontal={1}
          paddingVertical={1}
          marginBottom={2}
        >
          {resourceData.insights.map((insight: any, i: number) => (
            <InsightItem key={i} icon={insight.icon} text={insight.text} />
          ))}
        </ZiraatCard>
      </ScreenContent>

      {/* ✅ Modal outside content (good) */}
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

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
import { Text, TouchableOpacity, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import resourceData from "../../../../data/resourceUsageData.json";
import InputModal from "./components/InputModal";

/* --------------------------------------------------
   ICON MAP
--------------------------------------------------- */
const iconMap = {
  Shield,
  AlertTriangle,
  Tractor,
  Wallet,
  Leaf,
  GaugeCircle,
  PiggyBank,
};

/* --------------------------------------------------
   METRIC CARD
--------------------------------------------------- */
const MetricCard = ({ title, value, icon }: any) => (
  <ZiraatCard
    width="49%"
    height={150}
    paddingHorizontal={1}
    paddingVertical={0.75}
    marginBottom={0.75}
  >
    <View className="h-full justify-between items-center">
      {iconMap?.[icon] &&
        React.createElement(iconMap[icon], {
          size: 38,
          color: colors.secondary,
          strokeWidth: 1.3,
        })}

      <Text className="text-[14px] ">{title}</Text>

      <Text className="text-center text-dark text-[18px] font-semibold">
        {value}
      </Text>
    </View>
  </ZiraatCard>
);

/* --------------------------------------------------
   SUMMARY ROW
--------------------------------------------------- */
const SummaryRow = ({ label, value, bold }: any) => (
  <View className="flex-row justify-between py-2">
    <Text className={bold ? "font-bold text-lg" : ""}>{label}</Text>
    <Text className={bold ? "font-bold text-lg" : ""}>{value}</Text>
  </View>
);

/* --------------------------------------------------
   EFFICIENCY TAG
--------------------------------------------------- */
const EfficiencyTag = ({ label, score }: any) => (
  <View className="flex-row items-center mb-2 justify-between">
    <Text className="text-l">{label}</Text>
    <Text className="text-lg font-semibold">{score || "0"}</Text>
  </View>
);

/* --------------------------------------------------
   INSIGHT ITEM
--------------------------------------------------- */
const InsightItem = ({ icon, text }: any) => {
  const Icon = iconMap?.[icon];

  return (
    <View className="mb-3 bg-white  py-3 rounded-lg">
      <View className="flex-row ">
        {Icon && <Icon size={26} color={colors.secondary} strokeWidth={1.3} />}
        <Text className="ml-2 flex-1 text-black">{text}</Text>
      </View>
    </View>
  );
};

/* --------------------------------------------------
   MAIN SCREEN
--------------------------------------------------- */
export default function InputResourceUsageScreen() {
  const [fertilizer, setFertilizer] = useState("");
  const [laborHours, setLaborHours] = useState("");
  const [costInputs, setCostInputs] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const materialCost = costInputs ? parseInt(costInputs) : 0;
  const laborCost = laborHours ? parseInt(laborHours) * 85 : 0;
  const fertilizerCost = fertilizer ? parseInt(fertilizer) * 12 : 0;
  const overallCost = materialCost + laborCost + fertilizerCost;

  return (
    <View className="flex-1 bg-white">
      <ScreenLayout>
        <BackHeader
          title="Input & Resource Usage"
          desc="Monitor field inputs and resource efficiency."
        />

        {/* METRICS */}
        <View className="flex-row flex-wrap justify-between">
          {resourceData.metrics.map((m: any, i: number) => (
            <MetricCard
              key={i}
              title={m.title}
              value={
                m.title === "Total Input Cost" ? `₹ ${overallCost}` : m.value
              }
              icon={m.icon}
            />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          className="bg-secondary rounded-xl mt-6 p-4 mb-6"
          onPress={() => setOpenModal(true)}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Calculate Efficiency
          </Text>
        </TouchableOpacity>

        {/* SUMMARY */}
        <Text className="text-2xl font-bold mb-4">Resource Summary</Text>

        <ZiraatCard
          width="100%"
          height={160}
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

        {/* EFFICIENCY */}
        <Text className="text-2xl font-bold mt-6 mb-4">
          Input Efficiency Overview
        </Text>

        <ZiraatCard
          width="100%"
          height="10%"
          paddingHorizontal={1}
          paddingVertical={1}
          marginBottom={1}
        >
          {resourceData.efficiencyLabels.map((label: string, i: number) => (
            <EfficiencyTag
              key={i}
              label={label}
              score={i === 0 ? fertilizer : i === 1 ? laborHours : materialCost}
            />
          ))}
        </ZiraatCard>

        {/* INSIGHTS */}
        <Text className="text-2xl font-bold mb-6">Performance Insights</Text>

        <ZiraatCard
          width="100%"
          height="18%"
          paddingHorizontal={1}
          paddingVertical={1}
          marginBottom={2}
        >
          <View className="bg-light">
            {resourceData.insights.map((insight: any, i: number) => (
              <InsightItem key={i} icon={insight.icon} text={insight.text} />
            ))}
          </View>
        </ZiraatCard>
      </ScreenLayout>

      {/* MODAL */}
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
    </View>
  );
}

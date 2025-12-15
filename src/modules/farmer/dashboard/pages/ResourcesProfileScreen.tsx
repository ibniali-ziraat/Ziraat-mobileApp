import { AlertTriangle, BarChart2, GaugeCircle, Leaf, PiggyBank, Shield, Tractor, Wallet } from "lucide-react-native";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { colors } from "@/src/constants/colors";
import resourceData from "../../../../Data/resourceUsageData.json";
import InputModal from "./components/InputModal";

const iconMap = { Shield, AlertTriangle, Tractor, Wallet, Leaf, GaugeCircle, PiggyBank };

const MetricCard = ({ title, value, icon }) => (
  <View className="w-[46%] bg-light rounded-2xl border border-dark p-4 mt-3 shadow">
    <View className="items-center">
      {iconMap[icon] && React.createElement(iconMap[icon], { size: 28, color:colors.secondary })}
      <Text className=" font-semibold">{title}</Text>
    </View>
    <Text className="text-l items-center text-center font-semibold mt-3">{value}</Text>
  </View>
);

const SummaryRow = ({ label, value, bold }) => (
  <View className="flex-row border border-dark p-2 rounded-lg mb-2 justify-between py-2">
    <Text className={bold ? "font-bold text-lg" : ""}>{label}</Text>
    <Text className={bold ? "font-bold text-lg" : ""}>{value}</Text>
  </View>
);

const EfficiencyTag = ({ label, score }) => (
  <View className=" p-3 border border-dark rounded-xl mt-2">
    <Text className="font-bold text-xl">{label}</Text>
    <Text className="font-medium ">{score || "0"}</Text>
  </View>
);

const InsightItem = ({ icon, text }) => (
  <View className="flex-row mb-3">
    {iconMap[icon] && React.createElement(iconMap[icon], { size: 24, color:colors.secondary })}
    <Text className="ml-2 flex-1">{text}</Text>
  </View>
);


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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-6">

        <Text className="text-3xl font-extrabold mb-1">
          Input & Resource Usage
        </Text>
        <Text className="text-neutral/100 mb-6">
          Monitor field inputs and resource efficiency.
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {resourceData.metrics.map((m, i) => (
            <MetricCard
              key={i}
              title={m.title}
              value={m.title === "Total Input Cost" ? `₹ ${overallCost}` : m.value}
              icon={m.icon}
            />
          ))}
        </View>

         <TouchableOpacity
          className="bg-secondary rounded-xl mt-6 p-4 mb-6"
          onPress={() => setOpenModal(true)}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Calculate Efficiency
          </Text>
        </TouchableOpacity>

        <Text className="text-2xl font-bold mt-8 mb-3">
          Resource Summary
        </Text>

        <SummaryRow label="Fertilizer Cost" value={`₹ ${fertilizerCost}`} />
        <SummaryRow label="Labor Cost" value={`₹ ${laborCost}`} />
        <SummaryRow label="Material Cost" value={`₹ ${materialCost}`} />
        <SummaryRow label="Overall Expenditure" value={`₹ ${overallCost}`} bold />

        <Text className="text-2xl font-bold mt-6 mb-4">
          Input Efficiency Overview
        </Text>

        <View className="bg-white p-5 rounded-xl border border-dark mb-6">
          <View className=" items-center mb-3">
            <BarChart2 size={30} color={colors.secondary} />
            <Text className="ml-2 text-lg font-bold">Efficiency Score</Text>
          </View>

          {resourceData.efficiencyLabels.map((label, i) => (
            <EfficiencyTag
              key={i}
              label={label}
              score={i === 0 ? fertilizer : i === 1 ? laborHours : materialCost}
            />
          ))}
        </View>

        <Text className="text-2xl font-bold mt-4 mb-2">
          Performance Insights
        </Text>

        <View className="bg-white p-5 rounded-xl border border-dark">
          {resourceData.insights.map((insight, i) => (
            <InsightItem key={i} icon={insight.icon} text={insight.text} />
          ))}
        </View>

      </ScrollView>

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
    </SafeAreaView>
  );
}

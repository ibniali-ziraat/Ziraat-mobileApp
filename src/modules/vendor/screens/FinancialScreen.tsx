import { ScrollView } from "react-native";

import ScreenLayout from "@/src/components/shared/ScreenLayout";
import BankDetailsCard from "../../../modules/vendor/components/financial/BankDetailsCard";
import WeeklySettlementCard from "../../../modules/vendor/components/financial/WeeklySettlementCard";
import SummaryCard from "../components/financial/SummaryCard";

export default function FinancialScreen() {
  const summary = {
    totalSales: 650000,
    payableToVendor: 510000,
    platformFees: 32000,
    discounts: 18000,
    outstanding: 120000,
    settlementsCount: 14,
  };

  const weekly = [
    { week: "Nov 18–24", amount: 2870.3, status: "Settled" },
    { week: "Nov 11–17", amount: 3012.6, status: "Settled" },
  ];

  const bank = {
    accountName: "Primary Account",
    masked: "**** 1383",
    status: "Settled",
    amount: 2870.3,
    change: +270.5,
  };

  const logs = [
    { id: "SETT-202315-001", amount: 2870.3, status: "Completed" },
    { id: "SETT-202315-002", amount: 3012.6, status: "Completed" },
    { id: "SETT-202315-003", amount: 2870.3, status: "Failed" },
  ];

  return (
    <ScreenLayout >
      <ScrollView className="">
        
        
        {/* <View className="mb-4 mt-1">
          <Text className="text-[22px] font-extrabold text-gray-900">
            Financial Overview
          </Text>
          <Text className="text-[12px] text-gray-500 mt-1">
            Sales, settlements & payout insights
          </Text>
        </View> */}

       
        {/* <SummaryGrid summary={summary} /> */}
<SummaryCard
  data={{
    totalSales: 650000,
    payableToVendor: 510000,
    platformFees: 32000,
    discounts: 18000,
    outstanding: 120000,
    settlementsCount: 14,
  }}
/>

      
        <WeeklySettlementCard weekly={weekly} />

       
        <BankDetailsCard bank={bank} logs={logs} />
      </ScrollView>
    </ScreenLayout>
  );
}

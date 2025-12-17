import BackHeader from "@/src/components/shared/BackHeader";
import { ScrollView } from "react-native";
import OrchardAnalyticsSection from "./components/OrchardAnalyticsSection";
import OrchardStatsSection from "./components/OrchardStatsSection";

export default function OrchardProfileScreen({
  orchards = [],
  admin = {},
  weather = null,
}: any) {
  return (
    <ScrollView className="flex-1 ">
      <BackHeader
      title="Orchard Profile"
      desc="Full analytics & actionable insights"
      />     

      <OrchardStatsSection
        orchards={orchards}
        admin={admin}
        weather={weather}
      />

      <OrchardAnalyticsSection
        orchards={orchards}
        admin={admin}
        weather={weather}
      />

     
    </ScrollView>
  );
}

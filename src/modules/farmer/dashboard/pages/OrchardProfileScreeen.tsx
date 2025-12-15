import { colors } from "@/src/constants/colors";
import { ScrollView, Text, View } from "react-native";
import OrchardAnalyticsSection from "./components/OrchardAnalyticsSection";
import OrchardStatsSection from "./components/OrchardStatsSection";

export default function OrchardProfileScreen({
  orchards = [],
  admin = {},
  weather = null,
}: any) {
  return (
    <ScrollView
      className="flex-1 bg-white p-4"
    >
      <Text
        className="text-[28px] font-extrabold mt-2"
        style={{ color:colors.dark }}
      >
        Orchard Profile
      </Text>

      <Text
        className="text-[13px] mt-1 mb-3"
        style={{ color: colors.dark }}
      >
        Full analytics & actionable insights
      </Text>

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

      <View className="h-6" />
    </ScrollView>
  );
}

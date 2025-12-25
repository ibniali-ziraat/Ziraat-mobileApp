import ScreenLayout from "@/src/components/shared/ScreenLayout";
import OrchardAnalyticsSection from "./components/OrchardAnalyticsSection";
import OrchardStatsSection from "./components/OrchardStatsSection";

export default function OrchardProfileScreen({
  orchards = [],
  admin = {},
  weather = null,
}: any) {
  return (
    <ScreenLayout>
           

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

     
    </ScreenLayout>
  );
}

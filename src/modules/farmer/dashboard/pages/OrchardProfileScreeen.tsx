import ScreenLayout from "@/src/components/shared/ScreenLayout";

import OrchardAnalyticsSection from "./components/OrchardAnalyticsSection";
import OrchardStatsSection from "./components/OrchardStatsSection";
import { ScreenContent } from "@/src/components/shared/ScreenContent";

export default function OrchardProfileScreen({
  orchards = [],
  admin = {},
  weather = null,
}: any) {
  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-6">
        <OrchardStatsSection orchards={orchards} admin={admin} weather={weather} />

        <OrchardAnalyticsSection orchards={orchards} admin={admin} weather={weather} />
      </ScreenContent>
    </ScreenLayout>
  );
}

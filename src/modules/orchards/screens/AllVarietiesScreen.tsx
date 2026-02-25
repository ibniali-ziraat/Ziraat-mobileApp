
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import VarietiesCard from "../components/VarietyDetailsCard";
import { OrchardRouteKey, orchardRoutes } from "../routes/orchardRoutes";

export default function AllVarieties() {
  const params = useLocalSearchParams();

  const varieties = params.varieties
    ? JSON.parse(params.varieties as string)
    : [];

  const goToSection = (
    section: OrchardRouteKey,
    varietyId?: number | string
  ) => {
    if (varietyId) {
      router.push({
        pathname: orchardRoutes[section],
        params: { varietyId: String(varietyId) },
      });
    } else {
      router.push(orchardRoutes[section]);
    }
  };

  return (
   <ScreenLayout>
    <BackHeader
            title= "All Varieties"
           
          />
     <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <ScrollView >
        <VarietiesCard
          varietiesData={varieties}
          onAdd={() => goToSection("varietyAndPlanting")}
          onEdit={(id) => goToSection("varietyAndPlanting", id)}
          onDelete={(id) => console.log("delete", id)}
          showAll
        />
      </ScrollView>
    </View>
   </ScreenLayout>
  );
}
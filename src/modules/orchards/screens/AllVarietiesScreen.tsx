// import BackHeader from "@/src/components/shared/BackHeader";
// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { colors } from "@/src/constants/colors";
// import { router, useLocalSearchParams } from "expo-router";
// import { ScrollView, View } from "react-native";
// import VarietiesCard from "../components/VarietyDetailsCard";
// import { OrchardRouteKey, orchardRoutes } from "../routes/orchardRoutes";

// export default function AllVarieties() {
//   const params = useLocalSearchParams();

//   const varieties = params.varieties
//     ? JSON.parse(params.varieties as string)
//     : [];

//   const goToSection = (
//     section: OrchardRouteKey,
//     varietyId?: number | string
//   ) => {
//     if (varietyId) {
//       router.push({
//         pathname: orchardRoutes[section],
//         params: { varietyId: String(varietyId) },
//       });
//     } else {
//       router.push(orchardRoutes[section]);
//     }
//   };

//   return (
//    <ScreenLayout>
//     <BackHeader
//             title= "All Varieties"

//           />
//      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
//       <ScrollView >
//         <VarietiesCard
//           varietiesData={varieties}
//           onAdd={() => goToSection("varietyAndPlanting")}
//           onEdit={(id) => goToSection("varietyAndPlanting", id)}
//           onDelete={(id) => console.log("delete", id)}
//           showAll
//         />
//       </ScrollView>
//     </View>
//    </ScreenLayout>
//   );
// }

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import VarietiesCard from "../components/VarietyDetailsCard";
import { OrchardRouteKey, orchardRoutes } from "../routes/orchardRoutes";

export default function AllVarieties() {
  const params = useLocalSearchParams();

  const [varieties, setVarieties] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (params.varieties) {
      setVarieties(JSON.parse(params.varieties as string));
    }
  }, [params.varieties]);

  const goToSection = (
    section: OrchardRouteKey,
    varietyId?: number | string,
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

  const onDeletePress = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;

    setVarieties((prev) => prev.filter((item) => item.id !== selectedId));

    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <ScreenLayout>
      <BackHeader title="All Varieties" />

      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        <VarietiesCard
          varietiesData={varieties}
          onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.VARIETY_INFO)}
          onEdit={(id) => goToSection("varietyAndPlanting", id)}
          onDelete={onDeletePress}
          showAll
        />
      </View>

      <ConfirmDeleteModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Variety?"
        description="Are you sure you want to delete this variety?"
      />
    </ScreenLayout>
  );
}

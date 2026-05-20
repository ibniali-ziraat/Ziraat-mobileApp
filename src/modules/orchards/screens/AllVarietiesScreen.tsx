import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import VarietiesCard from "../components/VarietyDetailsCard";
import {
  useDeleteVarietyMutation,
  useOrchardVarietiesQuery,
} from "../hooks/useOrchardsQuery";
import { OrchardRouteKey, orchardRoutes } from "../routes/orchardRoutes";

export default function AllVarieties() {
  const { orchardProfileId } = useAuth();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Live query — always reflects latest data
  const { data: varieties = [] } = useOrchardVarietiesQuery(orchardProfileId!);

  const { mutateAsync: deleteVariety, isPending: isDeleting } =
    useDeleteVarietyMutation();

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

  const handleConfirmDelete = async () => {
    if (!selectedId || !orchardProfileId) return;

    try {
      await deleteVariety({
        id: orchardProfileId,
        varietyId: selectedId,
      });

      await queryClient.refetchQueries({
        queryKey: ["orchardVarieties", orchardProfileId],
      });

      showSuccessToast("Variety deleted successfully");
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to delete variety");
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
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
        title="Delete Variety?"
        description="Are you sure you want to delete this variety?"
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </ScreenLayout>
  );
}

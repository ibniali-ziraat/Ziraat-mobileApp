import { ROUTES } from "@/src/constants/routes";
import { useFileDeleteMutation } from "@/src/hooks/useFileUpload";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { OrchardDeleteKey } from "../config/orchardDeleteConfig";
import {
  useDeleteInfrastructureMutation,
  useDeleteInputCostMutation,
  useDeleteOrchardEntireMutation,
  useDeleteOrchardExtraMutation,
  useDeleteOrchardSectionMutation,
  useDeletePlantProtectionMutation,
  useDeleteProductionMarketingMutation,
  useDeleteSoilWaterMutation,
  useDeleteVarietyMutation,
} from "../hooks/useOrchardsQuery";
import { useDeleteSoilTestReportMutation } from "../hooks/useSoilTestReport";

export const useOrchardDeletion = (orchardProfileId: string) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  // File & Soil Report Mutations
  const { mutateAsync: deleteFileAsync } = useFileDeleteMutation();
  const { mutateAsync: updateSoilWater } = useDeleteSoilTestReportMutation();

  // Mapping Section Keys to Mutations
  const sectionMutations: Record<string, any> = {
    nutrition: useDeleteOrchardSectionMutation(),
    farmInfrastructure: useDeleteInfrastructureMutation(),
    soilAndWater: useDeleteSoilWaterMutation(),
    plantHealth: useDeletePlantProtectionMutation(),
    production: useDeleteProductionMarketingMutation(),
    inputCost: useDeleteInputCostMutation(),
    futureReadiness: useDeleteOrchardExtraMutation(),
  };

  const varietyMutation = useDeleteVarietyMutation();
  const entireOrchardMutation = useDeleteOrchardEntireMutation();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["orchard", orchardProfileId] });
  };

  const deleteSection = async (section: OrchardDeleteKey) => {
    try {
      setIsDeleting(true);
      await sectionMutations[section].mutateAsync(orchardProfileId);
      invalidate();
      showSuccessToast("Section deleted successfully");
    } catch (error) {
      showErrorToast("Failed to delete section");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteVariety = async (varietyId: number) => {
    try {
      setIsDeleting(true);
      await varietyMutation.mutateAsync({ id: orchardProfileId, varietyId });
      invalidate();
      showSuccessToast("Variety deleted successfully");
    } catch (error) {
      showErrorToast("Failed to delete variety");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteSoilTestReport = async (
    urlToDelete: string,
    currentReports: string[],
  ) => {
    try {
      setIsDeleting(true);
      await deleteFileAsync({ blobName: urlToDelete });
      const updatedReports = currentReports.filter(
        (url) => url !== urlToDelete,
      );
      await updateSoilWater({
        orchardProfileId,
        soilTestReportUrls: updatedReports,
      });
      invalidate();
      showSuccessToast("Report deleted");
    } catch (error) {
      showErrorToast("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteEntireOrchard = async () => {
    try {
      setIsDeleting(true);
      await entireOrchardMutation.mutateAsync(orchardProfileId);
      showSuccessToast("Orchard deleted successfully");
      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error) {
      showErrorToast("Failed to delete orchard");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteSection,
    deleteVariety,
    deleteSoilTestReport,
    deleteEntireOrchard,
    isDeleting:
      isDeleting ||
      varietyMutation.isPending ||
      entireOrchardMutation.isPending,
  };
};

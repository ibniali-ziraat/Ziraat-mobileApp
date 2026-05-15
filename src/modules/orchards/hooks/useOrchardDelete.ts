// import { ROUTES } from "@/src/constants/routes";
// import { useFileDeleteMutation } from "@/src/hooks/useFileUpload";
// import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { router } from "expo-router";
// import { useState } from "react";
// import { OrchardDeleteKey } from "../config/orchardDeleteConfig";
// import {
//   useDeleteInfrastructureMutation,
//   useDeleteInputCostMutation,
//   useDeleteOrchardEntireMutation,
//   useDeleteOrchardExtraMutation,
//   useDeleteOrchardSectionMutation,
//   useDeletePlantProtectionMutation,
//   useDeleteProductionMarketingMutation,
//   useDeleteSoilWaterMutation,
//   useDeleteVarietyMutation,
// } from "../hooks/useOrchardsQuery";
// import { useDeleteSoilTestReportMutation } from "../hooks/useSoilTestReport";

// export const useOrchardDeletion = (orchardProfileId: string) => {
//   const queryClient = useQueryClient();
//   const [isDeleting, setIsDeleting] = useState(false);

//   // File & Soil Report Mutations
//   const { mutateAsync: deleteFileAsync } = useFileDeleteMutation();
//   const { mutateAsync: updateSoilWater } = useDeleteSoilTestReportMutation();

//   // Mapping Section Keys to Mutations
//   const sectionMutations: Record<string, any> = {
//     nutrition: useDeleteOrchardSectionMutation(),
//     farmInfrastructure: useDeleteInfrastructureMutation(),
//     soilAndWater: useDeleteSoilWaterMutation(),
//     plantHealth: useDeletePlantProtectionMutation(),
//     production: useDeleteProductionMarketingMutation(),
//     inputCost: useDeleteInputCostMutation(),
//     futureReadiness: useDeleteOrchardExtraMutation(),
//   };

//   const varietyMutation = useDeleteVarietyMutation();
//   const entireOrchardMutation = useDeleteOrchardEntireMutation();

//   const invalidate = () => {
//     queryClient.invalidateQueries({ queryKey: ["orchard", orchardProfileId] });
//   };

//   const deleteSection = async (section: OrchardDeleteKey) => {
//     try {
//       setIsDeleting(true);
//       await sectionMutations[section].mutateAsync(orchardProfileId);
//       invalidate();
//       showSuccessToast("Section deleted successfully");
//     } catch (error) {
//       showErrorToast("Failed to delete section");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const deleteVariety = async (varietyId: number) => {
//     try {
//       setIsDeleting(true);
//       await varietyMutation.mutateAsync({ id: orchardProfileId, varietyId });
//       invalidate();
//       showSuccessToast("Variety deleted successfully");
//     } catch (error) {
//       showErrorToast("Failed to delete variety");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const deleteSoilTestReport = async (
//     urlToDelete: string,
//     currentReports: string[],
//   ) => {
//     try {
//       setIsDeleting(true);
//       await deleteFileAsync({ blobName: urlToDelete });
//       const updatedReports = currentReports.filter(
//         (url) => url !== urlToDelete,
//       );
//       await updateSoilWater({
//         orchardProfileId,
//         soilTestReportUrls: updatedReports,
//       });
//       invalidate();
//       showSuccessToast("Report deleted");
//     } catch (error) {
//       showErrorToast("Failed to delete report");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const deleteEntireOrchard = async () => {
//     try {
//       setIsDeleting(true);
//       await entireOrchardMutation.mutateAsync(orchardProfileId);
//       showSuccessToast("Orchard deleted successfully");
//       router.replace(ROUTES.TABS.ORCHARDS);
//     } catch (error) {
//       showErrorToast("Failed to delete orchard");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return {
//     deleteSection,
//     deleteVariety,
//     deleteSoilTestReport,
//     deleteEntireOrchard,
//     isDeleting:
//       isDeleting ||
//       varietyMutation.isPending ||
//       entireOrchardMutation.isPending,
//   };
// };

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

  // File Delete Mutation
  const { mutateAsync: deleteFileAsync } = useFileDeleteMutation();

  // Soil Report Update Mutation
  const { mutateAsync: updateSoilWater } = useDeleteSoilTestReportMutation();

  // Section Mutations
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

  // Delete Orchard Section
  const deleteSection = async (section: OrchardDeleteKey) => {
    try {
      setIsDeleting(true);

      await sectionMutations[section].mutateAsync(orchardProfileId);

      // Refetch immediately
      await queryClient.refetchQueries({
        queryKey: ["orchard", orchardProfileId],
      });

      showSuccessToast("Section deleted successfully");
    } catch (error) {
      console.log(error);

      showErrorToast("Failed to delete section");
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete Variety
  const deleteVariety = async (varietyId: number) => {
    try {
      setIsDeleting(true);

      await varietyMutation.mutateAsync({
        id: orchardProfileId,
        varietyId,
      });

      // Refetch immediately
      await queryClient.refetchQueries({
        queryKey: ["orchard", orchardProfileId],
      });

      showSuccessToast("Variety deleted successfully");
    } catch (error) {
      console.log(error);

      showErrorToast("Failed to delete variety");
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete Soil Test Report
  const deleteSoilTestReport = async (
    urlToDelete: string,
    currentReports: string[],
  ) => {
    try {
      setIsDeleting(true);

      const updatedReports = currentReports.filter(
        (url) => url !== urlToDelete,
      );

      // IMPORTANT:
      // Use EXACT SAME query key as useSoilWaterQuery
      queryClient.setQueryData(
        ["soilWater", orchardProfileId],
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            soilTestReportUrls: updatedReports,
          };
        },
      );

      // Delete file
      await deleteFileAsync({
        blobName: urlToDelete,
      });

      // Update backend
      await updateSoilWater({
        orchardProfileId,
        soilTestReportUrls: updatedReports,
      });

      // Optional refetch
      await queryClient.invalidateQueries({
        queryKey: ["soilWater", orchardProfileId],
      });

      showSuccessToast("Report deleted successfully");
    } catch (error) {
      console.log(error);

      showErrorToast("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete Entire Orchard
  const deleteEntireOrchard = async () => {
    try {
      setIsDeleting(true);

      await entireOrchardMutation.mutateAsync(orchardProfileId);

      showSuccessToast("Orchard deleted successfully");

      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error) {
      console.log(error);

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

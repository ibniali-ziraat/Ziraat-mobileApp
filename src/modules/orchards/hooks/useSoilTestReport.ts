// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   createSoilTestReport,
//   deleteSoilTestReport,
//   getSoilTestReport,
// } from "../services/orchard.service";

// export const useSoilTestReportQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["soilWater", orchardId],
//     queryFn: () => getSoilTestReport(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateSoilTestReportMutation = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: createSoilTestReport,
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
//   });
// };

// export const useDeleteSoilTestReportMutation = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: deleteSoilTestReport,
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
//   });
// };
import { ID } from "@/src/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSoilTestReport,
  deleteSoilTestReport,
  getSoilTestReport,
} from "../services/orchard.service";

// Fetch existing soil test reports for an orchard
export const useSoilTestReportQuery = (orchardProfileId: ID) =>
  useQuery({
    queryKey: ["soilTestReport", orchardProfileId],
    queryFn: () => getSoilTestReport(orchardProfileId),
    enabled: !!orchardProfileId,
  });

// Patch (merge-safe from the screen side) soil test report URLs
export const useCreateSoilTestReportMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSoilTestReport,
    onSuccess: (_, variables: any) => {
      qc.invalidateQueries({
        queryKey: ["soilTestReport", variables.orchardProfileId],
      });
      // Also invalidate soilWater since they share the same endpoint
      qc.invalidateQueries({ queryKey: ["soilWater"] });
    },
  });
};

export const useDeleteSoilTestReportMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSoilTestReport,
    onSuccess: (_, variables: any) => {
      qc.invalidateQueries({
        queryKey: ["soilTestReport", variables.orchardProfileId],
      });
    },
  });
};

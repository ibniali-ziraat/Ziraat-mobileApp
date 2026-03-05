import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSoilTestReport,
  deleteSoilTestReport,
  getSoilTestReport,
} from "../services/orchard.service";

export const useSoilTestReportQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["soilWater", orchardId],
    queryFn: () => getSoilTestReport(orchardId),
    enabled: !!orchardId,
  });

export const useCreateSoilTestReportMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSoilTestReport,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
  });
};

export const useDeleteSoilTestReportMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSoilTestReport,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
  });
};

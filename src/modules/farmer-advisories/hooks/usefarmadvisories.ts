import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acknowledgeAdvisory,
  addFertigation,
  addHarvest,
  addPruning,
  addSpray,
  getAdvisoryById,
  getAllAdvisories,
  readAdvisory,
} from "../services/farmeradvisories.service";

/* ============================== QUERY KEYS ============================== */

export const advisoryKeys = {
  all: ["advisories"] as const,
  list: (orchardProfileId: number, page: number, pageSize: number) =>
    ["advisories", "list", orchardProfileId, page, pageSize] as const,
  detail: (recipientId: string) =>
    ["advisories", "detail", recipientId] as const,
};

/* ============================== QUERIES ============================== */

export const useAdvisories = (
  orchardProfileId?: number,
  page: number = 1,
  pageSize: number = 25,
) => {
  return useQuery({
    queryKey: advisoryKeys.list(orchardProfileId ?? 0, page, pageSize),
    queryFn: () =>
      getAllAdvisories({
        orchardProfileId: orchardProfileId as number,
        page,
        pageSize,
      }),
    enabled: !!orchardProfileId, // don't fetch until an orchard is selected
  });
};

export const useAdvisoryById = (recipientId?: string) => {
  return useQuery({
    queryKey: advisoryKeys.detail(recipientId ?? ""),
    queryFn: () => getAdvisoryById(recipientId as string),
    enabled: !!recipientId, // works for notification deep links
  });
};

/* ============================== STATUS MUTATIONS ============================== */

// Refreshes the list and the opened advisory after any change
const useInvalidateAdvisories = () => {
  const queryClient = useQueryClient();

  return (recipientId: string) => {
    queryClient.invalidateQueries({ queryKey: ["advisories", "list"] });
    queryClient.invalidateQueries({
      queryKey: advisoryKeys.detail(recipientId),
    });
  };
};

export const useReadAdvisory = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (recipientId: string) => readAdvisory(recipientId),
    onSuccess: (_data, recipientId) => invalidate(recipientId),
  });
};

export const useAcknowledgeAdvisory = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (vars: { recipientId: string; actionCompleted?: boolean }) =>
      acknowledgeAdvisory(vars.recipientId, vars.actionCompleted ?? false),
    onSuccess: (_data, vars) => invalidate(vars.recipientId),
  });
};

/* ============================== OPERATION MUTATIONS ============================== */

export const useAddSpray = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (vars: {
      recipientId: string;
      payload: Parameters<typeof addSpray>[1];
    }) => addSpray(vars.recipientId, vars.payload),
    onSuccess: (_data, vars) => invalidate(vars.recipientId),
  });
};

export const useAddFertigation = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (vars: {
      recipientId: string;
      payload: Parameters<typeof addFertigation>[1];
    }) => addFertigation(vars.recipientId, vars.payload),
    onSuccess: (_data, vars) => invalidate(vars.recipientId),
  });
};

export const useAddPruning = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (vars: {
      recipientId: string;
      payload: Parameters<typeof addPruning>[1];
    }) => addPruning(vars.recipientId, vars.payload),
    onSuccess: (_data, vars) => invalidate(vars.recipientId),
  });
};

export const useAddHarvest = () => {
  const invalidate = useInvalidateAdvisories();

  return useMutation({
    mutationFn: (vars: {
      recipientId: string;
      payload: Parameters<typeof addHarvest>[1];
    }) => addHarvest(vars.recipientId, vars.payload),
    onSuccess: (_data, vars) => invalidate(vars.recipientId),
  });
};

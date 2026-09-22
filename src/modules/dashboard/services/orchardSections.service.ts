import axiosInstance from "@/src/api/client/axiosInstance";
import type {
  AdvisoryResponse,
  AlertsResponse,
  FinancialResponse,
  NutrientResponse,
  PestDiseaseResponse,
  ResourcesResponse,
} from "../types/orchardSections";

const BASE = "/api/core/farmer-dashboard";

// Every call here is scoped to one orchard only — orchardProfileId, no year.
const get = <T>(path: string, orchardProfileId: number, signal?: AbortSignal) =>
  axiosInstance
    .get<T>(`${BASE}/${path}`, { params: { orchardProfileId }, signal })
    .then((res) => res.data);

export const getOrchardNutrient = (orchardProfileId: number, signal?: AbortSignal) =>
  get<NutrientResponse>("nutrient", orchardProfileId, signal);

export const getOrchardPestDisease = (orchardProfileId: number, signal?: AbortSignal) =>
  get<PestDiseaseResponse>("pest-disease", orchardProfileId, signal);

export const getOrchardResources = (orchardProfileId: number, signal?: AbortSignal) =>
  get<ResourcesResponse>("resources", orchardProfileId, signal);

export const getOrchardFinancial = (orchardProfileId: number, signal?: AbortSignal) =>
  get<FinancialResponse>("financial", orchardProfileId, signal);

export const getOrchardAdvisory = (orchardProfileId: number, signal?: AbortSignal) =>
  get<AdvisoryResponse>("advisory", orchardProfileId, signal);

export const getOrchardAlerts = (orchardProfileId: number, signal?: AbortSignal) =>
  get<AlertsResponse>("alerts", orchardProfileId, signal);

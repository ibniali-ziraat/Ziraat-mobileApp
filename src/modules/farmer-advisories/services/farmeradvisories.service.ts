import axiosInstance from "@/src/api/client/axiosInstance";

const BASE = "/api/core/farmer-dashboard/advisories";

/* ============================== TYPES ============================== */

export type AdvisoryKind = "spray" | "fertigation" | "pruning" | "harvest";

export type Quantity = {
  value: number;
  unit: string;
};

export type AdvisoryListItem = {
  recipientId: string;
  version: string;
  advisoryId: string;
  orchardProfileId: number;
  orchardName: string;
  title: string;
  kind: AdvisoryKind;
  status: string;
  windowStart: string;
  windowEnd: string;
  readOn: string | null;
  acknowledgedOn: string | null;
  completedOn: string | null;
  isOverdue: boolean;
};

export type AdvisoryListResponse = {
  total: number;
  page: number;
  pageSize: number;
  items: AdvisoryListItem[];
};

export type AdvisoryDetail = AdvisoryListItem & {
  recommendation: string;
  crop: string;
  variety: string;
  growthStage: string;
  cancellationReason: string | null;
};

export type AdvisoryActionResponse = {
  id: string;
  version: string;
  status: string;
  recipientCount: number;
  openOperationForm: boolean;
};

export type OperationResponse = {
  id: string;
  version: string;
  status: string;
  kind: string;
  totalIncome: number;
};

/* ---------- Operation payloads ---------- */

// Fields shared by every operation
export type BaseOperationPayload = {
  version: string; // from AdvisoryDetail.version
  operationDate: string; // ISO string
  coverage?: Quantity;
  labourHours?: number;
  numberOfLabourers?: number;
  equipmentUsed?: string[];
  equipmentHours?: { equipment: string; hours: number }[];
  cost?: number;
  currency?: string; // 3 letters e.g. "INR"
  notes?: string;
};

export type SprayPayload = BaseOperationPayload & {
  productUsed?: string;
  targetPestDisease?: string;
  doseApplied?: Quantity;
  totalMixtureVolume?: Quantity;
  actualProductQuantity?: Quantity;
};

export type FertigationPayload = BaseOperationPayload & {
  fertilizerType?: string;
  quantityApplied?: Quantity;
  irrigationVolumeApplied?: Quantity;
};

export type PruningPayload = BaseOperationPayload & {
  pruningType: string; // e.g. "rejuvenation"
};

export type SaleLot = {
  quantity: Quantity;
  isSold: boolean;
  priceReceivedPerUnit?: Quantity;
  buyerOrMandi?: string;
};

export type HarvestPayload = BaseOperationPayload & {
  quantityHarvested: Quantity;
  costOfHarvesting?: number;
  saleLots?: SaleLot[];
};

export type OperationPayloadMap = {
  spray: SprayPayload;
  fertigation: FertigationPayload;
  pruning: PruningPayload;
  harvest: HarvestPayload;
};

/* ============================== READ ============================== */

export const getAllAdvisories = async (params: {
  orchardProfileId: number;
  page?: number;
  pageSize?: number;
}): Promise<AdvisoryListResponse> => {
  const response = await axiosInstance.get(BASE, {
    params: { page: 1, pageSize: 25, ...params },
  });

  return response.data;
};

export const getAdvisoryById = async (
  recipientId: string,
): Promise<AdvisoryDetail> => {
  const response = await axiosInstance.get(`${BASE}/${recipientId}`);

  return response.data;
};

/* ============================== STATUS ============================== */

// Call when the farmer opens the advisory detail screen
export const readAdvisory = async (
  recipientId: string,
): Promise<AdvisoryActionResponse> => {
  const response = await axiosInstance.post(`${BASE}/${recipientId}/read`);

  return response.data;
};

// actionCompleted: true = done, false = seen but will do later
export const acknowledgeAdvisory = async (
  recipientId: string,
  actionCompleted: boolean = false,
): Promise<AdvisoryActionResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/acknowledge`,
    { actionCompleted },
  );

  return response.data;
};

/* ============================== OPERATIONS ============================== */

export const addSpray = async (
  recipientId: string,
  payload: SprayPayload,
): Promise<OperationResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/operations/spray`,
    payload,
  );

  return response.data;
};

export const addFertigation = async (
  recipientId: string,
  payload: FertigationPayload,
): Promise<OperationResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/operations/fertigation`,
    payload,
  );

  return response.data;
};

export const addPruning = async (
  recipientId: string,
  payload: PruningPayload,
): Promise<OperationResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/operations/pruning`,
    payload,
  );

  return response.data;
};

export const addHarvest = async (
  recipientId: string,
  payload: HarvestPayload,
): Promise<OperationResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/operations/harvest`,
    payload,
  );

  return response.data;
};

// Generic helper: pick the right endpoint from advisory.kind
export const addOperation = async <K extends AdvisoryKind>(
  kind: K,
  recipientId: string,
  payload: OperationPayloadMap[K],
): Promise<OperationResponse> => {
  const response = await axiosInstance.post(
    `${BASE}/${recipientId}/operations/${kind}`,
    payload,
  );

  return response.data;
};

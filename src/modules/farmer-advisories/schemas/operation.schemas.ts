import { z } from "zod";
import { CURRENCY, UNITS } from "../constants/advisoryOptions";
import type {
  AdvisoryKind,
  OperationPayloadMap,
  Quantity,
} from "../services/farmeradvisories.service";

/* ============================== FIELD RULES ============================== */

// inputs hold strings; they're turned into numbers in buildOperationPayload
const NUMBER_PATTERN = /^\d+(\.\d+)?$/;

const optionalNumber = z
  .string()
  .optional()
  .refine((v) => !v || NUMBER_PATTERN.test(v), "Enter a valid number");

const requiredNumber = z
  .string({ required_error: "Required" })
  .min(1, "Required")
  .refine((v) => !v || NUMBER_PATTERN.test(v), "Enter a valid number");

const optionalWholeNumber = z
  .string()
  .optional()
  .refine((v) => !v || /^\d+$/.test(v), "Enter a whole number");

const quantity = z.object({
  value: optionalNumber,
  unit: z.string().optional(),
});

const requiredQuantity = z.object({
  value: requiredNumber,
  unit: z.string({ required_error: "Select unit" }).min(1, "Select unit"),
});

const optionalText = z.string().max(100, "Too long").optional();

/* ============================== SCHEMAS ============================== */

const baseShape = {
  operationDate: z
    .string({ required_error: "Select the date" })
    .min(1, "Select the date"),
  coverage: quantity,
  labourHours: optionalNumber,
  numberOfLabourers: optionalWholeNumber,
  equipmentUsed: z.array(z.string()).optional(),
  equipmentHours: z
    .array(
      z.object({
        equipment: z.string().min(1, "Required"),
        hours: requiredNumber,
      }),
    )
    .optional(),
  cost: optionalNumber,
  notes: z.string().max(500, "Too long").optional(),
};

export const operationSchemas = {
  spray: z.object({
    ...baseShape,
    productUsed: optionalText,
    targetPestDisease: optionalText,
    doseApplied: quantity,
    totalMixtureVolume: quantity,
    actualProductQuantity: quantity,
  }),
  fertigation: z.object({
    ...baseShape,
    fertilizerType: optionalText,
    quantityApplied: quantity,
    irrigationVolumeApplied: quantity,
  }),
  pruning: z.object({
    ...baseShape,
    pruningType: z
      .string({ required_error: "Select pruning type" })
      .min(1, "Select pruning type"),
  }),
  harvest: z.object({
    ...baseShape,
    quantityHarvested: requiredQuantity,
    costOfHarvesting: optionalNumber,
    saleLots: z
      .array(
        z.object({
          quantity: requiredQuantity,
          isSold: z.string(),
          priceReceivedPerUnit: quantity,
          buyerOrMandi: optionalText,
        }),
      )
      .optional(),
  }),
} satisfies Record<AdvisoryKind, z.ZodTypeAny>;

export type OperationFormValues = z.infer<
  (typeof operationSchemas)[AdvisoryKind]
> &
  Record<string, any>;

/* ============================== DEFAULTS ============================== */

const todayString = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const emptyQuantity = (units: { value: string }[]) => ({
  value: "",
  unit: units[0].value,
});

export const emptySaleLot = () => ({
  quantity: emptyQuantity(UNITS.harvestQuantity),
  isSold: "yes",
  priceReceivedPerUnit: emptyQuantity(UNITS.pricePer),
  buyerOrMandi: "",
});

export const getDefaultValues = (kind: AdvisoryKind) => {
  const base = {
    operationDate: todayString(),
    coverage: emptyQuantity(UNITS.coverage),
    labourHours: "",
    numberOfLabourers: "",
    equipmentUsed: [] as string[],
    equipmentHours: [] as { equipment: string; hours: string }[],
    cost: "",
    notes: "",
  };

  switch (kind) {
    case "spray":
      return {
        ...base,
        productUsed: "",
        targetPestDisease: "",
        doseApplied: emptyQuantity(UNITS.dose),
        totalMixtureVolume: emptyQuantity(UNITS.volume),
        actualProductQuantity: emptyQuantity(UNITS.productQuantity),
      };
    case "fertigation":
      return {
        ...base,
        fertilizerType: "",
        quantityApplied: emptyQuantity(UNITS.fertilizerQuantity),
        irrigationVolumeApplied: emptyQuantity(UNITS.volume),
      };
    case "pruning":
      return { ...base, pruningType: "" };
    case "harvest":
      return {
        ...base,
        quantityHarvested: emptyQuantity(UNITS.harvestQuantity),
        costOfHarvesting: "",
        saleLots: [] as ReturnType<typeof emptySaleLot>[],
      };
  }
};

/* ============================== PAYLOAD ============================== */

type QuantityInputValue = { value?: string; unit?: string } | undefined;

const toNumber = (value?: string) => (value ? Number(value) : undefined);

const toQuantity = (quantityValue: QuantityInputValue): Quantity | undefined =>
  quantityValue?.value && quantityValue.unit
    ? { value: Number(quantityValue.value), unit: quantityValue.unit }
    : undefined;

const toText = (value?: string) => value?.trim() || undefined;

// drops empty fields so the api only gets what the farmer filled in
const compact = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) =>
        value !== undefined && !(Array.isArray(value) && value.length === 0),
    ),
  ) as T;

export const buildOperationPayload = <K extends AdvisoryKind>(
  kind: K,
  values: OperationFormValues,
  version: string,
): OperationPayloadMap[K] => {
  const base = {
    version,
    // midday keeps the picked day the same after the UTC conversion
    operationDate: new Date(`${values.operationDate}T12:00:00`).toISOString(),
    coverage: toQuantity(values.coverage),
    labourHours: toNumber(values.labourHours),
    numberOfLabourers: toNumber(values.numberOfLabourers),
    equipmentUsed: values.equipmentUsed,
    equipmentHours: values.equipmentHours?.map(
      (row: { equipment: string; hours: string }) => ({
        equipment: row.equipment.trim(),
        hours: Number(row.hours),
      }),
    ),
    cost: toNumber(values.cost),
    currency: values.cost ? CURRENCY : undefined,
    notes: toText(values.notes),
  };

  const byKind: Record<AdvisoryKind, Record<string, unknown>> = {
    spray: {
      productUsed: toText(values.productUsed),
      targetPestDisease: toText(values.targetPestDisease),
      doseApplied: toQuantity(values.doseApplied),
      totalMixtureVolume: toQuantity(values.totalMixtureVolume),
      actualProductQuantity: toQuantity(values.actualProductQuantity),
    },
    fertigation: {
      fertilizerType: toText(values.fertilizerType),
      quantityApplied: toQuantity(values.quantityApplied),
      irrigationVolumeApplied: toQuantity(values.irrigationVolumeApplied),
    },
    pruning: {
      pruningType: values.pruningType,
    },
    harvest: {
      quantityHarvested: toQuantity(values.quantityHarvested),
      costOfHarvesting: toNumber(values.costOfHarvesting),
      saleLots: values.saleLots?.map(
        (lot: ReturnType<typeof emptySaleLot>) =>
          compact({
            quantity: toQuantity(lot.quantity),
            isSold: lot.isSold === "yes",
            priceReceivedPerUnit: toQuantity(lot.priceReceivedPerUnit),
            buyerOrMandi: toText(lot.buyerOrMandi),
          }),
      ),
    },
  };

  return compact({ ...base, ...byKind[kind] }) as OperationPayloadMap[K];
};

import { z } from "zod";
import { CURRENCY, PRUNING_TYPES, UNITS } from "../constants/advisoryOptions";
import type {
  AdvisoryKind,
  OperationPayloadMap,
  Quantity,
} from "../services/farmeradvisories.service";

/* ============================== FIELD RULES ============================== */

/**
 * Limits the api enforces on every operation request (from its Swagger
 * schema: SprayOperationRequest, FertigationOperationRequest, ...). Keep these
 * in step with the backend so the farmer sees the problem on the field instead
 * of a failed save.
 */
export const OPERATION_LIMITS = {
  quantity: { min: 0.0001, max: 999_999_999 }, // every { value, unit } field
  labourHours: { min: 0, max: 1_000_000 },
  labourers: { min: 1, max: 100_000 },
  equipmentHours: { min: 0.0001, max: 100_000 },
  money: { min: 0, max: 999_999_999_999 }, // cost, costOfHarvesting
  text: 200, // product, pest/disease, fertilizer, buyer
  equipmentName: 64,
  notes: 2000,
  equipmentItems: 50,
  saleLots: 100,
} as const;

// inputs hold strings; they're turned into numbers in buildOperationPayload
const NUMBER_PATTERN = /^\d+(\.\d+)?$/;
const WHOLE_PATTERN = /^\d+$/;

const formatLimit = (n: number) => n.toLocaleString("en-IN");

type NumberRule = {
  label: string;
  min: number;
  max: number;
  required?: boolean;
  whole?: boolean;
  prefix?: string; // "₹" for money
};

// min 0.0001 is the api's way of saying "above zero"
const minMessage = ({ label, min }: NumberRule, value: number) =>
  min === 0.0001
    ? value === 0
      ? `${label} must be greater than 0`
      : `${label} must be at least 0.0001`
    : `${label} must be at least ${formatLimit(min)}`;

const checkNumber = (
  rule: NumberRule,
  v: string | undefined,
  ctx: z.RefinementCtx,
  path: (string | number)[] = [],
) => {
  const fail = (message: string) =>
    ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });

  if (!v) {
    if (rule.required) fail("Required");
    return;
  }
  if (rule.whole ? !WHOLE_PATTERN.test(v) : !NUMBER_PATTERN.test(v)) {
    fail(rule.whole ? "Enter a whole number" : "Enter a valid number");
    return;
  }

  const value = Number(v);
  if (value < rule.min) fail(minMessage(rule, value));
  else if (value > rule.max)
    fail(
      `${rule.label} can't be more than ${rule.prefix ?? ""}${formatLimit(rule.max)}`,
    );
};

const numberField = (rule: NumberRule) =>
  z
    .string()
    .optional()
    .superRefine((v, ctx) => checkNumber(rule, v, ctx));

const moneyField = (label: string) =>
  numberField({ label, ...OPERATION_LIMITS.money, prefix: "₹" });

// { value, unit } pair; `required` means the api needs the whole object
const quantity = (label: string, required = false) =>
  z
    .object({ value: z.string().optional(), unit: z.string().optional() })
    .superRefine((q, ctx) => {
      checkNumber(
        { label, ...OPERATION_LIMITS.quantity, required },
        q.value,
        ctx,
        ["value"],
      );
      if ((required || q.value) && !q.unit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["unit"],
          message: "Select unit",
        });
      }
    });

const textField = (label: string, max: number, required = false) => {
  const base = z
    .string()
    .trim()
    .max(max, `${label} can't be more than ${formatLimit(max)} characters`);
  return required ? base.min(1, "Required") : base.optional();
};

const todayString = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

/* ============================== SCHEMAS ============================== */

const baseShape = {
  operationDate: z
    .string({ required_error: "Select the date" })
    .min(1, "Select the date")
    .refine((v) => !v || v <= todayString(), "Date can't be in the future"),
  coverage: quantity("Area covered", true),
  labourHours: numberField({
    label: "Labour hours",
    ...OPERATION_LIMITS.labourHours,
  }),
  numberOfLabourers: numberField({
    label: "Labourers",
    ...OPERATION_LIMITS.labourers,
    whole: true,
  }),
  equipmentUsed: z
    .array(z.string())
    .max(
      OPERATION_LIMITS.equipmentItems,
      `You can add up to ${OPERATION_LIMITS.equipmentItems} equipment`,
    )
    .optional(),
  equipmentHours: z
    .array(
      z.object({
        equipment: textField(
          "Equipment",
          OPERATION_LIMITS.equipmentName,
          true,
        ),
        hours: numberField({
          label: "Hours",
          ...OPERATION_LIMITS.equipmentHours,
          required: true,
        }),
      }),
    )
    .max(
      OPERATION_LIMITS.equipmentItems,
      `You can add up to ${OPERATION_LIMITS.equipmentItems} equipment rows`,
    )
    .optional(),
  cost: moneyField("Total cost"),
  notes: textField("Notes", OPERATION_LIMITS.notes),
};

export const operationSchemas = {
  spray: z.object({
    ...baseShape,
    productUsed: textField("Product used", OPERATION_LIMITS.text, true),
    targetPestDisease: textField(
      "Target pest / disease",
      OPERATION_LIMITS.text,
      true,
    ),
    doseApplied: quantity("Dose applied", true),
    totalMixtureVolume: quantity("Total mixture volume"),
    actualProductQuantity: quantity("Product quantity used"),
  }),
  fertigation: z.object({
    ...baseShape,
    fertilizerType: textField("Fertilizer type", OPERATION_LIMITS.text, true),
    quantityApplied: quantity("Quantity applied", true),
    irrigationVolumeApplied: quantity("Irrigation volume", true),
  }),
  pruning: z.object({
    ...baseShape,
    pruningType: z
      .string({ required_error: "Select pruning type" })
      .min(1, "Select pruning type")
      .refine(
        (v) => PRUNING_TYPES.some((type) => type.value === v),
        "Select a valid pruning type",
      ),
  }),
  harvest: z.object({
    ...baseShape,
    quantityHarvested: quantity("Quantity harvested", true),
    costOfHarvesting: moneyField("Cost of harvesting"),
    saleLots: z
      .array(
        z
          .object({
            quantity: quantity("Quantity", true),
            isSold: z.string(),
            priceReceivedPerUnit: quantity("Price per unit"),
            buyerOrMandi: textField("Buyer / mandi", OPERATION_LIMITS.text),
          })
          .superRefine((lot, ctx) => {
            // a lot marked as sold needs the price it sold for
            if (lot.isSold === "yes" && !lot.priceReceivedPerUnit.value) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["priceReceivedPerUnit", "value"],
                message: "Required",
              });
            }
          }),
      )
      .max(
        OPERATION_LIMITS.saleLots,
        `You can add up to ${OPERATION_LIMITS.saleLots} sale lots`,
      )
      .optional(),
  }),
} satisfies Record<AdvisoryKind, z.ZodTypeAny>;

export type OperationFormValues = z.infer<
  (typeof operationSchemas)[AdvisoryKind]
> &
  Record<string, any>;

/* ============================== DEFAULTS ============================== */

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

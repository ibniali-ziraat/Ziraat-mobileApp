import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Trash2 } from "lucide-react-native";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import {
  PRUNING_TYPES,
  SOLD_OPTIONS,
  UNITS,
} from "../../constants/advisoryOptions";
import {
  emptySaleLot,
  OPERATION_LIMITS,
} from "../../schemas/operation.schemas";
import type { AdvisoryKind } from "../../services/farmeradvisories.service";
import AddRowButton from "./AddRowButton";
import AdvisorySection from "../AdvisorySection";
import { getFieldError } from "./getFieldError";
import QuantityInput from "./QuantityInput";

/* ============================== SPRAY ============================== */

function SprayFields() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <AdvisorySection title="Spray details" description="What was sprayed and how much">
      <FormTextInput
        name="productUsed"
        label="Product used"
        placeholder="e.g. Mancozeb 75 WP"
        required
        error={getFieldError(errors, "productUsed")}
      />
      <FormTextInput
        name="targetPestDisease"
        label="Target pest / disease"
        placeholder="e.g. Apple scab"
        required
        error={getFieldError(errors, "targetPestDisease")}
      />
      <QuantityInput
        name="doseApplied"
        label="Dose applied"
        units={UNITS.dose}
        required
      />
      <QuantityInput
        name="totalMixtureVolume"
        label="Total mixture volume"
        units={UNITS.volume}
      />
      <QuantityInput
        name="actualProductQuantity"
        label="Product quantity used"
        units={UNITS.productQuantity}
      />
    </AdvisorySection>
  );
}

/* ============================== FERTIGATION ============================== */

function FertigationFields() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <AdvisorySection
      title="Fertigation details"
      description="Fertilizer and irrigation applied"
    >
      <FormTextInput
        name="fertilizerType"
        label="Fertilizer type"
        placeholder="e.g. NPK 19:19:19"
        required
        error={getFieldError(errors, "fertilizerType")}
      />
      <QuantityInput
        name="quantityApplied"
        label="Quantity applied"
        units={UNITS.fertilizerQuantity}
        required
      />
      <QuantityInput
        name="irrigationVolumeApplied"
        label="Irrigation volume"
        units={UNITS.volume}
        required
      />
    </AdvisorySection>
  );
}

/* ============================== PRUNING ============================== */

function PruningFields() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <AdvisorySection title="Pruning details">
      <SingleSelectInput
        name="pruningType"
        label="Pruning type"
        placeholder="Select pruning type"
        modalLabel="Pruning type"
        options={PRUNING_TYPES}
        error={getFieldError(errors, "pruningType")}
      />
    </AdvisorySection>
  );
}

/* ============================== HARVEST ============================== */

function HarvestFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const saleLots = useFieldArray({ control, name: "saleLots" });
  const lots = useWatch({ control, name: "saleLots" });

  return (
    <>
      <AdvisorySection title="Harvest details">
        <QuantityInput
          name="quantityHarvested"
          label="Quantity harvested"
          units={UNITS.harvestQuantity}
          required
        />
        <FormTextInput
          name="costOfHarvesting"
          label="Cost of harvesting (₹)"
          type="number"
          placeholder="0"
          error={getFieldError(errors, "costOfHarvesting")}
        />
      </AdvisorySection>

      <AdvisorySection title="Sale lots" description="Add one entry per sale">
        {saleLots.fields.map((field, index) => (
          <View
            key={field.id}
            style={{
              paddingTop: index === 0 ? 0 : 14,
              marginTop: index === 0 ? 0 : 6,
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: cardTokens.hairline,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={[typography.Poppins_s_semibold, { color: cardTokens.inkPrimary }]}
              >
                Lot {index + 1}
              </Text>
              <Pressable onPress={() => saleLots.remove(index)} hitSlop={8}>
                <Trash2 size={18} color={colors.error} />
              </Pressable>
            </View>

            <QuantityInput
              name={`saleLots.${index}.quantity`}
              label="Quantity"
              units={UNITS.harvestQuantity}
              required
            />
            <SingleSelectInput
              name={`saleLots.${index}.isSold`}
              label="Sale status"
              modalLabel="Sale status"
              options={SOLD_OPTIONS}
              optional
            />
            <QuantityInput
              name={`saleLots.${index}.priceReceivedPerUnit`}
              label="Price per unit (₹)"
              units={UNITS.pricePer}
              required={lots?.[index]?.isSold === "yes"}
            />
            <FormTextInput
              name={`saleLots.${index}.buyerOrMandi`}
              label="Buyer / mandi"
              placeholder="e.g. Sopore Mandi"
              error={getFieldError(errors, `saleLots.${index}.buyerOrMandi`)}
            />
          </View>
        ))}

        {saleLots.fields.length < OPERATION_LIMITS.saleLots && (
          <AddRowButton
            label="Add sale lot"
            onPress={() => saleLots.append(emptySaleLot())}
          />
        )}
      </AdvisorySection>
    </>
  );
}

/* ============================== PICKER ============================== */

const FIELDS_BY_KIND: Record<AdvisoryKind, () => React.JSX.Element> = {
  spray: SprayFields,
  fertigation: FertigationFields,
  pruning: PruningFields,
  harvest: HarvestFields,
};

// renders the section that matches advisory.kind
export default function KindFields({ kind }: { kind: AdvisoryKind }) {
  const Fields = FIELDS_BY_KIND[kind];
  return <Fields />;
}

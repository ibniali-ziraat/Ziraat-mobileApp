import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";

import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { generateEstablishmentYears } from "@/src/utils/generateYears";
import OrchardSizeInput from "./OrchardSizeInput";

export default function BasicInfo({
  control,
  errors,
  data,
  orchardSize,
  areaLabel,
  areaUnit,
}) {
  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);
  const { setValue } = useFormContext();

  /* ------------------ Hydration Guards ------------------ */
  const unitHydrated = useRef(false);
  const modeHydrated = useRef(false);

  /* ------------------ Location ------------------ */
  const { districts, tehsils, setSelectedDistrict } =
    useCascadingLocation("Jammu and Kashmir");

  useEffect(() => {
    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data?.district]);

  useEffect(() => {
    if (!data?.tehsil || !tehsils.length) return;

    if (tehsils.includes(data.tehsil)) {
      setValue("tehsil", data.tehsil, { shouldValidate: true });
    }
  }, [tehsils, data?.tehsil]);

  /* ------------------ Watchers ------------------ */
  const orchardUnit = useWatch({
    control,
    name: "orchardSize.unit",
  });

  const orchardMode = useWatch({
    control,
    name: "orchardSize.mode",
    defaultValue: "manual",
  });

  /* ------------------ SAFE RESET LOGIC ------------------ */

  useEffect(() => {
    if (!orchardUnit) return;

    if (!unitHydrated.current) {
      unitHydrated.current = true;
      return;
    }

    setValue("orchardSize.value", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [orchardUnit]);

  useEffect(() => {
    if (!orchardMode) return;

    if (!modeHydrated.current) {
      modeHydrated.current = true;
      return;
    }

    setValue("orchardSize.unit", undefined);
    setValue("orchardSize.value", "");
  }, [orchardMode]);

  /* ------------------ UI ------------------ */
  return (
    <View className="bg-light w-full">
      {/* Orchard Name */}
      <FormInput
        control={control}
        name="orchardName"
        label="Orchard Name"
        error={errors?.orchardName?.message}
      />

      {/* ---------------- MANUAL MODE ---------------- */}
      {orchardMode === "manual" && (
        <View style={{ marginVertical: 10 }}>
          <SingleSelectInput
            control={control}
            name="orchardSize.unit"
            label="Orchard Size Unit"
            modalLabel="Select Unit"
            options={[
              { label: "Marla", value: "marla" },
              { label: "Kanal", value: "kanal" },
            ]}
            error={errors?.orchardSize?.unit?.message}
          />

          <FormInput
            control={control}
            name="orchardSize.value"
            label={`Orchard Size${
              orchardUnit
                ? ` (${orchardUnit === "marla" ? "Marla" : "Kanal"})`
                : ""
            }`}
            type="number"
            disabled={!orchardUnit}
            placeholder={
              !orchardUnit
                ? "Select unit first"
                : `Enter size in ${orchardUnit === "marla" ? "Marla" : "Kanal"}`
            }
            error={errors?.orchardSize?.value?.message}
          />
        </View>
      )}

      {/* ---------------- MEASURE MODE ---------------- */}
      {orchardMode === "measure" && (
        <OrchardSizeInput
          control={control}
          errors={errors}
          measuredValue={orchardSize || data?.orchardSize}
          areaLabel={areaLabel}
          areaUnit={areaUnit}
        />
      )}

      {/* Establishment Year */}
      <SingleSelectInput
        searchable
        control={control}
        name="establishmentYear"
        label="Establishment Year"
        modalLabel="Select Year"
        options={ESTABLISHMENT_YEAR}
        error={errors?.establishmentYear?.message}
      />

      {/* Plantation Pattern */}
      <SingleSelectInput
        control={control}
        name="plantationPattern"
        label="Plantation Pattern"
        modalLabel="Select Pattern"
        options={[
          { label: "Traditional", value: "Traditional" },
          { label: "High Density", value: "High Density" },
          { label: "Ultra High Density", value: "Ultra High Density" },
          { label: "Other", value: "Other" },
        ]}
        error={errors?.plantationPattern?.message}
      />

      {/* Ownership Type */}
      <SingleSelectInput
        control={control}
        name="ownershipType"
        label="Ownership Type"
        modalLabel="Ownership Type"
        options={[
          { label: "Self-Owned", value: "Self-Owned" },
          { label: "Joint", value: "Joint" },
          { label: "Leased", value: "Leased" },
          { label: "Rented", value: "Rented" },
          { label: "Other", value: "Other" },
        ]}
        error={errors?.ownershipType?.message}
      />

      {/* District */}
      <SingleSelectInput
        searchable
        control={control}
        name="district"
        label="District"
        modalLabel="District"
        options={districts.map((d) => ({ label: d, value: d }))}
        onValueChange={setSelectedDistrict}
        disabled={!districts.length}
        error={errors?.district?.message}
      />

      {/* Tehsil */}
      <SingleSelectInput
        searchable
        control={control}
        name="tehsil"
        label="Tehsil"
        modalLabel="Tehsil"
        options={tehsils.map((t) => ({ label: t, value: t }))}
        disabled={!tehsils.length}
        error={errors?.tehsil?.message}
      />

      {/* PIN Code */}
      <FormInput
        control={control}
        name="pincode"
        label="PIN Code"
        type="phone"
        error={errors?.pincode?.message}
      />
    </View>
  );
}

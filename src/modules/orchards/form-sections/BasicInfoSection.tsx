import { useEffect } from "react";
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
  setValue,
  orchardSize,
  areaLabel,
  areaUnit,
}) {
  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);

  const { districts, tehsils, setSelectedDistrict } =
    useCascadingLocation("Jammu and Kashmir");

  useEffect(() => {
    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data?.district]);

  return (
    <View className="bg-light w-full">
      <FormInput
        control={control}
        name="orchardName"
        label="Orchard Name"
        errors={errors?.orchardName?.message}
      />

      <OrchardSizeInput
        control={control}
        errors={errors}
        measuredValue={orchardSize || data?.orchardSize}
        areaLabel={areaLabel}
        areaUnit={areaUnit}
      />

      <SingleSelectInput
        searchable
        control={control}
        name="establishmentYear"
        label="Establishment Year"
        modalLabel="Select Year"
        options={ESTABLISHMENT_YEAR}
        error={errors?.establishmentYear}
      />

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
        error={errors?.plantationPattern}
      />

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
        error={errors?.ownershipType}
      />

      <SingleSelectInput
        searchable
        control={control}
        name="district"
        label="District"
        modalLabel="District"
        options={districts.map((d) => ({ label: d, value: d }))}
        onValueChange={setSelectedDistrict}
        disabled={!districts.length}
        error={errors?.district}
      />

      <SingleSelectInput
        searchable
        control={control}
        name="tehsil"
        label="Tehsil"
        modalLabel="Tehsil"
        options={tehsils.map((t) => ({ label: t, value: t }))}
        disabled={!tehsils.length}
        error={errors?.tehsil}
      />

      <FormInput
        control={control}
        name="pincode"
        label="PIN Code"
        type="phone"
        errors={errors?.pincode?.message}
      />
    </View>
  );
}

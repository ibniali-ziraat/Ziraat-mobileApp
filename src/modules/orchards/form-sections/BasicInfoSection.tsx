import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { generateEstablishmentYears } from "@/src/utils/generateYears";
import { useEffect } from "react";
import { View } from "react-native";

export default function BasicInfo({ control, errors, data }) {
  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);
  const { states, districts, tehsils, setSelectedState, setSelectedDistrict } =
    useCascadingLocation();

  useEffect(() => {
    if (data?.state) {
      setSelectedState(data.state);
    }

    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data]);
  const PLANTATION_PATTERN_OPTIONS = [
    "Traditional",
    "High Density",
    "Ultra High Density",
    "Other",
  ].map((x) => ({
    label: x,
    value: x,
  }));

  const OWNERSHIP_TYPE_OPTIONS = [
    "Self-Owned",
    "Joint",
    "Leased",
    "Rented",
    "Other",
  ].map((x) => ({
    label: x,
    value: x,
  }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        <FormInput
          control={control}
          name="orchardName"
          label="Orchard Name"
          errors={errors?.orchardName?.message}
        />

        <FormInput
          control={control}
          name="orchardSize"
          label="Orchard Size (Marlas)"
          type="phone"
          errors={errors?.orchardSize?.message}
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
          options={PLANTATION_PATTERN_OPTIONS}
          error={errors?.plantationPattern}
        />

        <SingleSelectInput
          control={control}
          name="ownershipType"
          label="Ownership Type"
          modalLabel="Ownership Type"
          options={OWNERSHIP_TYPE_OPTIONS}
          error={errors?.ownershipType}
        />
        <SingleSelectInput
          control={control}
          modalLabel="State"
          name="state"
          label="State"
          options={states.map((s) => ({ label: s, value: s }))}
          onValueChange={(value) => {
            setSelectedState(value as string);
            setSelectedDistrict(null);
          }}
          error={errors.state}
        />
        <SingleSelectInput
          control={control}
          modalLabel="District"
          name="district"
          label="District"
          searchable
          options={districts.map((d) => ({ label: d, value: d }))}
          onValueChange={(value) => setSelectedDistrict(value as string)}
          disabled={!districts.length}
          error={errors.district}
        />

        {/* Tehsil */}
        <SingleSelectInput
          control={control}
          modalLabel="Tehsil"
          name="tehsil"
          label="Tehsil"
          searchable
          options={tehsils.map((t) => ({ label: t, value: t }))}
          disabled={!tehsils.length}
          error={errors.tehsil}
        />
        {/* 
        <FormInput
          control={control}
          name="district"
          label="District"
          errors={errors?.district?.message}
        />

        <FormInput
          control={control}
          name="tehsil"
          label="Tehsil"
          errors={errors?.tehsil?.message}
        /> */}

        {/* <FormInput
          control={control}
          name="zone"
          label="Zone"
          errors={errors?.zone?.message}
        /> */}

        <FormInput
          control={control}
          name="pincode"
          label="PIN Code"
          type="phone"
          errors={errors?.pincode?.message}
        />

        {/* <FormInput
          control={control}
          name="latitude"
          label="Latitude"
          type="phone"
          errors={errors.latitude?.message}
        />

        <FormInput
          control={control}
          name="longitude"
          label="Longitude"
          type="phone"
          errors={errors?.longitude?.message}
        /> */}
      </View>
    </View>
  );
}

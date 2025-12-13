import React, { useState } from "react";
import { View, Text } from "react-native";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { BusinessSectionProps } from "@/src/types/BusinessSection.types";
import locations from "@/src/Data/locations.json";
import { colors } from "@/src/constants/colors";

export default function BusinessSection({
  control,
  errors,
}: BusinessSectionProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const states = Object.keys(locations);
  const districts = selectedState ? Object.keys(locations[selectedState]) : [];
  const tehsils =
    selectedState && selectedDistrict
      ? locations[selectedState][selectedDistrict]
      : [];

  return (
    <View className="bg-light" style={{ padding: 16 }}>
      {/* ---------------- Business Info Section ---------------- */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 12,
          color: colors.dark,
        }}
      >
        Business Info
      </Text>

      <FormInput
        control={control}
        name="shopName"
        label="Shop / Business Name"
        error={errors?.shopName?.message}
      />
      <FormInput
        control={control}
        name="ownerName"
        label="Owner Name"
        error={errors?.ownerName?.message}
      />
      <FormInput
        control={control}
        name="email"
        label="Email (optional)"
        type="email"
        optional
        error={errors?.email?.message}
      />
      <FormInput
        control={control}
        name="contactNumberPrimary"
        label="Business Contact Number"
        type="phone"
        error={errors?.contactNumberPrimary?.message}
      />
      <FormInput
        control={control}
        name="contactNumberAlternate"
        label="Alternate Contact (optional)"
        type="phone"
        optional
        error={errors?.contactNumberAlternate?.message}
      />

      {/* ---------------- Business Address Section ---------------- */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginVertical: 12,
          color: colors.dark,
        }}
      >
        Business Address
      </Text>

      {/* Cascading dropdowns */}
      <SingleSelectInput
        control={control}
        name="state"
        label="State"
        modalLabel="State"
        options={states.map((s) => ({ label: s, value: s }))}
        onValueChange={(value) => {
          setSelectedState(value as string);
          setSelectedDistrict(null);
        }}
        error={errors?.state}
      />

      <SingleSelectInput
        control={control}
        name="district"
        label="District"
        searchable
        options={districts.map((d) => ({ label: d, value: d }))}
        onValueChange={(value) => setSelectedDistrict(value as string)}
        error={errors?.district}
        modalLabel="District"
        optional={false}
        disabled={!selectedState}
      />

      <SingleSelectInput
        control={control}
        name="tehsil"
        label="Tehsil"
        searchable
        options={tehsils.map((t) => ({ label: t, value: t }))}
        error={errors?.tehsil}
        optional={false}
        modalLabel="Tehsil"
        disabled={!selectedDistrict}
      />
      <FormInput
        control={control}
        name="village"
        label="Village"
        error={errors?.village?.message}
      />
      <FormInput
        control={control}
        name="pincode"
        label="Pincode"
        type="phone"
        error={errors?.pincode}
      />
    </View>
  );
}

import React from "react";
import { View, Text } from "react-native";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { BusinessSectionProps } from "@/src/types/BusinessSection.types";
import { colors } from "@/src/constants/colors";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";

export default function BusinessSection({
  control,
  errors,
}: BusinessSectionProps) {
  const { states, districts, tehsils, setSelectedState, setSelectedDistrict } =
    useCascadingLocation();

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

      {/* State */}
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

      {/* District */}
      <SingleSelectInput
        control={control}
        name="district"
        label="District"
        searchable
        modalLabel="District"
        options={districts.map((d) => ({ label: d, value: d }))}
        onValueChange={(value) => setSelectedDistrict(value as string)}
        disabled={!districts.length}
        error={errors?.district}
      />

      {/* Tehsil */}
      <SingleSelectInput
        control={control}
        name="tehsil"
        label="Tehsil"
        searchable
        modalLabel="Tehsil"
        options={tehsils.map((t) => ({ label: t, value: t }))}
        disabled={!tehsils.length}
        error={errors?.tehsil}
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
        error={errors?.pincode?.message}
      />
    </View>
  );
}

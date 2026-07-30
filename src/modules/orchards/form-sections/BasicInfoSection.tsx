import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { generateEstablishmentYears } from "@/src/utils/generateYears";
import { OWNERSHIP_TYPE_OPTIONS } from "../constants/orchardOptions";

export default function BasicInfo({ errors, data }) {
  console.log(data, "data...");

  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);

  const { control, setValue } = useFormContext();
  if (!control) return null;

  const { districts, tehsils, setSelectedDistrict } =
    useCascadingLocation("Jammu and Kashmir");

  useEffect(() => {
    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data?.district]);

  const orchardMode = useWatch({
    control,
    name: "orchardSize.mode",
    defaultValue: "manual",
  });

  const [marlasCapWarning, setMarlasCapWarning] = useState(false);

  const toggleMode = () => {
    setValue(
      "orchardSize.mode",
      orchardMode === "measure" ? "manual" : "measure",
    );
  };

  return (
    <View style={{ padding: 0, gap: 0 }}>
      <FormTextInput
        name="orchardName"
        label="Orchard Name"
        type="alphanumeric"
        placeholder="Enter your orchard name"
        required
        error={errors?.orchardName}
      />
      {/* 
      <View
        style={[
          {
            backgroundColor: "#fff",
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 18,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          },
          shadows.review_card,
        ]}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#222",
              marginBottom: 2,
            }}
          >
            Orchard Size
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#777",
            }}
          >
            Choose measurement method
          </Text>
        </View>

        <Pressable
          onPress={toggleMode}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor:
              orchardMode === "measure" ? colors.primary + "15" : "#f2f2f2",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          {orchardMode === "measure" ? (
            <ToggleRight size={28} color={colors.primary} />
          ) : (
            <ToggleLeft size={28} color="#888" />
          )}

          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: orchardMode === "measure" ? colors.primary : "#666",
            }}
          >
            {orchardMode === "measure" ? "Measure" : "Manual"}
          </Text>
        </Pressable>
      </View> */}
      {/* 
      {orchardMode === "measure" && (
        <>
          <MeasuredOrchardSection />
        </>
      )} */}

      {orchardMode === "manual" && (
        <View>
          <FormTextInput
            name="kanals"
            label="Size in Kanals"
            type="pincode"
            placeholder="Enter size in Kanals"
            error={errors?.kanals}
          />

          <FormTextInput
            name="marlas"
            label="Size in Marlas"
            type="marlas"
            placeholder="Enter size in Marlas (max 19)"
            error={errors?.marlas}
            warning={
              marlasCapWarning
                ? "20 Marlas = 1 Kanal. Add to Kanals instead."
                : undefined
            }
            onChangeText={(rawText) => {
              const digits = rawText.replace(/\D/g, "");
              setMarlasCapWarning(Number(digits) > 19);
            }}
          />
        </View>
      )}

      <SingleSelectInput
        searchable
        name="establishmentYear"
        label="Establishment Year"
        modalLabel="Select Year"
        options={ESTABLISHMENT_YEAR}
        error={errors?.establishmentYear?.message}
      />

      <SingleSelectInput
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
        name="ownershipType"
        label="Ownership Type"
        modalLabel="Ownership Type"
        options={OWNERSHIP_TYPE_OPTIONS}
        error={errors?.ownershipType?.message}
      />

      {/* District */}
      <SingleSelectInput
        searchable
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
        name="tehsil"
        label="Tehsil"
        modalLabel="Tehsil"
        options={tehsils.map((t) => ({ label: t, value: t }))}
        disabled={!tehsils.length}
        error={errors?.tehsil?.message}
      />

      {/* PIN */}
      <FormTextInput
        name="pincode"
        label="PIN Code"
        type="pincode"
        required
        error={errors?.pincode}
      />
    </View>
  );
}

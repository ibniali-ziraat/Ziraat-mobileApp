import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ToggleLeft, ToggleRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts/font";
import { shadows } from "@/src/constants/shadows";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { generateEstablishmentYears } from "@/src/utils/generateYears";
import { OWNERSHIP_TYPE_OPTIONS } from "../constants/orchardOptions";
import { setMeasuredArea, useMeasuredArea } from "../utils/measuredArea";
import MeasuredOrchardSection from "./MeasuredOrchardSection";

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

  // A tap/walk measurement fills the same Kanals / Marlas inputs as manual
  // entry, then the form is saved the normal way.
  const measured = useMeasuredArea();
  useEffect(() => {
    if (!measured) return;

    setValue("kanals", measured.kanals > 0 ? String(measured.kanals) : "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("marlas", measured.marlas > 0 ? String(measured.marlas) : "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("orchardSize.mode", "manual");
    setMeasuredArea(null);
  }, [measured, setValue]);

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
              fontSize: 17,
              fontWeight: "600",
              color: "#222",
              marginBottom: 2,
            }}
          >
            Orchard Size
          </Text>

          <Text
            style={{
              fontSize: 14,
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
              fontSize: 16,
              color: orchardMode === "measure" ? colors.primary : "#666",
            }}
          >
            {orchardMode === "measure" ? "Measure" : "Manual"}
          </Text>
        </Pressable>
      </View>

      {orchardMode === "measure" && (
        <>
          <MeasuredOrchardSection />
        </>
      )}

      {orchardMode === "manual" && (
        <View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.dark,
                fontFamily: fonts.poppins.medium,
              }}
            >
              Orchard Size
            </Text>
            <Text style={{ color: colors.error, fontFamily: fonts.poppins.medium }}>
              {" "}
              *
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: -12 }}>
            <View style={{ flex: 1 }}>
              <FormTextInput
                name="kanals"
                label="Kanals"
                type="pincode"
                placeholder="e.g. 4"
              />
            </View>

            <View style={{ flex: 1 }}>
              <FormTextInput
                name="marlas"
                label="Marlas"
                type="marlas"
                placeholder="Max 19"
                error={errors?.marlas}
                warning={
                  marlasCapWarning ? "20 Marlas = 1 Kanal" : undefined
                }
                onChangeText={(rawText) => {
                  const digits = rawText.replace(/\D/g, "");
                  setMarlasCapWarning(Number(digits) > 19);
                }}
              />
            </View>
          </View>

          {errors?.kanals?.message && (
            <Text
              numberOfLines={1}
              style={{ color: colors.error, marginBottom: 18 }}
            >
              {errors.kanals.message}
            </Text>
          )}
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

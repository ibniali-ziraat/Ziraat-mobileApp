import { useEffect, useRef, useState } from "react";
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
import { reverseGeocodeDetails } from "@/src/services/locationService";
import locations from "@/src/data/locations.json";
import { OWNERSHIP_TYPE_OPTIONS } from "../constants/orchardOptions";
import OrchardLocationPicker from "../components/OrchardLocationPicker";
import { setMeasuredArea, useMeasuredArea } from "../utils/measuredArea";
import MeasuredOrchardSection from "./MeasuredOrchardSection";

type BasicInfoProps = {
  errors: any;
  data: any;
  locationLoading?: boolean;
  locationError?: string | null;
  onRetryLocation?: () => void;
};

const normalizeLocationName = (value: string) =>
  value
    .toLowerCase()
    .replace(/\bdistrict\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const findLocationMatch = (value: string | null, options: string[]) => {
  if (!value) return null;
  const normalized = normalizeLocationName(value);
  return (
    options.find((option) => normalizeLocationName(option) === normalized) ??
    null
  );
};

export default function BasicInfo({
  errors,
  data,
  locationLoading,
  locationError,
  onRetryLocation,
}: BasicInfoProps) {
  console.log(data, "data...");

  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);

  const { control, setValue, getFieldState, getValues } = useFormContext();

  const { districts, tehsils, setSelectedDistrict } =
    useCascadingLocation("Jammu and Kashmir");

  useEffect(() => {
    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data?.district, setSelectedDistrict]);

  const orchardMode = useWatch({
    control,
    name: "orchardSize.mode",
    defaultValue: "manual",
  });

  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });
  const numericLatitude = Number(latitude);
  const numericLongitude = Number(longitude);
  const replaceAddressOnNextLookup = useRef(false);
  const hasValidCoordinate =
    Number.isFinite(numericLatitude) &&
    Number.isFinite(numericLongitude) &&
    numericLatitude >= -90 &&
    numericLatitude <= 90 &&
    numericLongitude >= -180 &&
    numericLongitude <= 180 &&
    latitude !== "" &&
    longitude !== "";

  useEffect(() => {
    if (!hasValidCoordinate) return;
    let cancelled = false;

    const populateLocationFields = async () => {
      const replaceExistingAddress = replaceAddressOnNextLookup.current;
      replaceAddressOnNextLookup.current = false;
      const details = await reverseGeocodeDetails(
        numericLatitude,
        numericLongitude,
      );
      if (!details || cancelled) return;

      const matchedDistrict = findLocationMatch(details.district, districts);
      if (
        matchedDistrict &&
        (replaceExistingAddress ||
          (!getValues("district") && !getFieldState("district").isDirty))
      ) {
        setSelectedDistrict(matchedDistrict);
        setValue("district", matchedDistrict, { shouldValidate: true });
      }

      const districtForTehsil = matchedDistrict || getValues("district");
      const districtTehsils =
        locations["Jammu and Kashmir"]?.[
          districtForTehsil as keyof (typeof locations)["Jammu and Kashmir"]
        ] ?? [];
      const matchedTehsil = findLocationMatch(details.tehsil, districtTehsils);

      if (
        matchedTehsil &&
        (replaceExistingAddress ||
          (!getValues("tehsil") && !getFieldState("tehsil").isDirty))
      ) {
        setValue("tehsil", matchedTehsil, { shouldValidate: true });
      }

      if (
        details.postcode &&
        /^\d{6}$/.test(details.postcode) &&
        (replaceExistingAddress ||
          (!getValues("pincode") && !getFieldState("pincode").isDirty))
      ) {
        setValue("pincode", details.postcode, { shouldValidate: true });
      }
    };

    populateLocationFields();
    return () => {
      cancelled = true;
    };
  }, [
    districts,
    getFieldState,
    getValues,
    hasValidCoordinate,
    numericLatitude,
    numericLongitude,
    setSelectedDistrict,
    setValue,
  ]);

  const selectCoordinate = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    replaceAddressOnNextLookup.current = true;
    setValue("latitude", coordinate.latitude.toFixed(6), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("longitude", coordinate.longitude.toFixed(6), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

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
                fontSize: 14,
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

      <OrchardLocationPicker
        coordinate={
          hasValidCoordinate
            ? {
                latitude: numericLatitude,
                longitude: numericLongitude,
              }
            : null
        }
        loading={locationLoading}
        error={locationError}
        onSelect={selectCoordinate}
        onRetry={onRetryLocation}
      />

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <FormTextInput
            name="latitude"
            label="Latitude"
            type="number"
            disabled
            required
            error={errors?.latitude}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormTextInput
            name="longitude"
            label="Longitude"
            type="number"
            disabled
            required
            error={errors?.longitude}
          />
        </View>
      </View>

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

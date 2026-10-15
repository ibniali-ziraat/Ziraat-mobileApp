import { View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import CsText from "@/src/components/shared/CsText";
import {
  irrigationOptions,
  soilTypeOptions,
  todayISO,
  waterAvailabilityOptions,
  waterSourceOptions,
} from "@/src/modules/orchards/schemas/SoilWaterProfileSchema";

export default function SoilAndWaterProfile({ data, control, errors }) {
  console.log(errors, "errors in soilandwatertest");
  console.log(data, "data in soilandwatertest");

  const SOIL_HEALTH_OPTIONS = [
    "Strongly Acidic",
    "Moderately Acidic",
    "Slightly Acidic",
    "Neutral",
    "Slightly Alkaline",
    "Moderately Alkaline",
    "Strongly Alkaline",
    "Saline",
    "Sodic",
    "Not Known",
  ].map((x) => ({
    label: x,
    value: x,
  }));

  return (
    // No flex-1 here — this sits inside ScreenLayout's scrollable content
    // (already flexGrow:1 + its own flex:1 wrapper), so an extra flex:1 on
    // this section collapsed it to zero height on first render, leaving
    // FormActions rendered in its place until a re-layout (e.g. a
    // validation error on Save) fixed the measurement.
    <View className="w-full p-4">
      <View className="bg-white ">
        <SingleSelectInput
          control={control}
          name="soilType"
          label="Soil Type"
          modalLabel="Soil Type"
          options={soilTypeOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.soilType?.message}
        />

        <MultiSelectInput
          name="soilHealthStatus"
          control={control}
          label="Soil Health (optional)"
          placeholder="Select Soil Health"
          options={SOIL_HEALTH_OPTIONS}
          optional
          singleSelection
          error={errors?.soilHealthStatus}
        />

        <FormDateInput
          control={control}
          name="lastSoilTestDate"
          label="Latest Soil Test Date (optional)"
          placeholder="Select Date"
          maxDate={todayISO()}
          error={errors?.lastSoilTestDate?.message}
          optional
        />
      </View>

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <CsText className="text-lg font-semibold mb-3 text-gray-800">
          Water Information
        </CsText>

        <SingleSelectInput
          name="waterSource"
          label="Water Source"
          modalLabel="Water Source"
          options={waterSourceOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.waterSource?.message}
        />

        <SingleSelectInput
          name="irrigationMethod"
          label="Irrigation Method"
          modalLabel="Irrigation Method"
          options={irrigationOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.irrigationMethod?.message}
        />

        <SingleSelectInput
          control={control}
          name="waterAvailability"
          label="Water Availability"
          modalLabel="Water Availability"
          options={waterAvailabilityOptions.map((v) => ({
            label: v,
            value: v,
          }))}
          error={errors?.waterAvailability?.message}
        />
      </View>

      {/* {soilTestRecordsDone === true && (
          <>
            <Pressable
              onPress={() => setOpen((prev) => !prev)}
              className="flex-row justify-between items-center mt-3 mb-1"
            >
              <CsText className="text-lg font-semibold text-gray-800">
                Soil Records
              </CsText>
              <CsText className="text-primary text-sm">
                {open ? "Hide ▲" : "Show ▼"}
              </CsText>
            </Pressable>

            {open && (
              <View className="mt-2">
                <FormTextInput
                  control={control}
                  name="soilPH"
                  label="Soil pH (0–14)"
                  type="pincode"
                  error={errors?.soilPH}
                />
                <FormTextInput
                  control={control}
                  name="soilNitrogen"
                  label="Nitrogen (N)"
                  type="pincode"
                  error={errors?.soilN}
                />
                <FormTextInput
                  control={control}
                  name="soilPhosphorus"
                  label="Phosphorus (P)"
                  type="pincode"
                  error={errors?.soilP}
                />
                <FormTextInput
                  control={control}
                  name="soilPotassium"
                  label="Potassium (K)"
                  type="pincode"
                  error={errors?.soilK}
                />
                <FormTextInput
                  control={control}
                  name="soilOrganicCarbon"
                  label="Organic Carbon (%)"
                  type="pincode"
                  error={errors?.soilOrganicCarbon}
                />
                <FormTextInput
                  control={control}
                  name="soilMicronutrients"
                  label="Micronutrients"
                  type="text"
                  error={errors?.soilMicronutrients}
                />
              </View>
            )}
          </>
        )} */}
    </View>
  );
}

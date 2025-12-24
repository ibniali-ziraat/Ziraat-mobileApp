import { useState } from "react";
import { useWatch } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import CsText from "@/src/components/shared/CsText";
import {
  irrigationOptions,
  soilTypeOptions,
  waterAvailabilityOptions,
  waterSourceOptions,
  yesNoOptions,
} from "@/src/modules/orchards/schemas/SoilWaterProfileSchema";

export default function SoilAndWaterProfile({ control, errors }) {
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

  const lastSoilTestDone = useWatch({
    control,
    name: "lastSoilTestDone",
    defaultValue: "No",
  });
  const soilTestRecordsDone = useWatch({
    control,
    name: "soilTestRecordsDone",
    defaultValue: "No",
  });
  const soilTestFileToggle = useWatch({
    control,
    name: "soilTestFileToggle",
    defaultValue: "No",
  });

  const [open, setOpen] = useState(true);

  return (
    <View className="flex-1 w-full p-4">
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
          name="soilHealth"
          control={control}
          label="Soil Health"
          options={SOIL_HEALTH_OPTIONS}
          error={errors?.soilHealth?.message}
        />

        {/* <SingleSelectInput
          control={control}
          name="lastSoilTestDone"
          label="Last Soil Test Done?"
          modalLabel="Soil Type"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.lastSoilTestDone?.message}
        /> */}

        {/* <RadioGroup
          control={control}
          name="lastSoilTestDone"
          label="Last Soil Test Done?"
          options={yesNoOptions}
          error={errors?.lastSoilTestDone?.message}
        /> */}

        {/* {lastSoilTestDone === "Yes" && ( */}
        <FormDateInput
          control={control}
          name="lastSoilTestDate"
          label="Latest Soil Test Date"
          error={errors?.lastSoilTestDate?.message}
        />
        {/* )} */}

        {/* <SingleSelectInput
          control={control}
          name="lastSoilTestDate"
          label="Last Soil Test Done?"
          modalLabel="Soil Type"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.lastSoilTestDate?.message}
        /> */}
      </View>

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <CsText className="text-lg font-semibold mb-3 text-gray-800">
          Water Information
        </CsText>

        <SingleSelectInput
          control={control}
          name="waterSource"
          label="Water Source"
          modalLabel="Water Source"
          options={waterSourceOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.waterSource?.message}
        />

        <SingleSelectInput
          control={control}
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

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <SingleSelectInput
          control={control}
          name="soilTestRecordsDone"
          label="Soil Test Records Available?"
          modalLabel="Soil Records Available"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.soilTestRecordsDone?.message}
        />

        {soilTestRecordsDone === "Yes" && (
          <>
            <TouchableOpacity
              onPress={() => setOpen((prev) => !prev)}
              className="flex-row justify-between items-center mt-3 mb-1"
            >
              <CsText className="text-lg font-semibold text-gray-800">
                Soil Records
              </CsText>
              <CsText className="text-primary text-sm">
                {open ? "Hide ▲" : "Show ▼"}
              </CsText>
            </TouchableOpacity>

            {open && (
              <View className="mt-2">
                <FormInput
                  control={control}
                  name="soilPH"
                  label="Soil pH (0–14)"
                  type="phone"
                  error={errors?.soilPH}
                />
                <FormInput
                  control={control}
                  name="soilN"
                  label="Nitrogen (N)"
                  type="phone"
                  error={errors?.soilN}
                />
                <FormInput
                  control={control}
                  name="soilP"
                  label="Phosphorus (P)"
                  type="phone"
                  error={errors?.soilP}
                />
                <FormInput
                  control={control}
                  name="soilK"
                  label="Potassium (K)"
                  type="phone"
                  error={errors?.soilK}
                />
                <FormInput
                  control={control}
                  name="soilOrganicCarbon"
                  label="Organic Carbon (%)"
                  type="phone"
                  error={errors?.soilOrganicCarbon}
                />
                <FormInput
                  control={control}
                  name="soilMicronutrients"
                  label="Micronutrients"
                  type="text"
                  error={errors?.soilMicronutrients}
                />
              </View>
            )}
          </>
        )}
      </View>

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <SingleSelectInput
          control={control}
          name="soilTestFileToggle"
          label="Upload Soil Test Report?"
          options={yesNoOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.soilTestFileToggle?.message}
          modalLabel="Soil Test Report"
        />

        {soilTestFileToggle === "Yes" && (
          <FormFileInput
            control={control}
            name="soilTestFile"
            label="Upload Soil Test Report"
            error={errors?.soilTestFile}
          />
        )}
      </View>
    </View>
  );
}

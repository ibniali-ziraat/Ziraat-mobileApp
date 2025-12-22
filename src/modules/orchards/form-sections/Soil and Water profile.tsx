import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import RadioGroup from "@/src/components/form/inputs/RadioButton";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

import {
  irrigationOptions,
  soilHealthOptions,
  soilTypeOptions,
  waterAvailabilityOptions,
  waterSourceOptions,
  yesNoOptions,
} from "@/src/modules/orchards/schemas/SoilWaterProfileSchema";

export default function SoilAndWaterProfile({ control, errors }) {
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
      {/* ---- Title ---- */}
      {/* <Text className="text-2xl font-bold mb-6 text-center text-primary">
        Soil & Water Profile
      </Text> */}

      <View className="bg-white ">
        {/* <Text className="text-lg font-semibold mb-3 text-gray-800">
          Soil Information
        </Text> */}

        <SingleSelectInput
          control={control}
          name="soilType"
          label="Soil Type"
          options={soilTypeOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.soilType?.message}
        />

        <RadioGroup
          control={control}
          name="soilHealth"
          label="Soil Health"
          options={soilHealthOptions}
          error={errors?.soilHealth?.message}
        />

        <RadioGroup
          control={control}
          name="lastSoilTestDone"
          label="Last Soil Test Done?"
          options={yesNoOptions}
          error={errors?.lastSoilTestDone?.message}
        />

        {lastSoilTestDone === "Yes" && (
          <FormDateInput
            control={control}
            name="lastSoilTestDate"
            label="Latest Soil Test Date"
            error={errors?.lastSoilTestDate?.message}
          />
        )}
      </View>

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <RadioGroup
          control={control}
          name="soilTestRecordsDone"
          label="Soil Test Records Available?"
          options={yesNoOptions}
          error={errors?.soilTestRecordsDone?.message}
        />

        {soilTestRecordsDone === "Yes" && (
          <>
            <TouchableOpacity
              onPress={() => setOpen((prev) => !prev)}
              className="flex-row justify-between items-center mt-3 mb-1"
            >
              <Text className="text-lg font-semibold text-gray-800">
                Soil Records
              </Text>
              <Text className="text-primary text-sm">
                {open ? "Hide ▲" : "Show ▼"}
              </Text>
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
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          Soil Test Report Upload
        </Text>

        <RadioGroup
          control={control}
          name="soilTestFileToggle"
          label="Upload Soil Test Report?"
          options={yesNoOptions}
          error={errors?.soilTestFileToggle?.message}
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

      <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-200">
        <Text className="text-lg font-semibold mb-3 text-gray-800">
          Water Information
        </Text>

        <SingleSelectInput
          control={control}
          name="waterSource"
          label="Water Source"
          options={waterSourceOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.waterSource?.message}
        />

        <SingleSelectInput
          control={control}
          name="irrigationMethod"
          label="Irrigation Method"
          options={irrigationOptions.map((v) => ({ label: v, value: v }))}
          error={errors?.irrigationMethod?.message}
        />

        <SingleSelectInput
          control={control}
          name="waterAvailability"
          label="Water Availability"
          options={waterAvailabilityOptions.map((v) => ({
            label: v,
            value: v,
          }))}
          error={errors?.waterAvailability?.message}
        />
      </View>
    </View>
  );
}

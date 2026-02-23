import { ToggleLeft, ToggleRight } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import MeasuredOrchardSection from "./MeasuredOrchardSection";

import { colors } from "@/src/constants/colors";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { generateEstablishmentYears } from "@/src/utils/generateYears";

export default function BasicInfo({ control, errors, data }) {
  console.log(errors, "errors...");

  const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);

  const { setValue } = useFormContext();

  const unitHydrated = useRef(false);
  const { districts, tehsils, setSelectedDistrict } =
    useCascadingLocation("Jammu and Kashmir");

  useEffect(() => {
    if (data?.district) {
      setSelectedDistrict(data.district);
    }
  }, [data?.district]);

  const orchardUnit = useWatch({
    control,
    name: "orchardUnit",
  });

  const orchardMode = useWatch({
    control,
    name: "orchardSize.mode",
    defaultValue: "measure",
  });

  useEffect(() => {
    if (!orchardUnit) return;

    if (!unitHydrated.current) {
      unitHydrated.current = true;
      return;
    }

    setValue("marlas", "");
    setValue("kanals", "");
  }, [orchardUnit]);

  const toggleMode = () => {
    setValue(
      "orchardSize.mode",
      orchardMode === "measure" ? "manual" : "measure",
    );
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <FormTextInput
        name="orchardName"
        label="Orchard Name"
        type="name"
        placeholder="Enter your orchard name"
        required
        error={errors?.orchardName}
      />

      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 14,
          borderRadius: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Orchard Size Method
        </Text>

        <Pressable
          onPress={toggleMode}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          {orchardMode === "measure" ? (
            <ToggleRight size={30} color={colors.primary} />
          ) : (
            <ToggleLeft size={30} color="#aaa" />
          )}

          <Text style={{ fontWeight: "600", color: colors.primary }}>
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
          <SingleSelectInput
            control={control}
            name="orchardUnit"
            label="Orchard Size Unit"
            modalLabel="Select Unit"
            options={[
              { label: "Marlas", value: "marlas" },
              { label: "Kanals", value: "kanals" },
            ]}
            error={errors?.orchardUnit}
          />

          {orchardUnit === "marlas" && (
            <FormTextInput
              name="marlas"
              label="Size in Marlas"
              type="pincode"
              required
              placeholder="Enter size in Marlas"
              error={errors?.marlas}
            />
          )}

          {orchardUnit === "kanals" && (
            <FormTextInput
              name="kanals"
              label="Size in Kanals"
              type="pincode"
              required
              placeholder="Enter size in Kanals"
              error={errors?.kanals}
            />
          )}
        </View>
      )}

      <SingleSelectInput
        searchable
        control={control}
        name="establishmentYear"
        label="Establishment Year"
        modalLabel="Select Year"
        options={ESTABLISHMENT_YEAR}
        error={errors?.establishmentYear?.message}
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
        error={errors?.plantationPattern?.message}
      />

      {/* Ownership Type */}
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
        error={errors?.ownershipType?.message}
      />

      {/* District */}
      <SingleSelectInput
        searchable
        control={control}
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
        control={control}
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

// import { useEffect, useRef } from "react";
// import { useFormContext, useWatch } from "react-hook-form";
// import { View } from "react-native";

// import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
// import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
// import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
// import { generateEstablishmentYears } from "@/src/utils/generateYears";
// import OrchardSizeInput from "./OrchardSizeInput";

// export default function BasicInfo({
//   control,
//   errors,
//   data,
//   orchardSize,
//   areaLabel,
//   areaUnit,
// }) {
//   const ESTABLISHMENT_YEAR = generateEstablishmentYears(1950);
//   const { setValue } = useFormContext();

//   const unitHydrated = useRef(false);
//   const modeHydrated = useRef(false);

//   const { districts, tehsils, setSelectedDistrict } =
//     useCascadingLocation("Jammu and Kashmir");

//   useEffect(() => {
//     if (data?.district) {
//       setSelectedDistrict(data.district);
//     }
//   }, [data?.district]);

//   useEffect(() => {
//     if (!data?.tehsil || !tehsils.length) return;

//     if (tehsils.includes(data.tehsil)) {
//       setValue("tehsil", data.tehsil, { shouldValidate: true });
//     }
//   }, [tehsils, data?.tehsil]);

//   const orchardUnit = useWatch({
//     control,
//     name: "orchardUnit",
//   });

//   const orchardMode = useWatch({
//     control,
//     name: "orchardSize.mode",
//     defaultValue: "manual",
//   });

//   useEffect(() => {
//     if (!orchardUnit) return;

//     if (!unitHydrated.current) {
//       unitHydrated.current = true;
//       return;
//     }

//     setValue("orchardSize.value", "", {
//       shouldDirty: true,
//       shouldValidate: true,
//     });
//   }, [orchardUnit]);

//   useEffect(() => {
//     if (!orchardMode) return;

//     if (!modeHydrated.current) {
//       modeHydrated.current = true;
//       return;
//     }

//     setValue("orchardSize.unit", undefined);
//     setValue("orchardSize.value", "");
//   }, [orchardMode]);

//   return (
//     <View className="bg-light w-full">
//       <FormTextInput
//         name="orchardName"
//         label="Orchard Name"
//         type="name"
//         placeholder="Enter your orchard name"
//         required
//         error={errors?.orchardName}
//       />

//       {orchardMode === "manual" && (
//         <View style={{ marginVertical: 10 }}>
//           <SingleSelectInput
//             control={control}
//             name="orchardUnit"
//             label="Orchard Size Unit"
//             modalLabel="Select Unit"
//             options={[
//               { label: "Marlas", value: "marlas" },
//               { label: "Kanals", value: "kanals" },
//             ]}
//             error={errors?.orchardUnit}
//           />

//           {orchardUnit === "marlas" && (
//             <FormTextInput
//               name="marlas"
//               label="Size in Marlas"
//               type="pincode"
//               required
//               placeholder="Enter size in Marlas"
//               error={errors?.marlas}
//             />
//           )}

//           {orchardUnit === "kanals" && (
//             <FormTextInput
//               name="kanals"
//               label="Size in Kanals"
//               type="pincode"
//               required
//               placeholder="Enter size in Kanals"
//               error={errors?.kanals}
//             />
//           )}
//         </View>
//       )}

//       {orchardMode === "measure" && (
//         <OrchardSizeInput
//           control={control}
//           errors={errors}
//           measuredValue={orchardSize || data?.orchardSize}
//           areaLabel={areaLabel}
//           areaUnit={areaUnit}
//         />
//       )}

//       <SingleSelectInput
//         searchable
//         control={control}
//         name="establishmentYear"
//         label="Establishment Year"
//         modalLabel="Select Year"
//         options={ESTABLISHMENT_YEAR}
//         error={errors?.establishmentYear?.message}
//       />

//       <SingleSelectInput
//         control={control}
//         name="plantationPattern"
//         label="Plantation Pattern"
//         modalLabel="Select Pattern"
//         options={[
//           { label: "Traditional", value: "Traditional" },
//           { label: "High Density", value: "High Density" },
//           { label: "Ultra High Density", value: "Ultra High Density" },
//           { label: "Other", value: "Other" },
//         ]}
//         error={errors?.plantationPattern?.message}
//       />

//       <SingleSelectInput
//         control={control}
//         name="ownershipType"
//         label="Ownership Type"
//         modalLabel="Ownership Type"
//         options={[
//           { label: "Self-Owned", value: "Self-Owned" },
//           { label: "Joint", value: "Joint" },
//           { label: "Leased", value: "Leased" },
//           { label: "Rented", value: "Rented" },
//           { label: "Other", value: "Other" },
//         ]}
//         error={errors?.ownershipType?.message}
//       />

//       <SingleSelectInput
//         searchable
//         control={control}
//         name="district"
//         label="District"
//         modalLabel="District"
//         options={districts.map((d) => ({ label: d, value: d }))}
//         onValueChange={setSelectedDistrict}
//         disabled={!districts.length}
//         error={errors?.district?.message}
//       />

//       {/* Tehsil */}
//       <SingleSelectInput
//         searchable
//         control={control}
//         name="tehsil"
//         label="Tehsil"
//         modalLabel="Tehsil"
//         options={tehsils.map((t) => ({ label: t, value: t }))}
//         disabled={!tehsils.length}
//         error={errors?.tehsil?.message}
//       />

//       {/* PIN Code */}
//       <FormTextInput
//         name="pincode"
//         label="PIN Code"
//         type="pincode"
//         error={errors?.pincode}
//         required
//       />
//     </View>
//   );
// }

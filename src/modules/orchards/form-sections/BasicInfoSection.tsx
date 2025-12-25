import FormInput from "@/src/components/form/inputs/FormInput";
import { View } from "react-native";

export default function BasicInfo({ control, errors }) {
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
          label="Orchard Size (Kanals & Marlas)"
          type="phone"
          errors={errors?.orchardSize?.message}
        />

        <FormInput
          control={control}
          name="establishmentYear"
          label="Establishment Year"
          type="phone"
          errors={errors?.establishmentYear?.message}
        />

        <FormInput
          control={control}
          name="plantationPattern"
          label="Plantation Pattern"
          errors={errors?.plantationPattern?.message}
        />

        <FormInput
          control={control}
          name="ownershipType"
          label="Ownership Type"
          errors={errors?.ownershipType?.message}
        />

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
        />

        <FormInput
          control={control}
          name="zone"
          label="Zone"
          errors={errors?.zone?.message}
        />

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

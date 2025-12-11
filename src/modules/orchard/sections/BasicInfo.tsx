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
          icon="account"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.orchardName?.message}
        />

        <FormInput
          control={control}
          name="orchardSize"
          label="Orchard Size (Kanals & Marlas)"
          icon="square"
          iconColor="secondary"
          type="phone"
          iconSize={20}
          errors={errors?.orchardSize?.message}
        />

        <FormInput
          control={control}
          name="establishmentYear"
          label="Establishment Year"
          icon="calendar"
          iconColor="secondary"
          type="phone"
          iconSize={20}
          errors={errors?.establishmentYear?.message}
        />

        <FormInput
          control={control}
          name="plantationPattern"
          label="Plantation Pattern"
          icon="tree"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.plantationPattern?.message}
        />

        <FormInput
          control={control}
          name="ownershipType"
          label="Ownership Type"
          icon="home"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.ownershipType?.message}
        />

        <FormInput
          control={control}
          name="district"
          label="District"
          icon="map"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.district?.message}
        />

        <FormInput
          control={control}
          name="tehsil"
          label="Tehsil"
          icon="map-marker"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.tehsil?.message}
        />

        <FormInput
          control={control}
          name="zone"
          label="Zone"
          icon="map-marker-radius"
          iconColor="secondary"
          iconSize={20}
          errors={errors?.zone?.message}
        />

        <FormInput
          control={control}
          name="pincode"
          label="PIN Code"
          icon="numeric"
          iconColor="secondary"
          type="phone"
          iconSize={20}
          errors={errors?.pincode?.message}
        />

        <FormInput
          control={control}
          name="latitude"
          label="Latitude"
          icon="crosshairs-gps"
          iconColor="secondary"
          type="phone"
          iconSize={20}
          errors={errors.latitude?.message}
        />

        <FormInput
          control={control}
          name="longitude"
          label="Longitude"
          icon="crosshairs"
          iconColor="secondary"
          type="phone"
          iconSize={20}
          errors={errors?.longitude?.message}
        />
      </View>
    </View>
  );
}

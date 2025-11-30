import FormInput from "@/src/components/form/inputs/FormInput";
import { ScrollView, Text, View } from "react-native";

export default function StepA_BasicInfo({ control, errors }) {
  return (
    <ScrollView className="flex-1 w-full">
      <Text className="text-2xl font-bold mb-4 text-center text-primary">
        Orchard Registration
      </Text>

      <View className="bg-light rounded-2xl px-4 shadow-md shadow-neutral w-full">
        <Text className="text-lg font-semibold mb-3 text-primary">
          Basic / Mandatory Information
        </Text>

        <FormInput
          control={control}
          name="orchardName"
          label="Orchard Name"
          icon="account"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="orchardSize"
          label="Orchard Size (Kanals & Marlas)"
          icon="square"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="establishmentYear"
          label="Establishment Year"
          icon="calendar"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="plantationPattern"
          label="Plantation Pattern"
          icon="tree"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="ownershipType"
          label="Ownership Type"
          icon="home"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="district"
          label="District"
          icon="map"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="tehsil"
          label="Tehsil"
          icon="map-marker"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="zone"
          label="Zone"
          icon="map-marker-radius"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="pincode"
          label="PIN Code"
          icon="numeric"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="latitude"
          label="Latitude"
          icon="crosshairs-gps"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />

        <FormInput
          control={control}
          name="longitude"
          label="Longitude"
          icon="crosshairs"
          iconColor="secondary"
          iconSize={20}
          errors={errors}
        />
      </View>
    </ScrollView>
  );
}

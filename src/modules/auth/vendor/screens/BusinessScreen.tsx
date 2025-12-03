import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProfileMutation,
  useVendorProfileQuery,
  useVendorProfileUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BusinessSection from "../sections/BusinessSection";

export default function BusinessScreen() {
  const { vendorId, userId } = useAuth();
  console.log(vendorId, "vendorid...");

  const { data } = useVendorProfileQuery(vendorId);
  const { mutateAsync: save } = useVendorProfileMutation();
  const { mutateAsync: update } = useVendorProfileUpdateMutation();

  const form = useZodForm(businessInformationSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key, value);
      }
    });
  }, [data]);
  const onSubmit = async (val) => {
    console.log(val, "this is val");

    try {
      if (data) {
        // Update existing profile using `id`
        const payload = { id: vendorId, userId, ...val };
        await update(payload);
      } else {
        // Save new profile using `supplierProfileId`
        const payload = { supplierProfileId: vendorId, ...val };
        await save(payload);
      }

      Alert.alert("Saved Business Info!");

      // Navigate to Vendor Profile screen
      router.push("/auth/vendor/vendor-profile-screen");
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving Business Info");
    }
  };

  return (
    <ScrollView>
      <FormProvider {...form}>
        <BusinessSection errors={errors} control={control} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </FormProvider>
    </ScrollView>
  );
}

import AddressSection from "@/src/components/form/sections/AddressSection";
import BackHeader from "@/src/components/shared/BackHeader";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useAddressMutation,
  useAddressQuery,
  useAddressUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { addressSchema } from "@/src/schemas/user/address.schema";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button, ScrollView } from "react-native";

export default function AddressScreen() {
  const { userProfileId } = useAuth();

  const { data } = useAddressQuery(userProfileId);
  const { mutateAsync: save } = useAddressMutation();
  const { mutateAsync: update } = useAddressUpdateMutation();

  const form = useZodForm(addressSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([k, v]) => setValue(k, v));
  }, [data]);

  const onSubmit = async (values) => {
    const payload = { profileId: userProfileId, ...values };
    data ? await update(payload) : await save(payload);
    Alert.alert("Success", "Address Saved!");
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader>Address</BackHeader>
        <AddressSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}

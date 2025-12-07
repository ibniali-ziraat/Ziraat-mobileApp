import AddressSection from "@/src/components/form/sections/AddressSection";
import BackHeader from "@/src/components/shared/BackHeader";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useAddressMutation,
  useAddressQuery,
  useAddressUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { addressSchema } from "@/src/schemas/user/address.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Button, ScrollView } from "react-native";

export default function AddressScreen() {
  const { userData } = useGlobalData();

  const { data } = useAddressQuery(userData.profileId);
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
    console.log(values, "values");

    try {
      const payload = { profileId: userData.profileId, ...values };

      if (data) {
        await update(payload);
      } else {
        await save(payload);
      }
      showSuccessToast("saved");
      router.replace("/user-profile");
    } catch (error) {
      const backendError =
        error?.response?.data?.message ||
        error?.response?.data?.[0]?.description ||
        "Something went wrong while saving the address";

      showErrorToast(backendError);
    }
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader title="Address" />
        <AddressSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}

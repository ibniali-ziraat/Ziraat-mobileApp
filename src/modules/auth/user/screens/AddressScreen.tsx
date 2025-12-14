import AddressSection from "@/src/modules/auth/user/sections/AddressSection";
import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
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
import { ScrollView } from "react-native";

export default function AddressScreen() {
  // const { userData } = useGlobalData();
  const { userProfileId } = useAuth();

  const { data } = useAddressQuery(userProfileId);
  const { mutateAsync: save, isPending: isSaving } = useAddressMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useAddressUpdateMutation();

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
      const payload = { profileId: userProfileId, ...values };

      if (data) {
        await update(payload);
        showSuccessToast("Address Updated");
      } else {
        await save(payload);
        showSuccessToast("Address Saved");
      }
      router.replace(ROUTES.USER.PROFILE);
    } catch (error) {
      const backendError =
        error?.response?.data?.message ||
        error?.response?.data?.[0]?.description ||
        "Something went wrong while saving the address";

      showErrorToast(backendError);
    }
  };

  return (
    <ScreenLayout>
      <FormProvider {...form}>
        <ScrollView>
          <BackHeader
            title="Address"
            onPress={() => router.push(ROUTES.USER.PROFILE)}
          />
          <AddressSection control={control} errors={errors} data={data} />
          <FormActions
            cancelLabel={"Cancel"}
            onCancel={() => router.push(ROUTES.USER.PROFILE)}
            submitLabel={data ? "Update Adress" : "Add Address"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </ScrollView>
      </FormProvider>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProfileMutation,
  useVendorProfileQuery,
  useVendorProfileUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import BusinessSection from "../sections/BusinessSection";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";

export default function BusinessScreen() {
  const { setVendorProfileId, userId } = useAuth();

  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useVendorProfileQuery(userId);
  const { mutateAsync: save, isPending: isSaving } = useVendorProfileMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorProfileUpdateMutation();

  const form = useZodForm(businessInformationSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // useEffect(() => {
  //   if (userProfileData?.id) {
  //     setUserData({ profileId: userProfileData.id });
  //   }
  // }, [userProfileData]);

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key, value);
      }
    });
  }, [data]);

  console.log(data, "businessdata");

  const onSubmit = async (val: any) => {
    try {
      if (data) {
        const payload = { id: data.id, ...val, userId: userId };
        await update(payload);
        showSuccessToast("Profile Updated");
      } else {
        const payload = { userId: userId, ...val };
        const res = await save(payload);

        setVendorProfileId(res.id);
        showSuccessToast("Supplier registration successful");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      showErrorToast("Something went wrong");
      console.error(err);
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Supplier Onboarding"
        desc="Start selling to farmers today."
        onPress={() => router.replace(ROUTES.TABS.MENU)}
      />
      <FormProvider {...form}>
        <BusinessSection errors={errors} control={control} data={data} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.back()}
          submitLabel={data ? "Update" : "Submit"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

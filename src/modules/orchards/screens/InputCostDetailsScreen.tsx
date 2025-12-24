import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreateInputCostMutation,
  useInputCostQuery,
  useUpdateInputCostMutation,
} from "@/src/hooks/useOrchardsQuery";
import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import InputCostDetails from "../form-sections/InputCostSection";

export default function InputCostDetailsScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useInputCostQuery(0);
  const { mutateAsync: save, isPending: isSaving } =
    useCreateInputCostMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateInputCostMutation();

  // const form = useZodForm(InputCostDetailsSchema);
  const form = useZodForm();
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

  //   useEffect(() => {
  //     if (!data) return;
  //     Object.entries(data).forEach(([key, value]) => {
  //       if (value !== null && value !== undefined) {
  //         setValue(key, value);
  //       }
  //     });
  //   }, [data]);

  const onSubmit = async (val: any) => {
    router.push(ROUTES.ORCHARDS.REGISTRATION.PLANT_PROTECTION_INFO);
    // try {
    //   if (data) {
    //     const payload = { id: vendorData.id, ...val };
    //     await update(payload);
    //   } else {
    //     const payload = { userId: userData.id, ...val };
    //     const res = await save(payload);
    //     setVendorData({
    //       profileId: res.id,
    //     });
    //   }
    //   router.push("/auth/vendor/vendor-profile-screen");
    // } catch (err) {
    //   showErrorToast("Something went wrong");
    //   console.error(err);
    // }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc=" Input Cost Details" />
      <FormProvider {...form}>
        <InputCostDetails errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Save"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

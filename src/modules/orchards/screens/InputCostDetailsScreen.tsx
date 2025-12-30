import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreateInputCostMutation,
  useInputCostQuery,
  useOrchardProfileId,
  useUpdateInputCostMutation,
} from "../hooks/useOrchardsQuery";

import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import InputCostDetails from "../form-sections/InputCostSection";

export default function InputCostDetailsScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useInputCostQuery(0);
  const { userId } = useAuth();
  const { data: orchardProfile } = useOrchardProfileId(userId);
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

  const onSubmit = async (values: any) => {
    try {
      // let res;

      // if (orchardId) {
      //   res = await update({ id: orchardId, ...values });
      //   showSuccessToast("Orchard updated");
      // }

      // else

      //   {
      const payload = {
        id: orchardProfile?.[0]?.id,
        inputCost: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }

      router.push(ROUTES.ORCHARDS.REGISTRATION.PLANT_PROTECTION_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
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

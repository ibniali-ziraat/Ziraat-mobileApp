import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";

import { useAuth } from "@/src/contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import CropNutrition from "../form-sections/CropNutritionSection";
import {
  useCreateVarietyMutation,
  useOrchardProfileId,
  useOrchardVarietiesQuery,
  useUpdateVarietyMutation,
} from "../hooks/useOrchardsQuery";

export default function CropNutritionManagementScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useOrchardVarietiesQuery(1);
  const { userId } = useAuth();
  const { data: orchardProfile } = useOrchardProfileId(userId);
  console.log(orchardProfile, "orchardproiled id");

  const { mutateAsync: save, isPending: isSaving } = useCreateVarietyMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateVarietyMutation();

  // const form = useZodForm(CropNutritionSchema);
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

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key, value);
      }
    });
  }, [data]);

  const onSubmit = async (values: any) => {
    console.log(values, "values...");
    router.push(ROUTES.ORCHARDS.REGISTRATION.PRODUCTION_INFO);

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
        cropNutrition: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }

      router.push(ROUTES.ORCHARDS.REGISTRATION.FARM_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Crop & Nutrition Management
"
      />
      <FormProvider {...form}>
        <CropNutrition errors={errors} control={control} />
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

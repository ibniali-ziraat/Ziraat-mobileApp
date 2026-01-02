import BackHeader from "@/src/components/shared/BackHeader";
import { useZodForm } from "@/src/hooks/useZodForm";
// import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreatePlantProtectionMutation,
  useOrchardProfileId,
  usePlantProtectionQuery,
  useUpdatePlantProtectionMutation,
} from "../hooks/useOrchardsQuery";

import { useAuth } from "@/src/contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import PlantProtection from "../form-sections/PlantProtectionSection";

export default function PlantProtectionScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");
  const { userId } = useAuth();
  const { data: orchardProfile } = useOrchardProfileId(userId);
  const { data } = usePlantProtectionQuery(1);
  const { mutateAsync: save, isPending: isSaving } =
    useCreatePlantProtectionMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdatePlantProtectionMutation();

  const form = useZodForm();
  // const form = useZodForm(PlantProtectionSchema);
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
        plantHealth: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }

      router.push(ROUTES.ORCHARDS.REGISTRATION.PRODUCTION_INFO);
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
        desc="Plant Protection & Health"
      />
      <FormProvider {...form}>
        <PlantProtection errors={errors} control={control} />
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

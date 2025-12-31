import BackHeader from "@/src/components/shared/BackHeader";
import { useZodForm } from "@/src/hooks/useZodForm";
// import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreateSoilWaterMutation,
  useOrchardProfileId,
  useSoilWaterQuery,
  useUpdateSoilWaterMutation,
} from "../hooks/useOrchardsQuery";

import { useAuth } from "@/src/contexts/AuthContext";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import SoilAndWaterProfile from "../form-sections/SoilWaterSection";

export default function SoilAndWaterProfileScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");
  const { userId } = useAuth();
  const { data: orchardProfile } = useOrchardProfileId(userId);

  const { data } = useSoilWaterQuery(1);
  const { mutateAsync: save, isPending: isSaving } =
    useCreateSoilWaterMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateSoilWaterMutation();

  // const form = useZodForm(SoilWaterProfileSchema);
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
        soilAndWater: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }
      router.push(ROUTES.ORCHARDS.REGISTRATION.VARIETY_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Soil and Water Profile" />
      <FormProvider {...form}>
        <SoilAndWaterProfile errors={errors} control={control} />
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

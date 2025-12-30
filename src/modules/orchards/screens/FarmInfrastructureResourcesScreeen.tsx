import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreateInfrastructureMutation,
  useInfrastructureQuery,
  useOrchardProfileId,
  useUpdateInfrastructureMutation,
} from "../hooks/useOrchardsQuery";

import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import FarmInfrastructure from "../form-sections/FarmInfrastructureSection";

export default function FarmInfrastuctureScreen() {
  // console.log(userProfileData, "userprofiledata");
  const { userId } = useAuth();

  const { data: orchardProfile } = useOrchardProfileId(userId);

  const { data } = useInfrastructureQuery(11);
  const { mutateAsync: save, isPending: isSaving } =
    useCreateInfrastructureMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateInfrastructureMutation();

  const form = useZodForm();
  // const form = useZodForm(FarmInfrastructureSchema);
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
        infrastructure: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }

      // router.push(ROUTES.TABS.ORCHARDS);
      router.push(ROUTES.ORCHARDS.REGISTRATION.INPUT_COST_INFO);
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
        desc=" Farm Infrastructure & Resources"
      />
      <FormProvider {...form}>
        <FarmInfrastructure errors={errors} control={control} />
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

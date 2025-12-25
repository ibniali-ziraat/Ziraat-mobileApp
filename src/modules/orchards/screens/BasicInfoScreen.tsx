import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useAuth } from "@/src/contexts/AuthContext";
import { useOrchard } from "@/src/contexts/OrchardContext";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../../../hooks/useOrchardsQuery";
import BasicInfo from "../form-sections/BasicInfoSection";

export default function BasicInfoScreen() {
  const { userId } = useAuth();
  const { orchardId, setOrchardId } = useOrchard();

  const { data } = useOrchardsByUserQuery(userId);
  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardBasinInfoMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardBasicInfoMutation();

  // const form = useZodForm(BasicInfoSchema);
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // Prefill if editing
  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
    setOrchardId(data.id);
  }, [data]);

  const onSubmit = async (values: any) => {
    router.push(ROUTES.ORCHARDS.REGISTRATION.CROP_INFO);

    // try {
    //   let res;

    //   if (orchardId) {
    //     res = await update({ id: orchardId, ...values });
    //     showSuccessToast("Orchard updated");
    //   } else {
    //     res = await save({ userId, ...values });
    //     setOrchardId(res.id);
    //     showSuccessToast("Orchard created");
    //   }

    //   // move to next step
    //   router.push("/orchards/variety");
    // } catch (error: any) {
    //   showErrorToast(
    //     error?.response?.data?.message || "Failed to save orchard information"
    //   );
    // }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Basic / Mandatory Information"
      />

      <FormProvider {...form}>
        <BasicInfo errors={errors} control={control} />

        <FormActions
          cancelLabel="Cancel"
          onCancel={() => router.back()}
          submitLabel={orchardId ? "Update" : "Save"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfessionMutation,
  useProfessionQuery,
  useProfessionUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { professionSchema } from "@/src/modules/auth/user/schemas/profession.schema";
import ProfessionSection from "@/src/modules/auth/user/sections/ProfessionSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

export default function ProfessionScreen() {
  const { userProfileId } = useAuth();

  const { data } = useProfessionQuery(userProfileId);
  const { mutateAsync: save, isPending: isSaving } = useProfessionMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useProfessionUpdateMutation();

  const form = useZodForm(professionSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([k, v]) => {
      setValue(k, v != null ? String(v) : ""); // convert numbers to strings
    });
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = { profileId: userProfileId, ...values };

      if (data) {
        await update(payload);
        showSuccessToast("Profession Updated");
      } else {
        await save(payload);
        showSuccessToast("Profession Info Saved");
      }

      router.replace(ROUTES.USER.PROFILE);
    } catch (error) {
      const backendError =
        error?.response?.data?.message ||
        error?.response?.data?.[0]?.description ||
        "Something went wrong while saving profession details";

      showErrorToast(backendError);
    }
  };

  return (
    <ScreenLayout>
      <FormProvider {...form}>
        <BackHeader
          title="Profession"
          onPress={() => router.replace(ROUTES.USER.PROFILE)}
        />

        <ProfessionSection control={control} errors={errors} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.replace(ROUTES.USER.PROFILE)}
          submitLabel={data ? "Update " : "Add "}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

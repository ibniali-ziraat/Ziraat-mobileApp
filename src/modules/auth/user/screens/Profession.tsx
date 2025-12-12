import ProfessionSection from "@/src/components/form/sections/ProfessionSection";
import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfessionMutation,
  useProfessionQuery,
  useProfessionUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { professionSchema } from "@/src/schemas/user/profession.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { ScrollView } from "react-native";

export default function ProfessionScreen() {
  // const { userData } = useGlobalData();
  const { userProfileId } = useAuth()


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
      } else {
        await save(payload);
      }

      showSuccessToast("Profession saved successfully");
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
        <ScrollView>
          <BackHeader title="Profession" />

          <ProfessionSection control={control} errors={errors} />
          <FormActions
            cancelLabel={"Cancel"}
            onCancel={() => router.back()}

            submitLabel={data ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </ScrollView>
      </FormProvider>
    </ScreenLayout>
  );
}

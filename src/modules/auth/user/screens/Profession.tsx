import ProfessionSection from "@/src/components/form/sections/ProfessionSection";
import BackHeader from "@/src/components/shared/BackHeader";
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
import { Button, ScrollView } from "react-native";

export default function ProfessionScreen() {
  const { userData } = useGlobalData();

  const { data } = useProfessionQuery(userData.profileId);
  const { mutateAsync: save } = useProfessionMutation();
  const { mutateAsync: update } = useProfessionUpdateMutation();

  const form = useZodForm(professionSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([k, v]) => setValue(k, v));
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = { profileId: userData.profileId, ...values };

      if (data) {
        await update(payload);
      } else {
        await save(payload);
      }

      showSuccessToast("Profession saved successfully");
      router.replace("/user-profile");
    } catch (error) {
      const backendError =
        error?.response?.data?.message ||
        error?.response?.data?.[0]?.description ||
        "Something went wrong while saving profession details";

      showErrorToast(backendError);
    }
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader title="Profession" />

        <ProfessionSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}

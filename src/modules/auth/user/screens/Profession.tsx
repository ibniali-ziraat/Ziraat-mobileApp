import ProfessionSection from "@/src/components/form/sections/ProfessionSection";
import BackHeader from "@/src/components/shared/BackHeader";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfessionMutation,
  useProfessionQuery,
  useProfessionUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { professionSchema } from "@/src/schemas/user/profession.schema";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button, ScrollView } from "react-native";

export default function ProfessionScreen() {
  const { userProfileId } = useAuth();

  const { data } = useProfessionQuery(userProfileId);
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
    const payload = { userProfileId, ...values };
    data ? await update(payload) : await save(payload);
    Alert.alert("Success", "Profession Saved!");
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader>Profession</BackHeader>
        <ProfessionSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}

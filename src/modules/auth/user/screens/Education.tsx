import EducationSection from "@/src/components/form/sections/EducationSection";
import BackHeader from "@/src/components/shared/BackHeader";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useEducationMutation,
  useEducationQuery,
  useEducationUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { educationSchema } from "@/src/schemas/user/education.schema";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button, ScrollView } from "react-native";

export default function EducationScreen() {
  const { userProfileId } = useAuth();

  const { data } = useEducationQuery(userProfileId);
  const { mutateAsync: save } = useEducationMutation();
  const { mutateAsync: update } = useEducationUpdateMutation();

  const form = useZodForm(educationSchema);
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
    Alert.alert("Success", "Education Saved!");
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader>Education</BackHeader>
        <EducationSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}

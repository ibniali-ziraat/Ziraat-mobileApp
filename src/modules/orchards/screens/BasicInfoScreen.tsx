import "react-native-get-random-values";

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import BasicInfo from "../form-sections/BasicInfoSection";

import { ROUTES } from "@/src/constants/routes";
import { generateId } from "@/src/utils/generateId";
import {
  useCreateOrchardMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardMutation,
} from "../hooks/useOrchardsQuery";
import { BasicInfoSchema } from "../schemas/BasicInfoSchema";

export default function BasicInfoScreen() {
  const { data, isPending } = useOrchardsByUserQuery();

  const { mode, id } = useLocalSearchParams<{
    mode?: string;
    id?: string;
  }>();

  const isEditMode = mode === "edit";

  const orchard = isEditMode
    ? data?.find((o: any) => String(o.id) === String(id))
    : null;

  const { mutateAsync: createOrchard, isPending: creating } =
    useCreateOrchardMutation();

  const { mutateAsync: updateOrchard, isPending: updating } =
    useUpdateOrchardMutation();

  const form = useZodForm(BasicInfoSchema);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!isEditMode) {
      reset();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !orchard) return;

    const hasKanals = Number(orchard.kanals) > 0;
    const hasMarlas = Number(orchard.marlas) > 0;

    reset({
      orchardName: orchard.orchardName ?? "",
      establishmentYear: String(orchard.establishmentYear ?? ""),
      plantationPattern: orchard.plantationPattern ?? "",
      ownershipType: orchard.ownershipType ?? "",
      district: orchard.district ?? "",
      tehsil: orchard.tehsil ?? "",
      zone: orchard.zone ?? "",
      pincode: orchard.pinCode ?? "",
      orchardUnit: hasKanals ? "kanals" : hasMarlas ? "marlas" : undefined,
      kanals: hasKanals ? String(orchard.kanals) : "",
      marlas: hasMarlas ? String(orchard.marlas) : "",
      orchardSize: {
        mode: "manual",
      },
    });
  }, [isEditMode, orchard]);

  const safeDecimal = (value) => {
    if (value === "" || value === undefined || value === null) return 0;
    return Number(value);
  };

  const onSubmit = async (values) => {
    const payload = {
      orchardId: orchard?.id ?? generateId(),

      ...values,

      kanals: values.orchardUnit === "kanals" ? safeDecimal(values.kanals) : 0,

      marlas: values.orchardUnit === "marlas" ? safeDecimal(values.marlas) : 0,
    };

    if (orchard) {
      await updateOrchard(payload);
      router.replace(ROUTES.TABS.ORCHARDS);
    } else {
      await createOrchard(payload);
      router.replace(ROUTES.TABS.ORCHARDS);
    }
  };

  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title={isEditMode ? "Edit Orchard" : "Add Orchard"}
        desc="Enter orchard details"
        onPress={() => router.back()}
      />

      <ScreenContent>
        <FormProvider {...form}>
          <BasicInfo control={control} errors={errors} data={orchard} />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.back()}
            submitLabel={isEditMode ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={creating || updating}
            loading={creating || updating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

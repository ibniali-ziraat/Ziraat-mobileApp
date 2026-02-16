import "react-native-get-random-values"; // ✅ ALWAYS FIRST

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import BasicInfo from "../form-sections/BasicInfoSection";

import { ROUTES } from "@/src/constants/routes";
import { v4 as uuidv4 } from "uuid";

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
    setValue,
    handleSubmit,
    control,
    reset, // ✅ IMPORTANT
    formState: { errors },
  } = form;

  /* ✅ RESET FORM WHEN MODE CHANGES */
  useEffect(() => {
    if (!isEditMode) {
      reset(); // 🧹 Clear old edit values when creating new orchard
    }
  }, [isEditMode]);

  /* ✅ PREFILL ONLY EDIT MODE */
  useEffect(() => {
    if (!isEditMode || !orchard) return;

    console.log("🌳 Prefilling orchard:", orchard);

    reset({
      orchardName: orchard.orchardName ?? "",
      establishmentYear: String(orchard.establishmentYear ?? ""),
      plantationPattern: orchard.plantationPattern ?? "",
      ownershipType: orchard.ownershipType ?? "",
      district: orchard.district ?? "",
      tehsil: orchard.tehsil ?? "",
      zone: orchard.zone ?? "",
      pincode: orchard.pinCode ?? "",

      orchardSize: {
        mode: "manual",
        unit:
          orchard.kanals > 0
            ? "kanal"
            : orchard.marlas > 0
              ? "marla"
              : undefined,
        value:
          orchard.kanals > 0
            ? orchard.kanals
            : orchard.marlas > 0
              ? orchard.marlas
              : undefined,
      },
    });
  }, [isEditMode, orchard]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        orchardId: orchard?.id ?? uuidv4(),
        ...values,
      };

      if (orchard) {
        await updateOrchard(payload);
        showSuccessToast("Orchard updated");
      } else {
        await createOrchard(payload);
        showSuccessToast("Orchard created");
      }

      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      console.log("❌ ERROR:", error);
      console.log("❌ STATUS:", error?.response?.status);
      console.log("❌ DATA:", error?.response?.data);

      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard",
      );
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

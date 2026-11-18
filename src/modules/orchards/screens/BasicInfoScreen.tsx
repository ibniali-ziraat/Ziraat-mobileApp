import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useLocation } from "@/src/hooks/useLocationPermission";
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

  // Start resolving GPS on mount so the default orchard location is normally
  // ready before the user finishes the rest of the form.
  const {
    coords,
    loading: locationLoading,
    error: locationError,
    retry: retryLocation,
  } = useLocation();

  const form = useZodForm(BasicInfoSchema);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    getFieldState,
    setValue,
  } = form;

  useEffect(() => {
    if (!isEditMode) {
      reset();
    }
  }, [isEditMode, reset]);

  useEffect(() => {
    if (!isEditMode || !orchard) return;

    const hasKanals = Number(orchard.kanals) > 0;
    const hasMarlas = Number(orchard.marlas) > 0;
    const hasStoredCoords =
      !!orchard.latitude &&
      !!orchard.longitude &&
      Number(orchard.latitude) !== 0 &&
      Number(orchard.longitude) !== 0;

    reset({
      orchardName: orchard.orchardName ?? "",
      establishmentYear: String(orchard.establishmentYear ?? ""),
      plantationPattern: orchard.plantationPattern ?? "",
      ownershipType: orchard.ownershipType ?? "",
      district: orchard.district ?? "",
      tehsil: orchard.tehsil ?? "",
      zone: orchard.zone ?? "",
      pincode: orchard.pinCode ?? "",
      kanals: hasKanals ? String(orchard.kanals) : "",
      marlas: hasMarlas ? String(orchard.marlas) : "",
      orchardSize: {
        mode: "manual",
      },
      latitude: hasStoredCoords ? String(orchard.latitude) : "",
      longitude: hasStoredCoords ? String(orchard.longitude) : "",
    });
  }, [isEditMode, orchard, reset]);

  useEffect(() => {
    if (!coords) return;

    const hasStoredCoords =
      !!orchard?.latitude &&
      !!orchard?.longitude &&
      Number(orchard.latitude) !== 0 &&
      Number(orchard.longitude) !== 0;

    if (hasStoredCoords || getFieldState("latitude").isDirty) return;

    setValue("latitude", coords.lat.toFixed(6), { shouldValidate: true });
    setValue("longitude", coords.lon.toFixed(6), { shouldValidate: true });
  }, [coords, orchard, getFieldState, setValue]);

  const onSubmit = async (values) => {
    console.log(values, "values...");

    const kanalsPayload = Number(values.kanals || 0);
    const marlasPayload = Number(values.marlas || 0);

    const payload = {
      orchardId: orchard?.id ?? generateId(),
      ...values,
      kanals: kanalsPayload,
      marlas: marlasPayload,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    };

    if (orchard) {
      await updateOrchard(payload);
      router.dismiss();
      return;
    }

    await createOrchard(payload);

    // back to the list of orchards, whatever is stacked above it
    router.dismissTo(ROUTES.TABS.ORCHARDS);
  };

  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title={isEditMode ? "Edit Orchard" : "Add Orchard"}
        desc="Enter orchard details"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <BasicInfo
            errors={errors}
            data={orchard}
            locationLoading={locationLoading}
            locationError={locationError}
            onRetryLocation={retryLocation}
          />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.replace(ROUTES.TABS.ORCHARDS)}
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

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

  // Kicked off on mount so a fix is very likely ready by the time the user
  // finishes filling the form — doesn't block submission if it isn't.
  const { coords } = useLocation();

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
      kanals: hasKanals ? String(orchard.kanals) : "",
      marlas: hasMarlas ? String(orchard.marlas) : "",
      orchardSize: {
        mode: "manual",
      },
    });
  }, [isEditMode, orchard]);

  const onSubmit = async (values) => {
    console.log(values, "values...");

    const kanalsPayload = Number(values.kanals || 0);
    const marlasPayload = Number(values.marlas || 0);

    // Editing an existing orchard shouldn't overwrite its real coordinates
    // with wherever the device happens to be right now — only fall back to
    // live GPS when there's no valid stored location yet (which also
    // backfills any orchard that was created before this field existed).
    const hasStoredCoords =
      !!orchard?.latitude && !!orchard?.longitude &&
      Number(orchard.latitude) !== 0 && Number(orchard.longitude) !== 0;

    const payload = {
      orchardId: orchard?.id ?? generateId(),
      ...values,
      kanals: kanalsPayload,
      marlas: marlasPayload,
      latitude: hasStoredCoords ? Number(orchard.latitude) : (coords?.lat ?? 0),
      longitude: hasStoredCoords ? Number(orchard.longitude) : (coords?.lon ?? 0),
    };

    if (orchard) {
      await updateOrchard(payload);
    } else {
      await createOrchard(payload);
    }

    // router.replace(ROUTES.TABS.ORCHARDS);
    router.dismiss();
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
          <BasicInfo errors={errors} data={orchard} />

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

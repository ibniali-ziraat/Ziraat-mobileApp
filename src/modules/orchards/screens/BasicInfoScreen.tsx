import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { ROUTES } from "@/src/constants/routes";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import BasicInfo from "../form-sections/BasicInfoSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

import { v4 as uuidv4 } from "uuid";

export default function BasicInfoScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    areaValue?: string;
    areaUnit?: string;
    areaLabel?: string;
  }>();

  /* -------------------- API -------------------- */
  const { data: orchardData, isPending } = useOrchardsByUserQuery();

  const orchard = orchardData?.find(
    (o: any) => String(o.id) === String(params.id)
  );

  const { mutateAsync: createOrchard, isPending: creating } =
    useCreateOrchardBasinInfoMutation();

  const { mutateAsync: updateOrchard, isPending: updating } =
    useUpdateOrchardBasicInfoMutation();

  /* -------------------- FORM -------------------- */
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  /* -------------------- PREFILL -------------------- */
  useEffect(() => {
    if (!orchard) return;

    Object.entries(orchard).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });

    // Prefill orchard size
    if (orchard.kanals > 0) {
      setValue("orchardSize.mode", "manual");
      setValue("orchardSize.unit", "kanal");
      setValue("orchardSize.value", String(orchard.kanals));
    } else if (orchard.marlas > 0) {
      setValue("orchardSize.mode", "manual");
      setValue("orchardSize.unit", "marla");
      setValue("orchardSize.value", String(orchard.marlas));
    }
  }, [orchard]);

  /* -------------------- MEASURED AREA -------------------- */
  useEffect(() => {
    if (!params?.areaValue) return;

    setValue("orchardSize.mode", "measure", { shouldValidate: true });
    setValue("orchardSize.value", params.areaValue, { shouldValidate: true });
    setValue("orchardSize.unit", params.areaUnit, { shouldValidate: true });
  }, [params?.areaValue, params?.areaUnit]);

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values: any) => {
    try {
      const {
        orchardSize,
        orchardName,
        establishmentYear,
        plantationPattern,
        ownershipType,
        district,
        tehsil,
        pincode,
        latitude = 74.8946,
        longitude = 74.8946,
        zone,
      } = values;

      let kanals = 0;
      let marlas = 0;

      if (orchardSize.mode === "manual") {
        if (orchardSize.unit === "kanal") kanals = Number(orchardSize.value);
        if (orchardSize.unit === "marla") marlas = Number(orchardSize.value);
      }

      if (orchardSize.mode === "measure") {
        marlas = Number(orchardSize.value || 0);
      }

      const payload = {
        orchardId: orchard?.id ?? uuidv4(),
        orchardName,
        kanals,
        marlas,
        establishmentYear,
        plantationPattern,
        ownershipType,
        district,
        tehsil,
        zone: zone ?? "",
        pinCode: pincode,
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      if (orchard) {
        await updateOrchard(payload);
        showSuccessToast("Orchard updated");
      } else {
        await createOrchard(payload);
        showSuccessToast("Orchard created");
      }

      router.replace(ROUTES.ORCHARDS.DETAIL.replace(":id", payload.orchardId));
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  /* -------------------- UI -------------------- */
  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Enter the basic details required to register your orchard successfully."
        onPress={() => router.back()}
      />

      <ScreenContent>
        <FormProvider {...form}>
          <BasicInfo
            control={control}
            errors={errors}
            orchardSize={params.areaValue}
            areaLabel={params.areaLabel}
            areaUnit={params.areaUnit}
          />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.back()}
            submitLabel={orchard ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={creating || updating}
            loading={creating || updating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

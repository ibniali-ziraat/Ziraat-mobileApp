import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import BasicInfo from "../form-sections/BasicInfoSection";

import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  useCreateOrchardMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardMutation,
} from "../hooks/useOrchardsQuery";

export default function BasicInfoScreen() {
  const { data, isPending } = useOrchardsByUserQuery();
  const orchard = data?.[0];
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { mutateAsync: createOrchard, isPending: creating } =
    useCreateOrchardMutation();
  const { mutateAsync: updateOrchard, isPending: updating } =
    useUpdateOrchardMutation();

  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!orchard) return;

    setValue("orchardName", orchard.orchardName);
    setValue("establishmentYear", String(orchard.establishmentYear));

    setValue("plantationPattern", orchard.plantationPattern);
    setValue("ownershipType", orchard.ownershipType);
    setValue("district", orchard.district);
    setValue("tehsil", orchard.tehsil);
    setValue("zone", orchard.zone ?? "");
    setValue("pincode", orchard.pinCode);
    setValue("latitude", orchard.latitude);
    setValue("longitude", orchard.longitude);

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

  useEffect(() => {
    if (!data?.areaValue) return;

    setValue("orchardSize.mode", "measure", { shouldValidate: true });
    setValue("orchardSize.value", data.areaValue, { shouldValidate: true });
    setValue("orchardSize.unit", data.areaUnit, { shouldValidate: true });
  }, [data?.areaValue, data?.areaUnit]);

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

      // if (orchardSize.mode === "manual") {
      if (orchardSize.unit === "kanal") {
        kanals = Number(orchardSize.value);
        marlas = 0; // FORCE RESET
      }

      if (orchardSize.unit === "marla") {
        marlas = Number(orchardSize.value);
        kanals = 0; // FORCE RESET
      }
      // }

      if (orchardSize.mode === "measure") {
        marlas = Number(orchardSize.value || 0);
        kanals = 0; // FORCE RESET
      }

      const payload: any = {
        orchardId: orchard?.id ?? uuidv4(),
        kanals: kanals,
        marlas: marlas,
        orchardName,
        establishmentYear: Number(establishmentYear),
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

      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information",
      );
    }
  };

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
            orchardSize={data.areaValue}
            areaLabel={data.areaLabel}
            areaUnit={data.areaUnit}
            data={data}
          />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.back()}
            submitLabel={data.length > 0 ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={creating || updating}
            loading={creating || updating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useAuth } from "@/src/contexts/AuthContext";
import { useFileUploadMutation } from "@/src/hooks/useFileUpload";
import SoilAndWaterProfile from "../form-sections/SoilWaterSection";
import {
  useCreateSoilWaterMutation,
  useSoilWaterQuery,
  useUpdateSoilWaterMutation,
} from "../hooks/useOrchardsQuery";
import { SoilWaterProfileSchema } from "../schemas/SoilWaterProfileSchema";

export default function SoilAndWaterProfileScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");
  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();

  const { data: soilWaterData } = useSoilWaterQuery(orchardProfileId!);
  console.log(soilWaterData, "soilwaterdata...");

  const { mutateAsync: save, isPending: isSaving } =
    useCreateSoilWaterMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateSoilWaterMutation();
  const form = useZodForm(SoilWaterProfileSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!soilWaterData) return;

    Object.entries(soilWaterData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [soilWaterData]);
  const onSubmit = async (values: any) => {
    try {
      let soilTestReportUrl = soilWaterData?.soilTestReportUrl || "";

      // Upload file only if new file selected
      if (values.soilTestReportUrl?.uri) {
        const uploadRes = await uploadFileAsync({
          file: {
            uri: values.soilTestReportUrl.uri,
            name:
              values.soilTestReportUrl.name || `soil-report-${Date.now()}.pdf`,
            mimeType: values.soilTestReportUrl.mimeType || "application/pdf",
          },
          UserType: "vendor",
          UserId: orchardProfileId.toString(),
          FileCategory: "documents",
        });

        soilTestReportUrl = uploadRes?.data?.fileUrl;
      }

      const payload = {
        id: soilWaterData?.id,
        orchardProfileId,
        ...values,
        soilTestReportUrl,
      };

      if (soilWaterData) {
        await update(payload);
        showSuccessToast("Updated successfully");
      } else {
        await save(payload);
        showSuccessToast("Saved successfully");
      }

      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save profile",
      );
    }
  };

  // const onSubmit = async (values: any) => {
  //   try {
  //     const payload = {
  //       id: soilWaterData?.id,
  //       orchardProfileId,
  //       ...values,
  //       soilTestReportUrl:
  //         values.soilTestReportUrl?.name || values.soilTestReportUrl,
  //     };

  //     if (soilWaterData) {
  //       await update(payload);
  //       showSuccessToast("Soil & Water Profile updated");
  //     } else {
  //       await save(payload);
  //       showSuccessToast("Soil & Water Profile saved");
  //     }

  //     router.push(ROUTES.TABS.ORCHARDS);
  //   } catch (error: any) {
  //     showErrorToast(
  //       error?.response?.data?.message || "Failed to save soil & water profile",
  //     );
  //   }
  // };

  // if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Soil and Water Profile" />

      <ScreenContent>
        <FormProvider {...form}>
          <SoilAndWaterProfile
            errors={errors}
            control={control}
            data={soilWaterData}
          />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.replace(ROUTES.TABS.ORCHARDS)}
            submitLabel={soilWaterData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

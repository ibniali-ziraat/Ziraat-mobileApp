import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { useAuth } from "@/src/contexts/AuthContext";
import { useFileUploadMutation } from "@/src/hooks/useFileUpload";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";

import SoilTestReportsSection from "../form-sections/SoilTestReportsSection";
import {
  useCreateSoilTestReportMutation,
  useSoilTestReportQuery,
} from "../hooks/useSoilTestReport";
import { SoilTestReportSchema } from "../schemas/SoilTestReportSchema";

export default function SoilTestReportsScreen() {
  const { orchardProfileId } = useAuth();
  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: save, isPending: isSaving } =
    useCreateSoilTestReportMutation();

  // Fetch existing report URLs so we can merge, not overwrite
  const { data: existingData } = useSoilTestReportQuery(orchardProfileId);

  const form = useZodForm(SoilTestReportSchema);
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: any) => {
    try {
      // 1. Upload new files
      const newlyUploadedUrls: string[] = [];

      for (const file of values.reports || []) {
        if (file?.uri) {
          const uploadRes = await uploadFileAsync({
            file: {
              uri: file.uri,
              name: file.name || `soil-report-${Date.now()}.pdf`,
              mimeType: file.mimeType || "application/pdf",
            },
            UserType: "vendor",
            UserId: orchardProfileId.toString(),
            FileCategory: "documents",
          });

          const url = uploadRes?.data?.fileUrl;
          if (url) newlyUploadedUrls.push(url);
          console.log("[SoilTestReport] uploaded file →", url);
        }
      }

      // 2. Merge with existing URLs — never overwrite
      const existingUrls: string[] = existingData?.soilTestReportUrls ?? [];

      const mergedUrls = [...existingUrls, ...newlyUploadedUrls];

      console.log("[SoilTestReport] existing URLs →", existingUrls);
      console.log("[SoilTestReport] new URLs →", newlyUploadedUrls);
      console.log("[SoilTestReport] merged URLs →", mergedUrls);

      // 3. Patch with the full merged array
      const payload = {
        orchardProfileId,
        soilTestReportUrls: mergedUrls,
      };

      await save(payload);

      showSuccessToast("Reports uploaded successfully");
      router.dismiss();
    } catch (error: any) {
      console.warn("[SoilTestReport] upload error →", error);
      showErrorToast("Failed to upload reports");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Soil Test Reports" />

      <ScreenContent>
        <FormProvider {...form}>
          <SoilTestReportsSection errors={errors} />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.dismiss()}
            submitLabel="Upload All"
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving}
            loading={isSaving}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

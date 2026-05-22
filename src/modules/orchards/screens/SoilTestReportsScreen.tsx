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

const MAX_REPORTS = 3;

export default function SoilTestReportsScreen() {
  const { orchardProfileId } = useAuth();

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();

  const { mutateAsync: save, isPending: isSaving } =
    useCreateSoilTestReportMutation();

  // Existing uploaded reports
  const { data: existingData } = useSoilTestReportQuery(orchardProfileId);

  const existingUrls: string[] = existingData?.soilTestReportUrls ?? [];

  const uploadedReportsCount = existingUrls.length;

  const form = useZodForm(SoilTestReportSchema);

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: any) => {
    try {
      const newlyUploadedUrls: string[] = [];

      const remainingAllowed = MAX_REPORTS - uploadedReportsCount;

      // Prevent selecting more than allowed
      if ((values.reports?.length || 0) > remainingAllowed) {
        showErrorToast(
          `You can upload only ${remainingAllowed} more report${
            remainingAllowed > 1 ? "s" : ""
          }.`,
        );

        return;
      }

      // Upload files
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

          if (url) {
            newlyUploadedUrls.push(url);
          }
        }
      }

      // Merge existing + new
      const mergedUrls = [...existingUrls, ...newlyUploadedUrls];

      // Final safety validation
      if (mergedUrls.length > MAX_REPORTS) {
        showErrorToast("Only 3 soil test reports are allowed.");

        return;
      }

      await save({
        orchardProfileId,
        soilTestReportUrls: mergedUrls,
      });

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
          <SoilTestReportsSection
            errors={errors}
            uploadedReportsCount={uploadedReportsCount}
          />

          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.dismiss()}
            submitLabel="Upload"
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving}
            loading={isSaving}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

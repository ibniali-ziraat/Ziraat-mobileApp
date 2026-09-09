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
  const { orchardProfileId, profileData } = useAuth();

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
    const coreUserId = (profileData as any)?.coreUserId;

    if (!coreUserId) {
      showErrorToast("Your profile isn't loaded yet. Please try again.");
      return;
    }

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
            // UserType must be "supplier" (matches the file-upload
            // endpoint's expected value, same as the working profile-pic
            // upload) and UserId is the logged-in user's core user id —
            // this was previously sending "vendor" and the orchard's id
            // instead, which the backend rejects with 403.
            UserType: "supplier",
            UserId: coreUserId.toString(),
            FileCategory: "documents",
          });

          // /api/FileUpload/upload returns the URL as a plain string in
          // `data`, not `{ fileUrl }` — reading `.fileUrl` off a string is
          // always undefined, which is why nothing was ever making it into
          // soilTestReportUrls. Same extraction as the working profile-pic
          // upload, with the object-shape fallbacks kept for safety.
          const raw = uploadRes?.data;
          const url =
            typeof raw === "string"
              ? raw.trim()
              : (raw?.fileUrl ?? raw?.url ?? raw?.blobUrl ?? raw?.data);

          if (url && typeof url === "string") {
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

      // Merge onto the existing soil-water record instead of sending just
      // the URLs — the upload and the soil & water details share the same
      // endpoint, so attaching the URLs to the full record here keeps
      // whatever soil/water fields were already saved from that other
      // screen intact.
      await save({
        ...existingData,
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

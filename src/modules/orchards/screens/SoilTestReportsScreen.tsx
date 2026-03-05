import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast } from "@/src/utils/toast";

import { useAuth } from "@/src/contexts/AuthContext";
import { useFileUploadMutation } from "@/src/hooks/useFileUpload";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";

import SoilTestReportsSection from "../form-sections/SoilTestReportsSection";
import { useCreateSoilTestReportMutation } from "../hooks/useSoilTestReport";

export default function SoilTestReportsScreen() {
  const { orchardProfileId } = useAuth();
  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: save } = useCreateSoilTestReportMutation();

  const form = useZodForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: any) => {
    console.log(values, "valies in str");

    try {
      const uploadedFiles: string[] = [];

      for (const file of values.reports || []) {
        if (file?.uri) {
          console.log("existed file.uri");

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

          uploadedFiles.push(uploadRes?.data?.fileUrl);
          console.log(uploadedFiles, "uploaded files");
          console.log(uploadRes, "upload res...");
        }
      }
      const payload = {
        orchardProfileId,
        soilTestReportUrls: uploadedFiles,
      };

      await save(payload);

      // showSuccessToast("Reports uploaded successfully");
      // router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
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
            onCancel={() => router.replace(ROUTES.TABS.ORCHARDS)}
            submitLabel="Upload All"
            onSubmit={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

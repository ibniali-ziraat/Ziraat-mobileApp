import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useZodForm } from "@/src/hooks/useZodForm";

import { router } from "expo-router";
import { FormProvider } from "react-hook-form";

import { useAuth } from "@/src/contexts/AuthContext";
import { useFileUploadMutation } from "@/src/hooks/useFileUpload";

import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import SoilTestReportsSection from "../form-sections/SoilTestReportsSection";
import {
  useCreateSoilTestReportMutation,
  useDeleteSoilTestReportMutation,
  useSoilTestReportQuery,
} from "../hooks/useSoilTestReport";
import { SoilTestReportSchema } from "../schemas/SoilTestReportSchema";

export default function SoilTestReportsScreen() {
  const { orchardProfileId } = useAuth();

  const { data, refetch } = useSoilTestReportQuery(orchardProfileId);

  const { mutateAsync: createReport, isPending: creating } =
    useCreateSoilTestReportMutation();

  const { mutateAsync: deleteReport } = useDeleteSoilTestReportMutation();

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();

  const form = useZodForm(SoilTestReportSchema);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values: any) => {
    try {
      if (!values.file?.uri) return;

      const uploadRes = await uploadFileAsync({
        file: {
          uri: values.file.uri,
          name: values.file.name,
          mimeType: values.file.mimeType,
        },
        UserType: "vendor",
        UserId: orchardProfileId.toString(),
        FileCategory: "soil-test-reports",
      });

      const fileUrl = uploadRes?.data?.fileUrl;

      await createReport({
        orchardProfileId,
        fileUrl,
      });

      showSuccessToast("Report uploaded");

      reset();

      refetch();
    } catch (e) {
      showErrorToast("Upload failed");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteReport(id);

    showSuccessToast("Report deleted");

    refetch();
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Soil Test Reports"
        desc="Upload and manage reports"
        onPress={() => router.back()}
      />

      <ScreenContent>
        <FormProvider {...form}>
          <SoilTestReportsSection
            control={control}
            errors={errors}
            reports={data}
            onDelete={handleDelete}
          />

          <FormActions
            cancelLabel="Back"
            onCancel={() => router.back()}
            submitLabel="Upload"
            onSubmit={handleSubmit(onSubmit)}
            loading={creating}
            disabled={creating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useFileDeleteMutation,
  useFileUploadMutation,
} from "@/src/hooks/useFileUpload";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorLicenseMutation,
  useVendorLicenseQuery,
  useVendorLicenseUpdateMutation,
} from "../../../../hooks/vendorQueryHooks";

import { payload } from "@/src/types/payload.types";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import LicenseSection from "../sections/LicenseSection";

export default function LicenseScreen() {
  const { vendorProfileId } = useAuth();
  console.log(vendorProfileId, "vendooo");

  const { data } = useVendorLicenseQuery(vendorProfileId);
  const { mutateAsync: save, isPending: isSaving } = useVendorLicenseMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorLicenseUpdateMutation();

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: deleteFileAsync } = useFileDeleteMutation();

  // const form = useZodForm(licensingComplianceSchema);
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (key === "licenseCopyUrl" && typeof value === "string") {
        setValue("licenseCopyUrl", {
          uri: value,
          name: value.split("/").pop() || "License File",
          type: "application/octet-stream",
          isRemote: true,
        });
        return;
      }

      setValue(key as any, value);
    });
  }, [data]);

  // const onSubmit = async (values: payload) => {
  //   console.log(values, "vvv");

  //   try {
  //     let licenseCopyUrl;

  //     if (values.licenseCopyUrl) {
  //       const uploadRes = await uploadFileAsync({
  //         file: values.licenseCopyUrl,
  //         UserType: "supplier",
  //         UserId: vendorProfileId,
  //         FileCategory: "documents",
  //       });

  //       console.log(uploadRes.data.fileUrl, "uploadRes");

  //       licenseCopyUrl = uploadRes.data.fileUrl;
  //     }

  //     if (data) {
  //       const payload = {
  //         licensingId: data?.id,
  //         supplierProfileId: vendorProfileId,
  //         ...values,
  //         licenseCopyUrl,
  //       };
  //       await update(payload);
  //       showSuccessToast("License Updated");
  //     } else {
  //       const payload = {
  //         supplierProfileId: vendorProfileId,
  //         ...values,
  //         licenseCopyUrl,
  //       };
  //       await save(payload);
  //       showSuccessToast("License Saved!");
  //     }

  //     router.replace(ROUTES.AUTH.VENDOR_PROFILE);
  //   } catch (err) {
  //     console.error(err);
  //     showErrorToast("Error saving license");
  //   }
  // };

  const onSubmit = async (values: payload) => {
    let uploadedBlobName: string | null = null;

    try {
      let licenseCopyUrl = data?.licenseCopyUrl; // default to existing

      // ----------------------------------
      // 1. Upload file ONLY if new file
      // ----------------------------------
      if (values.licenseCopyUrl && !values.licenseCopyUrl.isRemote) {
        const uploadRes = await uploadFileAsync({
          file: values.licenseCopyUrl,
          UserType: "supplier",
          UserId: vendorProfileId,
          FileCategory: "documents",
        });

        licenseCopyUrl = uploadRes.data.fileUrl;

        // extract blob name from URL
        uploadedBlobName = licenseCopyUrl;
      }

      // ----------------------------------
      // 2. Save or update license
      // ----------------------------------
      if (data) {
        await update({
          licensingId: data.id,
          supplierProfileId: vendorProfileId,
          ...values,
          licenseCopyUrl,
        });

        showSuccessToast("License Updated");
      } else {
        await save({
          supplierProfileId: vendorProfileId,
          ...values,
          licenseCopyUrl,
        });

        showSuccessToast("License Saved!");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      console.error(err);
      if (uploadedBlobName) {
        try {
          await deleteFileAsync({ blobName: uploadedBlobName });
        } catch (deleteErr) {
          console.error("Failed to rollback uploaded file", deleteErr);
        }
      }

      showErrorToast("Error saving license");
    }
  };

  // const handleDeleteLicenseFile = async () => {
  //   const currentFile = form.getValues("licenseCopyUrl");

  //   if (!currentFile) return;

  //   try {
  //     if (currentFile.isRemote && typeof currentFile.uri === "string") {
  //       await deleteFileAsync({
  //         blobName: currentFile.uri,
  //       });
  //     }

  //     setValue("licenseCopyUrl", null);

  //     showSuccessToast("License file deleted");
  //   } catch (err) {
  //     console.error(err);
  //     showErrorToast("Failed to delete license file");
  //   }
  // };

  return (
    <ScreenLayout>
      <BackHeader
        title="Licensing & Compliance"
        desc="Enter your professional license details below."
        onPress={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <LicenseSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Add"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
          onCancel={() => router.back()}
        />
      </FormProvider>

      {/* <Button onPress={handleDeleteLicenseFile}>handleDeleteLicenseFile</Button> */}
    </ScreenLayout>
  );
}

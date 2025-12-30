import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorFinancialMutation,
  useVendorFinancialQuery,
  useVendorFinancialUpdateMutation,
} from "../../../../hooks/vendorQueryHooks";

import { financialPaymentSchema } from "@/src/modules/auth/vendor/schemas/finance.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import FinancialPaymentSection from "../sections/FinancialSection";
export default function FinancialScreen() {
  const { vendorProfileId, userId } = useAuth();

  const { data } = useVendorFinancialQuery(vendorProfileId);

  const { mutateAsync: save, isPending: isSaving } =
    useVendorFinancialMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorFinancialUpdateMutation();

  const form = useZodForm(financialPaymentSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    setValue("upiAvailable", data.upiAvailable ? "yes" : "no");
    setValue("creditFacility", data.creditFacility ? "yes" : "no");

    if (data.bankDetails) {
      setValue("bankDetails", {
        accountHolder: data.bankDetails.accountHolderName || "",
        accountNumber: data.bankDetails.accountNumber || "",
        ifsc: data.bankDetails.ifscCode || "",
        bankName: data.bankDetails.bankName || "",
        branchName: data.bankDetails.branchName || "",
      });
    }

    setValue("sellingViaZiraat", data.sellingViaZiraat || false);
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        supplierProfileId: vendorProfileId,
        upiAvailable: values.upiAvailable,
        creditFacility: values.creditFacility,
        sellingViaZiraat: values.sellingViaZiraat,
        bankDetails: values.sellingViaZiraat ? values.bankDetails : null,
      };

      if (data) {
        await update(payload);
        showSuccessToast("Financial Info Updated");
      } else {
        await save(payload);
        showSuccessToast("Financial Info Added ");
      }

      // showSuccessToast("Financial Info Saved!");
      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (error) {
      console.error("Error saving financial info:", error);
      showErrorToast(
        error?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Financial & Payment Details"
        desc="Provide your financial and payment details to ensure accurate and timely payments."
        onPress={() => router.push(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <FinancialPaymentSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Add"}
          onCancel={() => router.back()}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

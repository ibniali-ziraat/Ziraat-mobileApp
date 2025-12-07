import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorFinancialMutation,
  useVendorFinancialQuery,
  useVendorFinancialUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { financialPaymentSchema } from "@/src/schemas/vendor/finance.schema";
import { showErrorToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FinancialPaymentSection from "../sections/FinancialSection";
export default function FinancialScreen() {
  const { vendorData } = useGlobalData();
  const { data } = useVendorFinancialQuery(vendorData.profileId);

  const { mutateAsync: save } = useVendorFinancialMutation();
  const { mutateAsync: update } = useVendorFinancialUpdateMutation();

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
        supplierProfileId: vendorData.profileId,
        upiAvailable: values.upiAvailable === "yes",
        creditFacility: values.creditFacility === "yes",
        sellingViaZiraat: values.sellingViaZiraat,
        bankDetails: values.sellingViaZiraat ? values.bankDetails : null,
      };

      if (data) {
        await update(payload);
      } else {
        await save(payload);
      }

      Alert.alert("Financial Info Saved!");
      router.push("/auth/vendor/vendor-profile-screen");
    } catch (error) {
      console.error("Error saving financial info:", error);
      showErrorToast(
        error?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <ScrollView>
      <FormProvider {...form}>
        <FinancialPaymentSection errors={errors} control={control} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </FormProvider>
    </ScrollView>
  );
}

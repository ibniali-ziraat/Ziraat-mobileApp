import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorFinancialMutation,
  useVendorFinancialQuery,
  useVendorFinancialUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { financialPaymentSchema } from "@/src/schemas/vendor/finance.schema";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FinancialPaymentSection from "../sections/FinancialSection";
export default function FinancialScreen() {
  const { vendorId } = useAuth();
  const { data } = useVendorFinancialQuery(vendorId);

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

    // Transform boolean values into "yes"/"no" for SingleSelectInput
    setValue("upiAvailable", data.upiAvailable ? "yes" : "no");
    setValue("creditFacility", data.creditFacility ? "yes" : "no");

    // Prefill nested bankDetails object
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
    const payload = {
      supplierProfileId: vendorId,
      ...values,
    };

    data ? await update(payload) : await save(payload);
    Alert.alert("Financial Info Saved!");
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

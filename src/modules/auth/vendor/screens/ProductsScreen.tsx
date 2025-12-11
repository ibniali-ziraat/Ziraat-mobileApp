import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";

import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProductsMutation,
  useVendorProductsQuery,
  useVendorProductsUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { productPortfolioSchema } from "@/src/schemas/vendor/products.schema";
import { router } from "expo-router";
import ProductSection from "../sections/ProductSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

export default function ProductsScreen() {
  const { vendorData } = useGlobalData();

  // Fetch existing vendor products
  const { data } = useVendorProductsQuery(vendorData.profileId);

  const { mutateAsync: save, isPending: isSaving } =
    useVendorProductsMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorProductsUpdateMutation();

  // Initialize form with empty defaults
  const form = useZodForm(productPortfolioSchema);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // Prefill form when backend data arrives
  useEffect(() => {
    if (!data) return;

    setValue("storageCapacityValue", data.storageCapacityValue);
    // setValue("storageCapacityUnit", data.storageCapacityUnit);

    setValue("inputTypes", data.inputTypes?.map((i) => i.inputType) ?? []);
    setValue("majorBrands", data.majorBrands?.map((b) => b.brandName) ?? []);

    setValue(
      "customInputs",
      data.customInputs?.map((c) => ({
        productName: c.productName,
        stockQuantity: c.stockQuantity || "",
        unit: c.unit || null,
      })) ?? []
    );
  }, [data, setValue]);

  // Submit handler
  const onSubmit = async (values) => {
    console.log(values, "values...");

    const payload = {
      id: data?.id,
      supplierProfileId: vendorData.profileId,

      storageCapacity: `${values.storageCapacityValue}`,

      inputTypes: values.inputTypes, // <--- FIXED
      majorBrands: values.majorBrands, // <--- FIXED

      customInputs: values.customInputs.map((c) => ({
        id: c.id || 0,
        productName: c.productName,
        stockQuantity: c.stockQuantity,
        // unit: c.unit,
      })),
    };

    try {
      data ? await update(payload) : await save(payload);
      showSuccessToast("Products Saved!");
      router.push("/auth/vendor/vendor-profile-screen"); // navigate after saving
    } catch (error) {
      showErrorToast("Error saving products", error.message || "Unknown error");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Products & Services" />
      <FormProvider {...form}>
        <ProductSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={"Next"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

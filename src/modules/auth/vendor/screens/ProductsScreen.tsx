import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProductsMutation,
  useVendorProductsQuery,
  useVendorProductsUpdateMutation,
} from "../../../../hooks/vendorQueryHooks";

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { productPortfolioSchema } from "@/src/modules/auth/vendor/schemas/products.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import ProductSection from "../sections/ProductSection";

export default function ProductsScreen() {
  const { vendorProfileId, userId } = useAuth();

  // Fetch existing vendor products
  const { data } = useVendorProductsQuery(vendorProfileId);

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
      if (data) {
        await update({
          ...payload,
          id: data.id,
          supplierProfileId: vendorProfileId,
        });
        showSuccessToast("Products Updated");
      } else {
        await save({
          ...payload,
          supplierProfileId: vendorProfileId,
        });
        showSuccessToast("Products Added");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (error) {
      showErrorToast("Error saving products", error.message || "Unknown error");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Products & Services"
        desc="List the specific inputs you sell and the authorized brands you stock."
        onPress={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <ProductSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Add"}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => router.back()}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}

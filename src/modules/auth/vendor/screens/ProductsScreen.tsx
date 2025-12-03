import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";

import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProductsMutation,
  useVendorProductsQuery,
  useVendorProductsUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";

import { productPortfolioSchema } from "@/src/schemas/vendor/products.schema";
import ProductSection from "../sections/ProductSection";

export default function ProductsScreen() {
  const { vendorId } = useAuth();

  // Fetch existing vendor products
  const { data } = useVendorProductsQuery(vendorId);

  const { mutateAsync: save } = useVendorProductsMutation();
  const { mutateAsync: update } = useVendorProductsUpdateMutation();

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
    setValue("storageCapacityUnit", data.storageCapacityUnit);

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
      id: data.id,
      supplierProfileId: vendorId,

      storageCapacityValue: values.storageCapacityValue,
      storageCapacityUnit: values.storageCapacityUnit,

      // Convert string arrays back to backend objects
      inputTypes: values.inputTypes.map((name) => ({ inputType: name })),
      majorBrands: values.majorBrands.map((name) => ({ brandName: name })),

      customInputs: values.customInputs.map((c) => ({
        productName: c.productName,
        stockQuantity: c.stockQuantity,
        unit: c.unit,
      })),
    };

    try {
      data ? await update(payload) : await save(payload);
      Alert.alert("Products Saved!");
    } catch (error) {
      Alert.alert("Error saving products", error.message || "Unknown error");
    }
  };

  return (
    <FormProvider {...form}>
      <ProductSection errors={errors} control={control} />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}

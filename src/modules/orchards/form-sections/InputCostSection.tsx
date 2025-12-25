// StepH_InputCostDetails.js
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import {
  creditPeriodOptions,
  paymentTypeOptions,
  supplierLocationOptions,
} from "@/src/modules/orchards/schemas/InputCostDetailsSchema";
import { View } from "react-native";

export default function InputCostDetails({ control, errors }: any) {
  const supplierOptions = supplierLocationOptions.map((x) => ({
    label: x,
    value: x,
  }));

  const paymentOptions = paymentTypeOptions.map((x) => ({
    label: x,
    value: x,
  }));

  const creditOptions = creditPeriodOptions.map((x) => ({
    label: x,
    value: x,
  }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light  w-full">
        {/* 1️⃣ Pesticide Supplier Location */}
        <SingleSelectInput
          control={control}
          name="pesticideSupplierLocation"
          label="Pesticide Supplier Location"
          options={supplierOptions}
          error={errors.pesticideSupplierLocation?.message}
        />

        {/* 2️⃣ Payment Type */}
        <SingleSelectInput
          control={control}
          name="paymentType"
          label="Payment Type"
          options={paymentOptions}
          error={errors.paymentType?.message}
        />

        {/* 3️⃣ Credit Period */}
        <SingleSelectInput
          control={control}
          name="creditPeriod"
          label="Credit Period"
          options={creditOptions}
          error={errors.creditPeriod?.message}
        />
      </View>
    </View>
  );
}

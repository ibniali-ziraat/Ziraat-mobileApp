import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

import { View } from "react-native";
import {
  creditOptions,
  paymentOptions,
  supplierOptions,
} from "../constants/orchardOptions";

export default function InputCostDetails({ control, errors }: any) {
  return (
    <View className="flex-1 w-full">
      <View className="bg-light  w-full">
        <SingleSelectInput
          control={control}
          name="pesticideSupplierLocation"
          label="Supplier Location (optional)"
          placeholder="Supplier Location"
          options={supplierOptions}
          error={errors.pesticideSupplierLocation?.message}
          optional
        />

        <SingleSelectInput
          control={control}
          name="paymentType"
          label="Payment Type (optional)"
          placeholder="Select Payment Type"
          options={paymentOptions}
          error={errors.paymentType?.message}
          optional
        />

        <SingleSelectInput
          control={control}
          name="creditPeriod"
          label="Credit Period (optional)"
          placeholder="Select Credit Period"
          options={creditOptions}
          error={errors.creditPeriod?.message}
          optional
        />
      </View>
    </View>
  );
}

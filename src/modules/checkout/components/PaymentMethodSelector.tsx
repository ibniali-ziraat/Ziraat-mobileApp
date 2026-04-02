import DropdownSelectInput from "@/src/components/form/inputs/Dropdown";
import { View } from "react-native";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
}

export const PaymentMethodSelector = ({ options }: Props) => (
  <View className="mx-4 mt-4">
    <DropdownSelectInput
      name="paymentMethod"
      label="Payment Method"
      options={options}
    />
  </View>
);

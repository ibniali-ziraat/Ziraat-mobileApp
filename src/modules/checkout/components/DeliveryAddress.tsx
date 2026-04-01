import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

interface Address {
  contactName: string;
  addressLine1: string;
  cityName: string;
  stateOrProvinceName: string;
  zipCode: string;
}

interface Props {
  address: Address;
}

export const DeliveryAddress = ({ address }: Props) => (
  <View className="mx-4 rounded-2xl bg-white p-4">
    <Text
      style={typography.Poppins_s_bold}
      className="mb-2 text-lg text-neutral-900"
    >
      Deliver To
    </Text>
    <Text className="text-base font-semibold text-neutral-900">
      {address.contactName}
    </Text>
    <Text className="mt-1 text-sm text-neutral-700">
      {address.addressLine1}
    </Text>
    <Text className="text-sm text-neutral-700">
      {address.cityName}, {address.stateOrProvinceName}
    </Text>
    <Text className="text-sm text-neutral-600">{address.zipCode}</Text>
  </View>
);

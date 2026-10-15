import { cardTokens } from "@/src/constants/dashboardTheme";
import { profileArt } from "@/src/constants/iconArt";
import CheckoutSectionTitle from "./CheckoutSectionTitle";
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
  <View
    style={[
      {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: cardTokens.surface,
        borderRadius: cardTokens.radius,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: cardTokens.hairline,
        padding: 16,
      },
    ]}
  >
    <CheckoutSectionTitle title="Deliver To" art={profileArt.address} />

    <Text
      style={[
        typography.Poppins_s_semibold,
        { color: cardTokens.inkPrimary, fontSize: 16 },
      ]}
    >
      {address.contactName}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkSecondary, fontSize: 15.5, marginTop: 4 },
      ]}
    >
      {address.addressLine1}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkSecondary, fontSize: 15.5 },
      ]}
    >
      {address.cityName}, {address.stateOrProvinceName}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkMuted, fontSize: 15.5 },
      ]}
    >
      {address.zipCode}
    </Text>
  </View>
);

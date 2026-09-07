import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { MapPin } from "lucide-react-native";
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
        borderColor: cardTokens.border,
        padding: 16,
      },
      cardShadow,
    ]}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: chartTokens.tint,
          marginRight: 8,
        }}
      >
        <MapPin size={16} color={chartTokens.current} />
      </View>

      <Text
        style={[
          typography.Poppins_s_bold,
          { color: cardTokens.inkPrimary, fontSize: 17 },
        ]}
      >
        Deliver To
      </Text>
    </View>

    <Text
      style={[
        typography.Poppins_s_semibold,
        { color: cardTokens.inkPrimary, fontSize: 15 },
      ]}
    >
      {address.contactName}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkSecondary, fontSize: 13.5, marginTop: 4 },
      ]}
    >
      {address.addressLine1}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkSecondary, fontSize: 13.5 },
      ]}
    >
      {address.cityName}, {address.stateOrProvinceName}
    </Text>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkMuted, fontSize: 13.5 },
      ]}
    >
      {address.zipCode}
    </Text>
  </View>
);

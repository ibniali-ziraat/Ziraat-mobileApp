import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { colors } from "@/src/constants/colors";
import { Image, Text, View } from "react-native";

type Props = {
  errors: any;
};

export default function VerifyPhone({ errors }: Props) {
  return (
    <View>
      <View style={{ alignItems: "center", marginBottom: 15 }}>
        <Image
          source={require("@/assets/images/logo.jpeg")}
          style={{ width: 110, height: 90, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginTop: 16,
            color: colors.darkHover,
          }}
        >
          Verify your number
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: colors.neutral,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          We’ll send a verification code to your phone
        </Text>
      </View>

      <View
        style={{
          borderRadius: 30,
        }}
      >
        <FormTextInput
          name="mobileNumber"
          label="Phone Number"
          type="phone"
          required
          error={errors.mobileNumber}
        />
      </View>
    </View>
  );
}

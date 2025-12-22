// src/components/form/sections/OTPSection.tsx
import { View } from "react-native";
import { Text } from "react-native-paper";
import FormInput from "../../../../components/form/inputs/FormInput";

interface Props {
  control: any;
  errors: any;
  onResend?: () => void;
}

export default function OTPSection({ control, errors, onResend }: Props) {
  return (
    <View>
      <FormInput
        control={control}
        name="otp"
        label="Enter OTP"
        error={errors?.otp?.message}
        type="phone"
      />

      {onResend && (
        <Text
          onPress={onResend}
          style={{
            color: "blue",
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          Resend OTP
        </Text>
      )}
    </View>
  );
}

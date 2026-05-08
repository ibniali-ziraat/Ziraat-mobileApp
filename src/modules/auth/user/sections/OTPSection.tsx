// src/components/form/sections/OTPSection.tsx
import CsText from "@/src/components/shared/CsText";
import FormOtpInput from "@/src/components/shared/inputs/FormOtpInput";
import { View } from "react-native";

interface Props {
  control: any;
  errors: any;
  onResend?: () => void;
}

export default function OTPSection({ control, errors, onResend }: Props) {
  return (
    <View>
      <FormOtpInput
        control={control}
        name="otp"
        label="Enter OTP"
        error={errors?.otp?.message}
        type="phone"
      />

      {onResend && (
        <CsText
          onPress={onResend}
          style={{
            color: "blue",
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          Resend OTP
        </CsText>
      )}
    </View>
  );
}

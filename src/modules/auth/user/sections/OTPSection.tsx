// src/components/form/sections/OTPSection.tsx
import CsText from "@/src/components/shared/CsText";
import { View } from "react-native";
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

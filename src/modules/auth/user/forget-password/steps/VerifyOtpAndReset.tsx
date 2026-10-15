import FormOtpInput from "@/src/components/shared/inputs/FormOtpInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { colors } from "@/src/constants/colors";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  phoneNumber: string;
  timer: number;
  errors: any;
  onResendOtp?: () => void;
  isResending?: boolean;
};

export default function VerifyOtpAndReset({
  phoneNumber,
  timer,
  errors,
  onResendOtp,
  isResending = false,
}: Props) {
  return (
    <View>
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <Image
          source={require("@/assets/images/logo.jpeg")}
          style={{ width: 115, height: 100, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>
          Enter Verification Code
        </Text>
        <Text style={{ fontSize: 13, color: colors.neutral, marginTop: 4 }}>
          Sent to +91 {phoneNumber}
        </Text>
      </View>

      <View>
        <FormOtpInput name="otp" label="OTP Code" required />

        <FormTextInput
          name="newPassword"
          label="New Password"
          type="password"
          required
          error={errors.newPassword}
        />

        <FormTextInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          error={errors.confirmPassword}
        />
        <View style={{ alignItems: "center", marginTop: 12 }}>
          {timer > 0 ? (
            <Text style={{ color: colors.error, fontSize: 13 }}>
              Code expires in {timer}s
            </Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ color: colors.neutral, fontSize: 13, marginRight: 4 }}
              >
                Code expired.
              </Text>
              <Pressable onPress={onResendOtp} disabled={isResending}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: "600",
                    textDecorationLine: "underline",
                  }}
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

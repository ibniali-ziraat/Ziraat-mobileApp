import { colors } from "@/src/constants/colors";
import { maskValue } from "@/src/utils/mask";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import CsText from "./CsText";

interface OtpHeadingProps {
  title?: string;
  phone?: string;
  resendLabel?: string;
  onResend?: () => void;
  initialTimer?: number;
  disabled?: boolean;
}

export default function OtpHeading({
  title = "Confirm your number",
  phone,
  resendLabel = "Resend OTP",
  onResend,
  initialTimer = 60,
  disabled,
}: OtpHeadingProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimer);

  useEffect(() => {
    if (timeLeft === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isExpired = timeLeft === 0;

  const handleResend = () => {
    if (disabled) return;

    setTimeLeft(initialTimer);
    onResend?.();
  };

  return (
    <View style={{ marginBottom: 24 }}>
      {/* Title */}
      <CsText
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: colors.dark,
        }}
      >
        {title}
     </CsText>

      {/* Subtitle with masked number */}
      {phone && (
        <CsText
          style={{
            marginTop: 6,
            fontSize: 16,
            color: colors.neutral,
          }}
        >
          Enter the 6-digit code sent to {maskValue(phone, 2, 3)}
       </CsText>
      )}

      {/* Timer / Resend */}
      {!isExpired ? (
        <CsText
          style={{
            marginTop: 12,
            fontSize: 15,
            color: colors.darkHover,
          }}
        >
          Code expires in{" "}
          <CsText style={{ fontWeight: "600", color: colors.dark }}>
            {minutes}:{seconds.toString().padStart(2, "0")}
         </CsText>
       </CsText>
      ) : (
        <View style={{ marginTop: 12, flexDirection: "row" }}>
          <CsText style={{ fontSize: 15, color: colors.neutral }}>
            Didn’t receive the code?{" "}
         </CsText>
          <Pressable onPress={handleResend}>
            <CsText
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              {resendLabel}
           </CsText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors } from "@/src/constants/colors";
import { maskValue } from "@/src/utils/mask";

interface OtpHeadingProps {
  title?: string;
  phone?: string;
  resendLabel?: string;
  onResend?: () => void;
  initialTimer?: number;
}

export default function OtpHeading({
  title = "Confirm your number",
  phone,
  resendLabel = "Resend OTP",
  onResend,
  initialTimer = 300,
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

  return (
    <View style={{ marginBottom: 24 }}>
      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: colors.dark,
        }}
      >
        {title}
      </Text>

      {/* Subtitle with masked number */}
      {phone && (
        <Text
          style={{
            marginTop: 6,
            fontSize: 14,
            color: colors.neutral,
          }}
        >
          Enter the 6-digit code sent to {maskValue(phone, 2, 3)}
        </Text>
      )}

      {/* Timer / Resend */}
      {!isExpired ? (
        <Text
          style={{
            marginTop: 12,
            fontSize: 13,
            color: colors.darkHover,
          }}
        >
          Code expires in{" "}
          <Text style={{ fontWeight: "600", color: colors.dark }}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </Text>
        </Text>
      ) : (
        <View style={{ marginTop: 12, flexDirection: "row" }}>
          <Text style={{ fontSize: 13, color: colors.neutral }}>
            Didn’t receive the code?{" "}
          </Text>
          <Pressable onPress={onResend}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              {resendLabel}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

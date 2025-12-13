import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors } from "@/src/constants/colors";

interface OtpHeadingProps {
  title?: string;
  subtitle?: string;
  resendLabel?: string;
  onResend?: () => void;
  initialTimer?: number;
}

export default function OtpHeading({
  title = "Confirm your number",
  subtitle = "Enter the 6-digit code we sent to your phone",
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
    <View className="mb-6">
      {/* Title */}
      <Text className="text-2xl font-semibold" style={{ color: colors.dark }}>
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        className="mt-2 text-md leading-5"
        style={{ color: colors.neutral }}
      >
        {subtitle}
      </Text>

      {/* Timer / Resend */}
      <View className="mt-4 flex-row items-center justify-between">
        {!isExpired ? (
          /* Expiry Timer */
          <Text className="text-sm" style={{ color: colors.neutral }}>
            Code expires in{" "}
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </Text>
          </Text>
        ) : (
          /* Resend CTA */
          <View className="flex-row items-center">
            <Text className="text-sm mr-2" style={{ color: colors.neutral }}>
              Didn’t receive the code?
            </Text>

            <Pressable onPress={onResend}>
              <Text
                className="text-sm font-medium"
                style={{ color: colors.primary }}
              >
                {resendLabel}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

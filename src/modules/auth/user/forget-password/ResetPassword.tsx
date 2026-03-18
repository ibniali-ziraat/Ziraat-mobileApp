import { useState } from "react";


import VerifyOtpReset from "./steps/VerifyOtpReset";

import NewPassword from "./steps/NewPassword";

export default function ResetPasswordScreen() {

  const [step, setStep] = useState<"phone" | "reset">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (step === "phone") {
    return (
      <NewPassword
        onNext={(phone: string) => {
          setPhoneNumber(phone);
          setStep("reset");
        }}
      />
    );
  }

  return (
    <VerifyOtpReset
      phoneNumber={phoneNumber}
    />
  );
}
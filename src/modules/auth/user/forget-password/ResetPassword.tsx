
import { useState } from "react";
import NewPassword from "./steps/NewPassword";
import VerifyOtp from "./steps/VerifyOTP";
import VerifyPhone from "./steps/VerifyPhone";



export default function ResetPasswordScreen() {

    const [step, setStep] = useState<"phone" | "otp" | "reset">("phone");
    const [phoneNumber, setPhoneNumber] = useState("");

    if (step === "phone") {
        return (
            <VerifyPhone
                onNext={(phone: string) => {
                    setPhoneNumber(phone);
                    setStep("otp");
                }}
            />
        );
    }

    if (step === "otp") {
        return (
            <VerifyOtp
                phoneNumber={phoneNumber}
                onVerified={() => setStep("reset")}
            />
        );
    }

    return <NewPassword phoneNumber={phoneNumber} />;
}


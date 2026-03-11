
import { colors } from "@/src/constants/colors";
import { View } from "react-native";

export default function StepIndicator({ step }: any) {

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
            }}
        >
            {["phone", "otp", "reset"].map((s) => (
                <View
                    key={s}
                    style={{
                        height: 4,
                        width: step === s ? 38 : 38,
                        borderRadius: 10,
                        backgroundColor: step === s ? colors.primary : "#E5E7EB",
                        marginHorizontal: 6,
                    }}
                />
            ))}
        </View>
    );
}


import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { View } from "react-native";

export default function SettlementLogRow({ log }) {
  const color =
    log.status === "Paid"
      ? colors.primaryHover
      : log.status === "Failed"
      ? colors.error
      : colors.secondaryHover;

  return (
    <View
      className="flex-row justify-between py-2 border-b"
      style={{ borderColor: colors.neutral }}
    >
      <CsText style={{ color: colors.dark }}>{log.date}</CsText>

      <CsText style={{ color: colors.primaryHover, fontWeight: "bold" }}>
        ₹{log.amount.toLocaleString()}
     </CsText>

      <CsText style={{ color, fontWeight: "600" }}>{log.status}</CsText>

      <CsText style={{ color: colors.darkHover, fontSize: 12 }}>{log.mode}</CsText>
    </View>
  );
}

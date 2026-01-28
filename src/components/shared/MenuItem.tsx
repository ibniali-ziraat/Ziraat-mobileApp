import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Pressable } from "react-native";
import CsText from "./CsText";

export default function MenuItem({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="py-3 "
      style={{ borderBottomWidth: 0.2, borderBottomColor: colors.cardShadow }}
    >
      <CsText style={[typography.Poppins_m_medium]} className=" text-black">
        {label}
      </CsText>
    </Pressable>
  );
}

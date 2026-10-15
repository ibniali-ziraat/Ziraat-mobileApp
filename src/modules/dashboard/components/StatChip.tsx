import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

export default function StatChip({
  Icon,
  title,
  value,
}: any) {
  return (
    <View
      style={[{
        width: "31%",
        height: 130,
        backgroundColor: colors.light,
        borderRadius: 16,
       
        borderColor: colors.neutral,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
      },shadows.profile_card]}
    >
      {/* ICON */}
      {Icon && (
        <Icon
          size={34}
          color={colors.secondary}
          strokeWidth={1.3}
          style={{ marginBottom: 6 }}
        />
      )}

      {/* TITLE */}
      <CsText
        className="text-[14px] text-center"
        style={{ color: colors.dark }}
      >
        {title}
      </CsText>

      {/* VALUE */}
      <CsText
        variant="semiBoldcaption"
        className="text-center mt-1"
      >
        {value}
      </CsText>
    </View>
  );
}
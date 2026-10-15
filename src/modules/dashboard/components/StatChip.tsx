import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
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
       
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      },
      ]}
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
        className="text-[12px] text-center"
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
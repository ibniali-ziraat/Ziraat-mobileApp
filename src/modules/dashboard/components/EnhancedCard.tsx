import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

export default function EnhancedCard({ title, value, accent, icon }) {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: colors.light,
          borderRadius: 16,
          borderColor: colors.neutral,
          paddingVertical: 12,
          paddingHorizontal: 10,
          height: 130,
          alignItems: "center",
          justifyContent: "space-between",
        },
        shadows.profile_card,
      ]}
    >
      {/* Icon */}
      {icon && <View>{icon}</View>}

      {/* Title */}
      <CsText
        style={[typography.Poppins_s_medium, { fontSize: 14, textAlign: "center", color: colors.dark }]}
      >
        {title}
      </CsText>

      {/* Value + Accent */}
      <View className="items-center">
        {value && (
          <CsText
            style={[
              typography.Poppins_m_regular,
              { fontSize: 18, color: colors.primary, textAlign: "center" },
            ]}
          >
            {value}
          </CsText>
        )}

        {accent && (
          <CsText
            style={{ fontSize: 14, marginTop: 4, color: colors.dark, textAlign: "center" }}
          >
            {accent}
          </CsText>
        )}
      </View>
    </View>
  );
}
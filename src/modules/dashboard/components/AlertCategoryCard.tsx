import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

export default function AlertCategoryCard({
  icon,
  title,
  value,
  subtitle,
}: any) {
  return (
    <View style={{ width: "48%", marginBottom: 16 }}>
      <View
        style={[
          {
            width: "100%",
            minHeight: 150,
            backgroundColor: colors.light,
            borderRadius: 16,
          
            borderColor: colors.neutral,
            paddingVertical: 16,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          },
          shadows.profile_card,
        ]}
      >
        {/* ICON */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bgColor,
            marginBottom: 2,
          }}
        >
          {icon}
        </View>

        {/* TITLE */}
        <CsText
          style={[
            typography.Poppins_m_semibold,
            {
              fontSize: 14,
              color: colors.dark,
              textAlign: "center",
            },
          ]}
          numberOfLines={2}
        >
          {title}
        </CsText>

        {/* VALUE */}
        {value && (
          <CsText
            style={[
              typography.Poppins_l_semibold,
              {
                fontSize: 22,
                color: colors.dark,
                textAlign: "center",
              },
            ]}
          >
            {value}
          </CsText>
        )}

        {/* SUBTITLE */}
        {subtitle && (
          <CsText
            style={[
              typography.Poppins_s_medium,
              {
                fontSize: 12,
                color: colors.neutral,
                textAlign: "center",
              },
            ]}
            numberOfLines={2}
          >
            {subtitle}
          </CsText>
        )}
      </View>
    </View>
  );
}
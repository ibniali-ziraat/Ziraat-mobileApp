import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

const StatTile = ({ title, value, footer, icon }) => {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: colors.light,
          borderRadius: 16,
        
          borderColor: colors.neutral,
          paddingHorizontal: 12,
          paddingVertical: 12,
          marginBottom: 6,
        },
        shadows.profile_card,
      ]}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          height: 200,
        }}
      >
        {/* Icon */}
        {icon && (
          <View
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: colors.bgColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </View>
        )}

        {/* Title */}
        <CsText
          style={[
            typography.Poppins_s_medium,
            { fontSize: 14, color: colors.dark, textAlign: "center" },
          ]}
        >
          {title}
        </CsText>

        {/* Value */}
        <CsText
          style={{
            fontSize: 18,
            color: colors.dark,
            textAlign: "center",
          }}
        >
          {value}
        </CsText>

        {/* Footer */}
        {footer && (
          <CsText
            style={[
              typography.Poppins_m_regular,
              { fontSize: 14, color: colors.neutral, textAlign: "center" },
            ]}
          >
            {footer}
          </CsText>
        )}
      </View>
    </View>
  );
};

export default StatTile;
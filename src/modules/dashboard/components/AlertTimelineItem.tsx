import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

export default function AlertTimelineItem({
  icon,
  message,
  time,
}: any) {
  return (
    <View style={{ width: "48%", height: 220, marginBottom: 12 }}>
      <View
        style={[
          {
            width: "100%",
            height: "100%",
            backgroundColor: colors.light,
            borderRadius: 16,
           
            borderColor: colors.neutral,
            paddingVertical: 18,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "space-between",
          },
          shadows.profile_card,
        ]}
      >
        {/* ICON */}
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bgColor,
            
            borderColor: colors.neutral,
          }}
        >
          {icon}
        </View>

        {/* MESSAGE */}
        <CsText
          style={[
            typography.Poppins_m_semibold,
            {
              fontSize: 15,
              color: colors.dark,
              textAlign: "center",
              lineHeight: 20,
            },
          ]}
          numberOfLines={3}
        >
          {message}
        </CsText>

        {/* TIME */}
        <CsText
          style={[
            typography.Poppins_s_medium,
            {
              fontSize: 13,
              color: colors.neutral,
              textAlign: "center",
            },
          ]}
        >
          {time}
        </CsText>
      </View>
    </View>
  );
}
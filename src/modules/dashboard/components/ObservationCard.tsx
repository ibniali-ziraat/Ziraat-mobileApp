import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";

type ObservationCardProps = {
  title: string;
  description: string;
  recommended?: string;
};

const ObservationCard = ({
  title,
  description,
  recommended,
}: ObservationCardProps) => {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: colors.light,
          borderRadius: 16,
         
          borderColor: colors.neutral,
          paddingHorizontal: 14,
          paddingVertical: 14,
          marginBottom: 10,
        },
        shadows.profile_card,
      ]}
    >
      <View style={{ gap: 8 }}>
        {/* Title */}
        <CsText
          style={[
            typography.Poppins_m_semibold,
            { fontSize: 18, color: colors.dark },
          ]}
        >
          {title}
        </CsText>

        {/* Description */}
        <CsText
          style={{
            color: colors.neutral,
            lineHeight: 22,
          }}
        >
          {description}
        </CsText>

        {/* Recommendation */}
        {recommended && (
          <CsText
            style={{
              fontSize: 14,
              color: colors.primary,
              marginTop: 4,
            }}
          >
            <CsText style={{ fontWeight: "600" }}>Recommended: </CsText>
            {recommended}
          </CsText>
        )}
      </View>
    </View>
  );
};

export default ObservationCard;
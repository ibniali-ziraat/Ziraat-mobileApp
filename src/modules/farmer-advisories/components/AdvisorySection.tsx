import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

type AdvisorySectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

// titled white card used on the detail and form screens
export default function AdvisorySection({
  title,
  description,
  children,
}: AdvisorySectionProps) {
  return (
    <View
      style={[
        {
          padding: cardTokens.padding,
          marginBottom: 16,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          backgroundColor: cardTokens.surface,
        },
        cardShadow,
      ]}
    >
      <Text
        style={[
          typography.Poppins_m_semibold,
          { color: cardTokens.inkPrimary },
        ]}
      >
        {title}
      </Text>
      {!!description && (
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, marginTop: 2 },
          ]}
        >
          {description}
        </Text>
      )}
      <View style={{ marginTop: 14 }}>{children}</View>
    </View>
  );
}

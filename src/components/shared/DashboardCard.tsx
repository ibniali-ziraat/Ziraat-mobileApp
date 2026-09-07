import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";

type DashboardCardProps = {
  children: ReactNode;
  style?: ViewStyle;
  padded?: boolean;
};

export default function DashboardCard({
  children,
  style,
  padded = true,
}: DashboardCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          padding: padded ? cardTokens.padding : 0,
        },
        cardShadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

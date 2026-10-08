import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

type AdvisoryEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

// empty list, load error and "not found" states
export default function AdvisoryEmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
}: AdvisoryEmptyStateProps) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 48, paddingHorizontal: 24 }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: chartTokens.tint,
          marginBottom: 14,
        }}
      >
        <Icon size={28} color={colors.primary} strokeWidth={1.8} />
      </View>

      <Text
        style={[
          typography.Poppins_m_semibold,
          { color: cardTokens.inkPrimary, textAlign: "center" },
        ]}
      >
        {title}
      </Text>

      {!!message && (
        <Text
          style={[
            typography.Poppins_s_regular,
            { color: cardTokens.inkMuted, textAlign: "center", marginTop: 4 },
          ]}
        >
          {message}
        </Text>
      )}

      {!!actionLabel && !!onAction && (
        <Pressable onPress={onAction} hitSlop={8} style={{ marginTop: 14 }}>
          <Text style={[typography.Poppins_s_semibold, { color: colors.primary }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

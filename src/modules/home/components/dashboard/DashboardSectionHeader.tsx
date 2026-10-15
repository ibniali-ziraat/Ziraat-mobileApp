import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";

type DashboardSectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  /**
   * Space above the header. The default separates one section from the one
   * before it; the first header on a screen has nothing to separate from and
   * should sit close under the app header instead.
   */
  topSpacing?: number;
  /** Full-colour badge from `homeArt`, shown before the title. */
  art?: string;
};

export default function DashboardSectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  topSpacing = 26,
  art,
}: DashboardSectionHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: art ? "center" : "flex-end",
        justifyContent: "space-between",
        marginTop: topSpacing,
        marginBottom: 12,
      }}
    >
      {art ? (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <SvgXml xml={art} width={26} height={26} />
        </View>
      ) : null}

      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text
          style={[
            typography.Poppins_m_semibold,
            { color: cardTokens.inkPrimary, fontSize: 18 },
          ]}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 2 },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          hitSlop={10}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: chartTokens.current },
            ]}
          >
            {actionLabel}
          </Text>
          <ChevronRight size={15} color={chartTokens.current} />
        </Pressable>
      ) : null}
    </View>
  );
}

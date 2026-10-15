import IconBadge, { type BadgeTone } from "@/src/components/shared/IconBadge";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

type Props = {
  title: string;
  value?: string;
  accent?: string;
  icon: LucideIcon;
  tone: BadgeTone;
};

/**
 * One metric: the number leads, the label sits quietly under it — read the
 * figure first, like an Airbnb listing stat.
 */
export default function EnhancedCard({
  title,
  value,
  accent,
  icon,
  tone,
}: Props) {
  return (
    <View
      style={{
        width: "100%",
        padding: 14,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: cardTokens.surface,
      }}
    >
      <IconBadge icon={icon} tone={tone} size={32} />

      {value ? (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            typography.Poppins_l_semibold,
            { color: cardTokens.inkPrimary, marginTop: 12 },
          ]}
        >
          {value}
        </Text>
      ) : null}

      <Text
        numberOfLines={2}
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkMuted, marginTop: 2 },
        ]}
      >
        {title}
      </Text>

      {accent ? (
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkSecondary, marginTop: 2 },
          ]}
        >
          {accent}
        </Text>
      ) : null}
    </View>
  );
}

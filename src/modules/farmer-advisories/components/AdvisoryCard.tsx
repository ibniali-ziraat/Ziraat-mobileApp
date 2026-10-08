import { Pressable } from "@/src/components/shared/Pressable";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { CalendarClock, ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { isSupportedKind, KIND_META } from "../constants/advisoryOptions";
import type { AdvisoryListItem } from "../services/farmeradvisories.service";
import { formatWindow, getAdvisoryStatus } from "../utils/advisoryStatus";
import AdvisoryKindIcon from "./AdvisoryKindIcon";
import AdvisoryStatusBadge from "./AdvisoryStatusBadge";

type AdvisoryCardProps = {
  advisory: AdvisoryListItem;
  onPress: () => void;
};

export default function AdvisoryCard({ advisory, onPress }: AdvisoryCardProps) {
  const status = getAdvisoryStatus(advisory);
  const kindLabel = isSupportedKind(advisory.kind)
    ? KIND_META[advisory.kind].label
    : advisory.kind;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          padding: cardTokens.padding,
          marginBottom: 12,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.hairline,
          backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
        },
        cardShadow,
      ]}
    >
      <AdvisoryKindIcon kind={advisory.kind} />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary, flex: 1, marginRight: 8 },
            ]}
          >
            {advisory.title}
          </Text>
          <AdvisoryStatusBadge status={status} />
        </View>

        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkSecondary, marginTop: 2 },
          ]}
        >
          {kindLabel}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
          <CalendarClock size={13} color={cardTokens.inkMuted} />
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginLeft: 5, fontSize: 11 },
            ]}
          >
            {formatWindow(advisory.windowStart, advisory.windowEnd)}
          </Text>
        </View>
      </View>

      <ChevronRight
        size={18}
        color={cardTokens.inkMuted}
        style={{ marginLeft: 6 }}
      />
    </Pressable>
  );
}

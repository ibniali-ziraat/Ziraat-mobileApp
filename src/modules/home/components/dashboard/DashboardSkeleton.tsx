import Skeleton from "@/src/components/shared/HomeSkelton";
import { View } from "react-native";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";

function CardShell({ height }: { height: number }) {
  return (
    <View
      style={[
        {
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderWidth: 1,
          borderColor: cardTokens.hairline,
          padding: cardTokens.padding,
          gap: 12,
        },
        cardShadow,
      ]}
    >
      <Skeleton width="52%" height={14} />
      <Skeleton width="34%" height={10} />
      <Skeleton width="100%" height={height} borderRadius={14} />
    </View>
  );
}

export default function DashboardSkeleton() {
  return (
    <View style={{ gap: 12, marginTop: 20 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <CardShell height={70} />
        </View>
        <View style={{ flex: 1 }}>
          <CardShell height={70} />
        </View>
      </View>

      <CardShell height={170} />
      <CardShell height={140} />
    </View>
  );
}

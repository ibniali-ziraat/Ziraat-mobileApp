import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { CheckCircle2 } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";

interface ProductListFooterProps {
  isFetchingMore: boolean;
  hasMore: boolean;
  productCount: number;
}

export function ProductListFooter({
  isFetchingMore,
  hasMore,
  productCount,
}: ProductListFooterProps) {
  if (isFetchingMore) {
    return (
      <View style={{ paddingVertical: 24, alignItems: "center" }}>
        <ActivityIndicator size="small" color={chartTokens.current} />
      </View>
    );
  }

  if (!hasMore && productCount > 0) {
    return (
      <View
        style={{
          paddingVertical: 24,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <CheckCircle2 size={14} color={cardTokens.inkMuted} />
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 12.5 },
          ]}
        >
          You've reached the end
        </Text>
      </View>
    );
  }

  return null;
}

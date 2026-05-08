import { colors } from "@/src/constants/colors";
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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasMore && productCount > 0) {
    return (
      <View style={{ paddingVertical: 24, alignItems: "center" }}>
        <Text style={{ color: colors.neutral, fontSize: 13 }}>
          No more products
        </Text>
      </View>
    );
  }

  return null;
}

interface ProductListEmptyProps {
  isLoading: boolean;
}

export function ProductListEmpty({ isLoading }: ProductListEmptyProps) {
  if (isLoading) {
    return (
      <View style={{ paddingVertical: 60, alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 60, alignItems: "center" }}>
      <Text style={{ color: colors.neutral }}>No products found.</Text>
    </View>
  );
}

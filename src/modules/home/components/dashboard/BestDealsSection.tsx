import { ROUTES } from "@/src/constants/routes";
import { useBestDeals } from "@/src/modules/products/hooks/queries/products.queries";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import DashboardSectionHeader from "./DashboardSectionHeader";
import ProductMiniCard from "./ProductMiniCard";

type BestDeal = {
  vendorProductId: string | number;
  productId: string | number;
  productName?: string;
  discountedPrice?: number | null;
  originalPrice?: number;
  savingsAmount?: number;
  savingsPercentage?: number;
  thumbnail?: string;
};

export default function BestDealsSection() {
  const { data, isLoading } = useBestDeals();

  const deals: BestDeal[] = Array.isArray(data?.deals) ? data.deals : [];

  if (isLoading || deals.length === 0) return null;

  return (
    <View style={{ marginTop: 14 }}>
      <DashboardSectionHeader
        title="Best deals"
        subtitle="Steep discounts across vendors"
        actionLabel="Shop"
        onAction={() => router.push(ROUTES.TABS.PRODUCTS)}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
      >
        {deals.map((deal) => {
          const price = deal.discountedPrice || deal.originalPrice || 0;
          const badgeLabel =
            deal.savingsPercentage && deal.savingsPercentage > 0
              ? `${Math.round(deal.savingsPercentage)}% OFF`
              : null;
          const footNote =
            deal.savingsAmount && deal.savingsAmount > 0
              ? `You save ₹${Math.round(deal.savingsAmount)}`
              : undefined;

          return (
            <ProductMiniCard
              key={String(deal.vendorProductId)}
              productId={deal.productId}
              name={deal.productName || "Product"}
              thumbnail={deal.thumbnail}
              price={price}
              originalPrice={deal.originalPrice}
              badgeLabel={badgeLabel}
              footNote={footNote}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

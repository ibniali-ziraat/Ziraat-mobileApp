import { homeArt } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { useTrendingProducts } from "@/src/modules/products/hooks/queries/products.queries";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import DashboardSectionHeader from "./DashboardSectionHeader";
import ProductMiniCard from "./ProductMiniCard";

type TrendingProduct = {
  productId: string | number;
  productName?: string;
  lowestPrice?: number;
  originalPrice?: number;
  vendorCount?: number;
  totalStock?: number;
  thumbnail?: string;
};

export default function TrendingProductsSection() {
  const { data, isLoading } = useTrendingProducts();

  const products: TrendingProduct[] = Array.isArray(data?.products)
    ? data.products
    : [];

  if (isLoading || products.length === 0) return null;

  return (
    <View style={{ marginTop: 14 }}>
      <DashboardSectionHeader
        title="Trending now"
        art={homeArt.trending}
        subtitle="Popular with farmers right now"
        actionLabel="Shop"
        onAction={() => router.push(ROUTES.TABS.PRODUCTS)}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -6 }}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 6,
          paddingTop: 4,
          paddingBottom: 12,
        }}
      >
        {products.map((product) => {
          const price = product.lowestPrice || product.originalPrice || 0;
          const footNote =
            product.vendorCount && product.totalStock
              ? `${product.vendorCount} ${product.vendorCount === 1 ? "vendor" : "vendors"} · ${product.totalStock} in stock`
              : undefined;

          return (
            <ProductMiniCard
              key={String(product.productId)}
              productId={product.productId}
              name={product.productName || "Product"}
              thumbnail={product.thumbnail}
              price={price}
              originalPrice={product.originalPrice}
              footNote={footNote}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

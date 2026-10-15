import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { productArt } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { useUserOrders } from "@/src/modules/checkout/hooks/UseOders";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import DashboardSectionHeader from "../dashboard/DashboardSectionHeader";

/** Server money is a number or a "¤12.00" string (.NET invariant culture). */
const formatRs = (value: unknown) =>
  value === null || value === undefined || value === ""
    ? null
    : `₹${String(value).replace(/[$¤₹]/g, "").trim()}`;

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : null;

/** Status → text colour: green done, blue on the way, red failed, amber otherwise. */
const statusColor = (status?: string) => {
  if (!status) return cardTokens.inkMuted;
  if (/cancel|reject|fail|return/i.test(status)) return "#C0392B";
  if (/deliver|complete/i.test(status)) return colors.primary;
  if (/ship|dispatch|transit|out for/i.test(status)) return "#1D64A8";
  return "#B26100";
};

/** The most recent order, with its live status. Hidden when there are none. */
export default function LatestOrderCard() {
  const { data } = useUserOrders();
  const [imageFailed, setImageFailed] = useState(false);

  const latest = useMemo(() => {
    const orders: any[] = Array.isArray(data) ? data : [];
    return [...orders].sort(
      (a, b) =>
        new Date(b?.createdOn ?? 0).getTime() -
          new Date(a?.createdOn ?? 0).getTime() ||
        Number(b?.id ?? 0) - Number(a?.id ?? 0),
    )[0];
  }, [data]);

  if (!latest) return null;

  const items: any[] = latest.orderItems ?? [];
  const first = items[0];
  const count = items.reduce((sum, item) => sum + (item?.quantity ?? 1), 0);
  const status: string | undefined = latest.orderStatusString;
  const statusInk = statusColor(status);
  const total = formatRs(latest.orderTotal ?? latest.totalAmount);
  const meta = [
    `#${latest.id}`,
    formatDate(latest.createdOn),
    count ? `${count} ${count === 1 ? "item" : "items"}` : null,
    total,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <View>
      <DashboardSectionHeader
        title="Latest order"
        actionLabel="See all"
        onAction={() => router.push(ROUTES.ORDERS.LIST as any)}
      />

      <Pressable
        onPress={() =>
          router.push({
            pathname: ROUTES.ORDERS.DETAILS as any,
            params: { orderId: latest.id },
          })
        }
        accessibilityRole="button"
        accessibilityLabel={`Order ${latest.id}, ${status ?? ""}`}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          backgroundColor: pressed
            ? cardTokens.mutedSurface
            : cardTokens.surface,
        })}
      >
        {first?.thumbnailImage && !imageFailed ? (
          <Image
            source={{ uri: first.thumbnailImage }}
            onError={() => setImageFailed(true)}
            style={{ width: 48, height: 48 }}
            resizeMode="contain"
          />
        ) : (
          <SvgXml xml={productArt.other} width={48} height={48} />
        )}

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary },
            ]}
          >
            {first?.productName ?? `Order #${latest.id}`}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 1 },
            ]}
          >
            {meta}
          </Text>
          {status ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  marginRight: 6,
                  backgroundColor: statusInk,
                }}
              />
              <Text
                style={[typography.Poppins_xs_medium, { color: statusInk }]}
              >
                {status}
              </Text>
            </View>
          ) : null}
        </View>

        <ChevronRight size={18} color={cardTokens.inkMuted} />
      </Pressable>
    </View>
  );
}

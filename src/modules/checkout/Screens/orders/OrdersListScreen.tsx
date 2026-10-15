import ArtStrip from "@/src/components/shared/ArtStrip";
import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  getOrderStatusArt,
  menuArt,
  orderArt,
  productArt,
  statIcons,
} from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import OrderStatusTabs from "../../components/OrderStatusTabs";
import { useOrderStatuses } from "../../hooks/orderStatusQueryHooks";
import { useUserOrders } from "../../hooks/UseOders";
import OrderFilterModal from "./OrderFilterModal";

const baseCard = {
  backgroundColor: colors.light,
  borderRadius: 20,
  padding: 14,
  marginBottom: 14,
};

// ✅ "ALANTO ® - 10KG" + productName "ALANTO ®"  ->  "10KG"
const getVariationLabel = (item: any) => {
  const variation = item?.variationName?.trim();
  if (!variation) return null;

  const product = item?.productName?.trim() ?? "";
  if (product && variation.toLowerCase().startsWith(product.toLowerCase())) {
    const rest = variation
      .slice(product.length)
      .replace(/^[\s\-–—:|/]+/, "")
      .trim();
    return rest || null;
  }
  return variation;
};

const OrdersListScreen = () => {
  const { data, isLoading } = useUserOrders();
  const { data: statuses = [] } = useOrderStatuses(); // ✅ for badge label lookup
  const orders = data || [];

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  // Add this helper inside the component (or outside)
  const getTotalQuantity = (orderItems: any[]) => {
    return (
      orderItems?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) ?? 0
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  // ✅ Look up name from API data, no hardcoded map
  const getStatusName = (statusId: number) => {
    return statuses.find((s) => s.id === statusId)?.name ?? "Unknown";
  };

  const handleOrderPress = (order: any) => {
    router.push({
      pathname: ROUTES.ORDERS.DETAILS,
      params: { orderId: order.id },
    });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const firstProduct = order.orderItems?.[0];
      const matchesSearch =
        !search ||
        order.id.toString().includes(search) ||
        firstProduct?.productName?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        selectedStatus === null || order.orderStatus === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedStatus]);

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  if (!orders.length) {
    return (
      <ScreenLayout>
        <BackHeader title="My Orders" desc="Track and manage your orders" />
        <View className="flex-1 items-center justify-center px-8">
          <SvgXml
            xml={orderArt.empty}
            width={150}
            height={150}
            style={{ marginBottom: 16 }}
          />
          <Text style={[typography.Poppins_s_bold, { fontSize: 18 }]}>
            No Orders Yet
          </Text>
          <Text
            style={{ color: colors.neutral, textAlign: "center", marginTop: 6 }}
          >
            Start shopping to see your orders here
          </Text>
          <Pressable
            onPress={() => router.replace("/")}
            style={{
              marginTop: 16,
              backgroundColor: colors.primary,
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: colors.light, fontWeight: "600" }}>
              Start Shopping
            </Text>
          </Pressable>
        </View>
      </ScreenLayout>
    );
  }
  const renderOrder = ({ item }) => {
    const firstProduct = item.orderItems?.[0];
    const statusName = getStatusName(item.orderStatus);
    const variationLabel = getVariationLabel(firstProduct);

    return (
      <Pressable
        onPress={() => handleOrderPress(item)}
        style={{
          backgroundColor: colors.light,
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.cardBorder,
        }}
      >
        <View className="flex-row">
          <Image
            source={{ uri: firstProduct?.thumbnailImage }}
            style={{
              height: 78,
              width: 78,
              borderRadius: 12,
              backgroundColor: colors.bgColor,
            }}
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <View className="flex-row justify-between items-center">
              <Text style={[typography.Poppins_s_bold, { color: colors.dark }]}>
                Order #{item.id}
              </Text>
              <ChevronRight size={16} color={colors.neutral} />
            </View>

            <Text
              numberOfLines={1}
              style={{ color: colors.neutral, marginTop: 4, fontSize: 13 }}
            >
              {firstProduct?.productName || "Multiple Items"}
            </Text>

            {variationLabel ? (
              <View
                style={{
                  alignSelf: "flex-start",
                  marginTop: 5,
                  backgroundColor: colors.bgColor,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 8,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 11,
                    color: colors.darkHover,
                    fontWeight: "600",
                  }}
                >
                  {variationLabel}
                </Text>
              </View>
            ) : null}

            <View className="flex-row items-center mt-3 gap-6">
              <View className="flex-row items-center mr-12">
                <SvgXml xml={statIcons.age} width={15} height={15} />
                <Text
                  style={{ marginLeft: 4, color: colors.neutral, fontSize: 12 }}
                >
                  {formatDate(item.createdOn)}
                </Text>
              </View>
              <View className="flex-row items-center">
                <SvgXml xml={menuArt.orders} width={15} height={15} />
                <Text
                  style={{ marginLeft: 4, color: colors.neutral, fontSize: 12 }}
                >
                  {getTotalQuantity(item.orderItems)} Items
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mt-4">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: getOrderStatusArt(statusName).tint,
                  paddingLeft: 5,
                  paddingRight: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                }}
              >
                <SvgXml
                  xml={getOrderStatusArt(statusName).art}
                  width={16}
                  height={16}
                />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {statusName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenLayout>
      <BackHeader title="My Orders" desc="Track and manage your orders" />

      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <View style={{ marginBottom: 14 }}>
          <ArtStrip
            art={orderArt.truck}
            tint="#E6F3FC"
            title={`${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
            subtitle="Tap an order to track it, step by step"
          />
        </View>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search orders..."
          // RightIcon={SlidersHorizontal}
          // onIconPress={() => setFilterVisible(true)}
        />
        <OrderStatusTabs
          activeStatus={selectedStatus}
          onSelect={setSelectedStatus}
        />
      </View>

      {filteredOrders.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            marginTop: 60,
          }}
        >
          <SvgXml
            xml={productArt.empty}
            width={130}
            height={130}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={[
              typography.Poppins_s_bold,
              { fontSize: 17, marginBottom: 6 },
            ]}
          >
            No Orders Found
          </Text>
          <Text
            style={{
              color: colors.neutral,
              textAlign: "center",
              marginBottom: 18,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            Try adjusting your filters or search to find what you're looking for
          </Text>
          <Pressable
            onPress={() => {
              setSelectedStatus(null);
              setSearch("");
            }}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 22,
              paddingVertical: 11,
              borderRadius: 30,
            }}
          >
            <Text
              style={{ color: colors.light, fontWeight: "600", fontSize: 14 }}
            >
              Reset Filters
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          scrollEnabled={false}
          data={filteredOrders}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        />
      )}

      <OrderFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </ScreenLayout>
  );
};

export default OrdersListScreen;

import { colors } from "@/src/constants/colors";
import { getOrderStatusArt } from "@/src/constants/iconArt";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useOrderStatuses } from "../hooks/orderStatusQueryHooks";

interface OrderStatusTabsProps {
  activeStatus: number | null;
  onSelect: (statusId: number | null) => void;
  /** Used when the status API returns nothing (e.g. 403): built from orders. */
  fallbackStatuses?: { id: number; name: string }[];
}

export default function OrderStatusTabs({
  activeStatus,
  onSelect,
  fallbackStatuses = [],
}: OrderStatusTabsProps) {
  const { data: statuses = [] } = useOrderStatuses();

  const tabs = [
    { id: null, name: "All" },
    ...(statuses.length ? statuses : fallbackStatuses),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 18 }}
      contentContainerStyle={{ paddingRight: 10 }}
    >
      {tabs.map((item, i) => {
        const isActive = activeStatus === item.id;

        return (
          <Pressable
            key={i}
            onPress={() => onSelect(item.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 6,
              paddingRight: 16,
              paddingVertical: 6,
              borderRadius: 24,
              marginRight: 10,
              backgroundColor: isActive ? colors.primary : colors.light,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : colors.secondary,
              elevation: isActive ? 4 : 2,
            }}
          >
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                marginRight: 7,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <SvgXml
                xml={getOrderStatusArt(item.name).art}
                width={18}
                height={18}
              />
            </View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: isActive ? colors.light : colors.secondary,
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

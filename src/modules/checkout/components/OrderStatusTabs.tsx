import { colors } from "@/src/constants/colors";
import { Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useOrderStatuses } from "../hooks/orderStatusQueryHooks";

interface OrderStatusTabsProps {
  activeStatus: number | null;
  onSelect: (statusId: number | null) => void;
}

export default function OrderStatusTabs({
  activeStatus,
  onSelect,
}: OrderStatusTabsProps) {
  const { data: statuses = [] } = useOrderStatuses();

  const tabs = [{ id: null, name: "All" }, ...statuses];

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
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 24,
              marginRight: 10,
              backgroundColor: isActive ? colors.primary : colors.light,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : colors.secondary,
              elevation: isActive ? 4 : 2,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 13,
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

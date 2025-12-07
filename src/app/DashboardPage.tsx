import { colors } from "@/src/constants/colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackHeader from "../components/shared/BackHeader";
import { DashboardTabs } from "../navigation/DashboardTabs";

const { width: screenWidth } = Dimensions.get("window");

export default function DashboardPage() {
  const { role } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const underlineAnim = useRef(new Animated.Value(0)).current;

  const tabs = Object.values(DashboardTabs).filter(
    (screen) => screen.role === role
  );

  const ActiveComponent = tabs[activeTab]?.component ?? null;
  const containerWidth = screenWidth * 0.7;
  const tabWidth = containerWidth / 3.5;

  useEffect(() => {
    Animated.spring(underlineAnim, {
      toValue: activeTab * (tabWidth + 8),
      useNativeDriver: true,
    }).start();

    scrollRef.current?.scrollTo({
      x: Math.max(
        0,
        activeTab * (tabWidth + 8) - containerWidth / 2 + tabWidth / 2
      ),
      animated: true,
    });
  }, [activeTab]);

  return (
    <View className="flex-1 bg-light">
      {/* Scrollable Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <BackHeader
          title={tabs[activeTab]?.label}
          desc={
            role === "farmer"
              ? "Manage Your Orchards & Fields"
              : role === "supplier"
                ? "Manage Your Products & Orders"
                : undefined
          }
        />
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <Text className="p-4 text-dark">No Screen Found</Text>
        )}
      </ScrollView>

      {/* Bottom Tabs */}
      <View
        className="absolute bottom-5 left-1/2"
        style={{ transform: [{ translateX: -containerWidth / 2 }] }}
      >
        <View
          className="bg-light border rounded-full"
          style={{ width: containerWidth, borderColor: colors.neutral }}
        >
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", px: 2 }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon ?? (() => null);
              const isActive = activeTab === index;

              return (
                <TouchableOpacity
                  key={tab.name}
                  className="mx-1 items-center justify-center rounded-full"
                  style={{
                    width: tabWidth,
                    paddingVertical: 6,
                    backgroundColor: isActive
                      ? colors.primary + "1A"
                      : colors.light,
                  }}
                  onPress={() => setActiveTab(index)}
                >
                  {Icon && (
                    <Icon
                      size={20}
                      color={isActive ? colors.primary : colors.dark}
                    />
                  )}
                  <Text
                    className={`text-[10px] mt-1 text-center ${
                      isActive ? "text-primary font-semibold" : "text-dark"
                    }`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {tab.label.split(" ")[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Animated Underline */}
            <Animated.View
              style={{
                position: "absolute",
                bottom: 0,
                left: 8,
                width: tabWidth,
                height: 2,
                borderRadius: 1,
                backgroundColor: colors.primary,
                transform: [{ translateX: underlineAnim }],
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

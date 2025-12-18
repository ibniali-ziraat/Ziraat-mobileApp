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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackHeader from "../components/shared/BackHeader";
import ScreenLayout from "../components/shared/ScreenLayout";
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
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-light">
      {/* Scrollable Main Content */}

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
        <ScreenLayout>
          <ActiveComponent />
        </ScreenLayout>
      ) : (
        <Text className="p-4 text-dark">No Screen Found</Text>
      )}

      {/* Bottom Tabs */}
      <View
        className="absolute bottom-5 left-0 right-0"
        style={{ bottom: insets.bottom + 10 }}
      >
        <View
          className="bg-light border rounded-full mx-3"
          style={{ borderColor: colors.neutral }}
        >
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon ?? (() => null);
              const isActive = activeTab === index;

              return (
                <TouchableOpacity
                  key={tab.name}
                  className="mx-1 items-center justify-center rounded-full overflow-hidden"
                  style={{
                    width: tabWidth,
                    paddingVertical: 6,
                  }}
                  onPress={() => setActiveTab(index)}
                >
                  {Icon && (
                    <Icon
                      size={22}
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

            {/* <Animated.View
              style={{
                position: "absolute",
                bottom: insets.bottom + 10,
                left: 16,
                width: tabWidth * 0.8, // <<< FIXED WIDTH
                height: 2,
                borderRadius: 1,
                backgroundColor: colors.primary,
                transform: [{ translateX: underlineAnim }],
              }}
            /> */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

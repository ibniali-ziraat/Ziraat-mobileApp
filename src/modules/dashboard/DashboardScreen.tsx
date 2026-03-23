import { useLocalSearchParams } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { DashboardTabs } from "@/src/navigation/DashboardTabs";

const { width: screenWidth } = Dimensions.get("window");

export default function DashboardScreen() {
  const { role } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const tabs = Object.values(DashboardTabs).filter(
    (screen) => screen.role === role,
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
        activeTab * (tabWidth + 8) - containerWidth / 2 + tabWidth / 2,
      ),
      animated: true,
    });
  }, [activeTab, tabWidth, containerWidth, underlineAnim]);

  return (
    <View style={{ backgroundColor: colors.light, flex: 1 }}>
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
        <CsText style={{ color: colors.dark, padding: 16 }}>
          No Screen Found
        </CsText>
      )}

      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 10,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 999,
            marginHorizontal: 12,
            borderColor: colors.neutral,
            backgroundColor: colors.light,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: 6,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <ChevronLeft size={18} color={colors.dark} />
          </View>

          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon ?? (() => null);
              const isActive = activeTab === index;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={{
                    width: tabWidth,
                    paddingVertical: 6,
                    marginHorizontal: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                  }}
                  onPress={() => setActiveTab(index)}
                >
                  <Icon
                    size={22}
                    color={isActive ? colors.primary : colors.dark}
                  />
                  <CsText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: isActive ? colors.primary : colors.dark,
                      fontWeight: isActive ? "600" : "400",
                      marginTop: 4,
                      fontSize: 10,
                      textAlign: "center",
                    }}
                  >
                    {tab.label.split(" ")[0]}
                  </CsText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              right: 6,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <ChevronRight size={18} color={colors.dark} />
          </View>
        </View>
      </View>
    </View>
  );
}

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { DashboardTabs } from "@/src/navigation/DashboardTabs";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const underlineAnim = useRef(new Animated.Value(0)).current;

  const tabs = Object.values(DashboardTabs).filter((screen) => screen);

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
  }, [activeTab]);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: colors.light }} className="flex-1">
      <BackHeader
        title={tabs[activeTab]?.label}
        desc={"Manage Your Orchards & Fields"}
        onPress={() => router.replace(ROUTES.TABS.HOME)}
      />
      {ActiveComponent ? (
        <ScreenLayout>
          <ActiveComponent />
        </ScreenLayout>
      ) : (
        <CsText style={{ color: colors.dark }} className="p-4 ">
          No Screen Found
        </CsText>
      )}

      <View
        className="absolute bottom-5 left-0 right-0"
        style={{ bottom: insets.bottom + 10 }}
      >
        <View
          className="border rounded-full mx-3"
          style={{
            borderColor: colors.neutral,
            backgroundColor: colors.light,
          }}
        >
          {/* Left Arrow */}
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

          {/* Scrollable Tabs */}
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24, // extra padding for arrows
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon ?? (() => null);
              const isActive = activeTab === index;

              return (
                <Pressable
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

                  <CsText
                    className="text-[10px] mt-1 text-center"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: isActive ? colors.primary : colors.dark,
                      fontWeight: isActive ? "600" : "400",
                    }}
                  >
                    {tab.label.split(" ")[0]}
                  </CsText>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Right Arrow */}
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

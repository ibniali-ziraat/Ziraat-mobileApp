import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { DashboardTabs } from "@/src/navigation/DashboardTabs";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const tabs = Object.values(DashboardTabs).filter((screen) => screen);

  const ActiveComponent = tabs[activeTab]?.component ?? null;

  // 4 tabs visible
  const horizontalPadding = 12;
  const gap = 8;

  const tabWidth = (screenWidth - horizontalPadding * 2 - gap * 3 - 24) / 4;

  useEffect(() => {
    const scrollX =
      activeTab * (tabWidth + gap) - screenWidth / 2 + tabWidth / 2;

    scrollRef.current?.scrollTo({
      x: Math.max(0, scrollX),
      animated: true,
    });
  }, [activeTab]);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.light,
      }}
    >
      <BackHeader
        title={tabs[activeTab]?.label}
        desc={"Manage Your Orchards & Fields"}
      />

      {ActiveComponent ? (
        <ScreenLayout>
          <ActiveComponent />
        </ScreenLayout>
      ) : (
        <Text className="p-4" style={{ color: colors.dark }}>
          No Screen Found
        </Text>
      )}

      <View
        className="absolute left-0 right-0 bottom-5"
        style={{
          bottom: insets.bottom + 10,
        }}
      >
        <View
          className="mx-3 rounded-full border overflow-hidden"
          style={{
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
              zIndex: 10,
            }}
          >
            {/* 
            <ChevronLeft
              size={18}
              color={colors.dark}
            /> 
            */}
          </View>

          {/* Tabs */}
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: horizontalPadding,
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon ?? (() => null);

              const isActive = activeTab === index;

              return (
                <Pressable
                  key={tab.name}
                  onPress={() => setActiveTab(index)}
                  className="items-center justify-center rounded-full"
                  style={{
                    width: tabWidth,
                    minWidth: tabWidth,
                    paddingVertical: 8,
                    marginRight: index !== tabs.length - 1 ? gap : 0,
                  }}
                >
                  <Icon
                    size={20}
                    color={isActive ? colors.primary : colors.dark}
                  />

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="mt-1 text-center text-[10px]"
                    style={{
                      color: isActive ? colors.primary : colors.dark,
                      fontWeight: isActive ? "600" : "400",
                    }}
                  >
                    {tab.label.split(" ")[0]}
                  </Text>
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
              zIndex: 10,
            }}
          >
            {/* 
            <ChevronRight
              size={18}
              color={colors.dark}
            /> 
            */}
          </View>
        </View>
      </View>
    </View>
  );
}

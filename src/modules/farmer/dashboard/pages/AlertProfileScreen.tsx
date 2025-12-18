import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import categoriesData from "@/src/Data/alertCategoriesData.json";
import summaryData from "@/src/Data/alertSummaryData.json";
import timelineData from "@/src/Data/alertTimelineData.json";

import { Text, View } from "react-native";

import AlertCategoryCard from "./components/AlertCategoryCard";
import AlertSummaryCard from "./components/AlertSummaryCard";
import AlertTimelineItem from "./components/AlertTimelineItem";
import HeaderBanner from "./components/HeaderBanner";

// ✅ Lucide icons
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import * as LucideIcons from "lucide-react-native";

export default function AlertsTrackingScreen() {

  const renderIcon = (item: any, size = 36) => {
    const IconComponent =
      LucideIcons[item.icon as keyof typeof LucideIcons];

    if (!IconComponent) return null;

    return (
      <IconComponent
        size={size}
        color={colors.secondary}
        strokeWidth={1.2}
      />
    );
  };

  return (
    <ScreenLayout className="flex-1 bg-light px-2">
      <BackHeader
        title="Alerts Dashboard"
        desc="Real-time warnings • Risk insights • Advisory actions"
      />

      <HeaderBanner />

      {/* Alert Summary */}
      <Text className="text-2xl font-bold mb-2">Alert Summary</Text>
      <View className="flex-row flex-wrap justify-between ">
        {summaryData.map(item => (
          <AlertSummaryCard
            key={item.id}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={renderIcon(item)}
          />
        ))}
      </View>

      {/* Alert Categories */}
      <Text className="text-2xl font-bold mt-4 mb-4">
        Alert Categories
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {categoriesData.map(item => (
          <AlertCategoryCard
            key={item.id}
            title={item.title}
            icon={renderIcon(item, 28)}
          />
        ))}
      </View>

      {/* Timeline */}
      <Text className="text-2xl font-bold mt-2 mb-4">
        Recent Alert Timeline
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {timelineData.map((item, index) => (
          <AlertTimelineItem
            key={item.id}
            index={index}
            time={item.time}
            message={item.message}
            icon={renderIcon(item)}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}

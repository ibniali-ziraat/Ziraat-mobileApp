import { colors } from "@/src/constants/colors";
import categoriesData from "../../../data/alertCategoriesData.json";
import summaryData from "../../../data/alertSummaryData.json";
import timelineData from "../../../data/alertTimelineData.json";

import { View } from "react-native";

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import * as LucideIcons from "lucide-react-native";
import {
  default as AlertCategoryCard,
  default as AlertSummaryCard,
} from "../components/AlertCategoryCard";
import AlertTimelineItem from "../components/AlertTimelineItem";
import HeaderBanner from "../components/HeaderBanner";

export default function AlertsTrackingScreen() {
  const renderIcon = (item: any, size = 36) => {
    const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons];

    if (!IconComponent) return null;

    return (
      <IconComponent size={size} color={colors.secondary} strokeWidth={1.2} />
    );
  };

  return (
    <ScreenLayout >
      <ScreenContent>
        <HeaderBanner />

        {/* Alert Summary */}
        <CsText
          style={typography.Poppins_m_semibold}
          className="text-2xl  mb-2"
        >
          Alert Summary
        </CsText>
        <View className="flex-row flex-wrap justify-between ">
          {summaryData.map((item) => (
            <AlertSummaryCard
              key={item.id}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={renderIcon(item)}
            />
          ))}
        </View>

        <CsText
          style={typography.Poppins_m_semibold}
          className="text-2xl  mt-4 mb-4"
        >
          Alert Categories
        </CsText>
        <View className="flex-row flex-wrap justify-between">
          {categoriesData.map((item) => (
            <AlertCategoryCard
              key={item.id}
              title={item.title}
              icon={renderIcon(item, 28)}
            />
          ))}
        </View>

        <CsText
          style={typography.Poppins_m_semibold}
          className="text-2xl mt-2 mb-4"
        >
          Recent Alert Timeline
        </CsText>
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
      </ScreenContent>
    </ScreenLayout>
  );
}

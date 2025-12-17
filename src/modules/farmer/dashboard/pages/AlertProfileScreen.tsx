import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import categoriesData from "@/src/Data/alertCategoriesData.json";
import summaryData from "@/src/Data/alertSummaryData.json";
import timelineData from "@/src/Data/alertTimelineData.json";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import AlertCategoryCard from "./components/AlertCategoryCard";
import AlertSummaryCard from "./components/AlertSummaryCard";
import AlertTimelineItem from "./components/AlertTimelineItem";
import HeaderBanner from "./components/HeaderBanner";

export default function AlertsTrackingScreen() {
  const renderIcon = (item: any, size = 28) => {
    return item.iconType === "MaterialCommunityIcons" ? (
      <MaterialCommunityIcons name={item.icon} size={size} color={colors.secondary} />
    ) : (
      <Ionicons name={item.icon} size={size} color={colors.secondary} />
    );
  };

  return (
    <ScrollView className="flex-1 bg-light">
    <BackHeader title="Alerts Dashboard" 
    desc="Real-time warnings • Risk insights • Advisory actions"/>
    
      <HeaderBanner />

      <Text className="text-2xl font-bold  mb-2">Alert Summary</Text>
      <View className="">
        {summaryData.map(item => (
          <AlertSummaryCard
            key={item.id}
            delay={item.delay}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={renderIcon(item)}
          />
        ))}
      </View>

      <Text className="text-2xl font-bold mt-4 mb-4 ">Alert Categories</Text>
      <View className=" mb-6">
        {categoriesData.map(item => (
          <AlertCategoryCard
            key={item.id}
            delay={item.delay}
            title={item.title}
            icon={renderIcon(item, 28)}
          />
        ))}
      </View>

      <Text className="text-2xl font-bold  mt-2 mb-4 ">Recent Alert Timeline</Text>
      <View >
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

    </ScrollView>
  );
}

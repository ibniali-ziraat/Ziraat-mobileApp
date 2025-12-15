import CustomBarChart from "@/src/components/charts/CustomBarChart";
import { colors } from "@/src/constants/colors";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import cardsDataJson from "../../../../Data/cardsData.json";
import EnhancedCard from "./components/EnhancedCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HEADER_WIDTH = SCREEN_WIDTH - 32;

const singleHeaderImage =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

const iconMap: any = {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
};

export default function NutrientsProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView className="pt-4">
      {/* Header Section */}
      <View
        style={{ width: HEADER_WIDTH }}
        className="overflow-hidden pb-6 mx-4 rounded-xl"
      >
        <ImageBackground
          source={{ uri: singleHeaderImage }}
          className="w-full h-40 rounded-xl overflow-hidden"
          resizeMode="cover"
        >
          <View className="p-4">
            <Text className="text-light font-extrabold text-lg">
              Soil, Water & Nutrient
            </Text>
            <Text className="text-light mt-1 text-xs">
              Real-time insight into soil health.
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Dynamic Cards */}
      {cardsDataJson.map((card, index) => {
        const IconComponent = iconMap[card.iconType];
        return (
          <EnhancedCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            icon={
              IconComponent ? (
                <IconComponent name={card.iconName} size={40} color={colors.secondary} />
              ) : null
            }
            onPress={
              card.onPress === "modal" ? () => setModalVisible(true) : undefined
            }
          />
        );
      })}

      {/* Chart Section */}
      <Text className="text-[18px] font-extrabold mt-6 mb-6 text-dark px-4">
        Soil Health Trend
      </Text>

      <View className="bg-white rounded-xl p-4 border border-neutral mb-6 mx-4">
        <View className="h-48">
          <CustomBarChart />
        </View>
        <Text className="text-center text-md mt-2">
          (pH, EC & NPK trend)
        </Text>
      </View>
    </ScrollView>
  );
}

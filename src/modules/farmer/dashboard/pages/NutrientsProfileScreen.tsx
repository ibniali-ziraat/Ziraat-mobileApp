import CustomBarChart from "@/src/components/charts/CustomBarChart";
import BackHeader from "@/src/components/shared/BackHeader";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { ImageBackground, View } from "react-native";
import cardsDataJson from "../../../../data/cardsData.json";
import EnhancedCard from "./components/EnhancedCard";

// ✅ Lucide icons
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Droplets,
  Gauge,
  Leaf,
  Recycle,
  Sprout,
} from "lucide-react-native";

const ICON_MAP: Record<string, any> = {
  Leaf,
  Activity,
  Recycle,
  BarChart3,
  Droplets,
  Sprout,
  Gauge,
  AlertTriangle,
};

const singleHeaderImage =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

export default function NutrientsProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenLayout className="pt-4 px-2">
      <BackHeader
        title="Nutrients Profile"
        desc="Comprehensive insights into soil and water nutrient levels."
      />

      {/* Header */}
      <View className="overflow-hidden pb-6 rounded-xl">
        <ImageBackground
          source={{ uri: singleHeaderImage }}
          className="w-full h-56 rounded-xl overflow-hidden"
        >
          <View className="p-4">
            <CsText className="text-light font-extrabold text-lg">
              Soil, Water & Nutrient
           </CsText>
            <CsText className="text-light mt-1 text-xs">
              Real-time insight into soil health.
           </CsText>
          </View>
        </ImageBackground>
      </View>

      {/* Cards */}
      <View className="flex-row flex-wrap justify-between mt-4">
        {cardsDataJson.map((card, index) => {
          const Icon = ICON_MAP[card.icon];

          return (
            <EnhancedCard
              key={index}
              title={card.title}
              value={card.value}
              icon={
                Icon ? (
                  <Icon size={30} color={colors.secondary} strokeWidth={1.3} />
                ) : null
              }
              onPress={
                card.onPress === "modal"
                  ? () => setModalVisible(true)
                  : undefined
              }
              width="100%"
            />
          );
        })}
      </View>

      {/* Chart */}
      <View className="mt-6 mb-6">
        <CsText className="text-[20px] font-extrabold text-dark mb-4">
          Soil Health Trend
       </CsText>

        <ZiraatCard width="100%" paddingHorizontal={2} paddingVertical={2}>
          <CustomBarChart />
          <CsText className="text-center text-md mt-2">(pH, EC & NPK trend)</CsText>
        </ZiraatCard>
      </View>
    </ScreenLayout>
  );
}

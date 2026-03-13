import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
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
import { useState } from "react";
import { ImageBackground, View } from "react-native";
import cardsDataJson from "../../../data/cardsData.json";
import EnhancedCard from "../components/EnhancedCard";

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
  "https://images.pexels.com/photos/4207906/pexels-photo-4207906.jpeg";

export default function NutrientsProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenLayout>
      <ScreenContent>
        <View className="overflow-hidden pb-6 rounded-xl">
          <ImageBackground
            source={{ uri: singleHeaderImage }}
            className="w-full h-56 rounded-xl overflow-hidden"
          >
            <View className="p-4">
              <CsText style={typography.Poppins_l_bold} className="text-light">
                Soil, Water & Nutrient
              </CsText>
              <CsText
                style={typography.Poppins_s_regular}
                className="text-light mt-2"
              >
                Real-time insight into soil health.
              </CsText>
            </View>
          </ImageBackground>
        </View>

        <View className="flex-row flex-wrap justify-between mt-4">
          {cardsDataJson.map((card, index) => {
            const Icon = ICON_MAP[card.icon];

            return (
              <View key={index} className="w-[48%] mb-3">
                <EnhancedCard
                  title={card.title}
                  value={card.value}
                  icon={
                    Icon ? (
                      <Icon
                        size={30}
                        color={colors.secondary}
                        strokeWidth={1.3}
                      />
                    ) : null
                  }
                />
              </View>
            );
          })}
        </View>

        <View className="mt-6 mb-6">
          <CsText
            style={typography.Poppins_m_semibold}
            className="text-[20px]  text-dark mb-4"
          >
            Soil Health Trend
          </CsText>

          <ZiraatCard width="100%" paddingHorizontal={2} paddingVertical={2}>
            <CustomBarChart />
            <CsText className="text-center text-md mt-2">
              (pH, EC & NPK trend)
            </CsText>
          </ZiraatCard>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

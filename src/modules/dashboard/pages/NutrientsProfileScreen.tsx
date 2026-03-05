import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
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

        {/* Header Image */}
        <View className="overflow-hidden pb-6 rounded-xl">
          <ImageBackground
            source={{ uri: singleHeaderImage }}
            className="w-full h-56 rounded-xl overflow-hidden"
          >
            <View className="p-4">
              <CsText
                style={[typography.Poppins_l_bold, { color: colors.light }]}
              >
                Soil, Water & Nutrient
              </CsText>

              <CsText
                style={[
                  typography.Poppins_s_regular,
                  { color: colors.light, marginTop: 6 },
                ]}
              >
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

        {/* Chart Section */}
        <View className="mt-6 mb-6">
          <CsText
            style={[
              typography.Poppins_m_semibold,
              { fontSize: 20, color: colors.dark, marginBottom: 16 },
            ]}
          >
            Soil Health Trend
          </CsText>

          {/* Shadow Card replacing ZiraatCard */}
          <View
            style={[
              {
                width: "100%",
                backgroundColor: colors.light,
                borderRadius: 16,
             
                borderColor: colors.neutral,
                paddingHorizontal: 14,
                paddingVertical: 16,
              },
              shadows.profile_card,
            ]}
          >
            <CustomBarChart />

            <CsText
              style={{
                textAlign: "center",
                marginTop: 10,
                color: colors.dark,
              }}
            >
              (pH, EC & NPK trend)
            </CsText>
          </View>
        </View>

      </ScreenContent>
    </ScreenLayout>
  );
}
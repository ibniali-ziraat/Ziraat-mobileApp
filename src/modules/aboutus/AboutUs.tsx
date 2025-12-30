import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import aboutZiraatData from "@/src/data/aboutZiraatData.json";
import {
  BarChart3,
  BookOpen,
  Handshake,
  Layers,
  Recycle,
  Target,
  Wheat,
} from "lucide-react-native";
import { Image, View } from "react-native";

const iconMap = {
  Wheat,
  BookOpen,
  Layers,
  Recycle,
  Target,
  Handshake,
  BarChart3,
};

const aboutUsImages = {
  aboutus: require("../../../assets/images/about-us/aboutus.webp"),
  aboutus1: require("../../../assets/images/about-us/aboutus1.avif"),
  aboutus2: require("../../../assets/images/about-us/aboutus2.jpg"),
  aboutus3: require("../../../assets/images/about-us/aboutus3.jpg"),
  aboutus4: require("../../../assets/images/about-us/aboutus4.jpg"),
  aboutus5: require("../../../assets/images/about-us/aboutus5.jpg"),
  aboutus6: require("../../../assets/images/about-us/aboutus6.webp"),
};

export default function AboutUs() {
  return (
    <ScreenLayout>
      <BackHeader
        title="About Us"
        desc="Ziraat smart solutions for modern farming"
      />

      {aboutZiraatData.map((section, index) => {
        const Icon = iconMap[section.icon];
        const isEven = index % 2 === 0;

        return (
          <ZiraatCard
            key={index}
            width="100%"
            height="12%"
            paddingHorizontal={1}
            paddingVertical={2}
            marginBottom={3}
          >
            <View
              className={`flex-row ${
                isEven ? "flex-row" : "flex-row-reverse"
              } items-stretch`}
            >
              {section.image && (
                <View className="w-[45%] rounded-xl overflow-hidden">
                  <Image
                    source={aboutUsImages[section.image]}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}

              <View className="w-[55%] px-3">
                <View className="flex-row items-center mb-3">
                  {Icon && (
                    <Icon
                      size={22}
                      color={colors.secondary}
                      strokeWidth={1.3}
                    />
                  )}
                  <CsText className="ml-2 text-[18px] font-bold text-dark">
                    {section.title}
                  </CsText>
                </View>

                {section.content.map((item: string, idx: number) => (
                  <View key={idx} className="flex-row mb-2">
                    <CsText className="mr-2 text-[14px] text-dark">•</CsText>
                    <CsText className="flex-1 text-[14px] text-normal">
                      {item}
                    </CsText>
                  </View>
                ))}
              </View>
            </View>
          </ZiraatCard>
        );
      })}
    </ScreenLayout>
  );
}

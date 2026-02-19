import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
    BarChart3,
    CloudSun,
    ShieldCheck,
    ShoppingCart,
    Sprout,
    Users,
} from "lucide-react-native";
import { View } from "react-native";

const offerings = [
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    desc: "Accurate forecasts for irrigation and spraying.",
  },
  {
    icon: Sprout,
    title: "Crop Advisory",
    desc: "Expert fertilizer and crop care guidance.",
  },
  {
    icon: ShoppingCart,
    title: "Quality Inputs",
    desc: "Trusted pesticides and farm essentials.",
  },
  {
    icon: BarChart3,
    title: "Farm Insights",
    desc: "Visual reports to track performance.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Farming",
    desc: "Practices that protect crops & health.",
  },
  {
    icon: Users,
    title: "Expert Support",
    desc: "Get guidance from agri experts and fellow farmers.",
  },
];

export default function WhatWeOffer() {
  return (
    <View className="flex-row flex-wrap justify-between">
      {offerings.map((item, index) => {
        const Icon = item.icon;

        return (
          <View key={index} style={{ width: "48%" }} className="mb-4">
            <ZiraatCard>
              <View className="items-center px-3 py-5 min-h-[160px] justify-center">
                {/* Icon */}
                <View
                  style={{
                    backgroundColor: `${colors.primary}12`,
                    padding: 16,
                    borderRadius: 18,
                  }}
                >
                  <Icon size={28} color={colors.primary} />
                </View>

                {/* Title */}
                <CsText
                  style={typography.Poppins_s_medium}
                  className="mt-4 text-center text-dark"
                >
                  {item.title}
                </CsText>

                {/* Description */}
                <CsText
                  style={typography.Poppins_xs_regular}
                  className="mt-2 text-center text-neutral leading-5"
                >
                  {item.desc}
                </CsText>
              </View>
            </ZiraatCard>
          </View>
        );
      })}
    </View>
  );
}

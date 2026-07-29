import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  ChevronRight,
  Droplets,
  Leaf,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { FarmerDashboardTip } from "../types/farmerDashboard";

type TipPresentation = {
  icon: LucideIcon;
  description: string;
};

const tipPresentations: Record<string, TipPresentation> = {
  "protective-gear": {
    icon: ShieldCheck,
    description: "Use gloves, masks, and eyewear while spraying pesticides.",
  },
  "early-irrigation": {
    icon: Droplets,
    description: "Reduces evaporation and ensures deeper soil penetration.",
  },
  "organic-fertilizers": {
    icon: Leaf,
    description: "Improves soil health naturally and enhances crop quality.",
  },
  "weather-before-spraying": {
    icon: Sun,
    description: "Avoid windy or rainy conditions to prevent chemical drift.",
  },
};

const defaultPresentation: TipPresentation = {
  icon: Leaf,
  description: "",
};

function getWeatherWarning(title: string): string | null {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("spray")) {
    return "Avoid spraying during rain or strong winds.";
  }
  if (normalizedTitle.includes("irrigate")) {
    return "Best done early morning or late evening.";
  }
  return null;
}

type FarmerTipRowProps = {
  tip: FarmerDashboardTip;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
};

function FarmerTipRow({
  tip,
  isOpen,
  isLast,
  onToggle,
}: FarmerTipRowProps) {
  const presentation = tipPresentations[tip.code] ?? defaultPresentation;
  const IconComponent = presentation.icon;
  const warning = getWeatherWarning(tip.title);
  const rotate = useSharedValue(0);
  const expand = useSharedValue(0);

  useEffect(() => {
    rotate.value = withTiming(isOpen ? 90 : 0, { duration: 200 });
    expand.value = withTiming(isOpen ? 1 : 0, { duration: 220 });
  }, [expand, isOpen, rotate]);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotate.value}deg` }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: expand.value,
    height: expand.value === 0 ? 0 : "auto",
  }));

  return (
    <View>
      <Pressable
        onPress={onToggle}
        className="flex-row items-center justify-between py-3"
      >
        <View className="flex-row items-center">
          <View style={{ padding: 5, borderRadius: 10 }}>
            <IconComponent size={22} color={colors.primary} />
          </View>

          <CsText style={[typography.Poppins_s_medium]} className="ml-3">
            {tip.title}
          </CsText>
        </View>

        <Animated.View style={arrowStyle}>
          <ChevronRight size={22} color="#777" />
        </Animated.View>
      </Pressable>

      <Animated.View style={[contentStyle, { overflow: "hidden" }]}>
        <View className="ml-14 mb-4">
          {presentation.description ? (
            <CsText
              style={[typography.Poppins_xs_regular]}
              className="leading-5 text-neutral"
            >
              {presentation.description}
            </CsText>
          ) : null}

          {warning ? (
            <CsText style={{ color: colors.error }} className="text-xs mt-2">
              {warning}
            </CsText>
          ) : null}
        </View>
      </Animated.View>

      {!isLast ? (
        <View
          style={{
            height: 1,
            backgroundColor: "rgba(0,0,0,0.06)",
            marginVertical: 10,
          }}
        />
      ) : null}
    </View>
  );
}

type FarmerTipsCardProps = {
  tips?: FarmerDashboardTip[];
};

export default function FarmerTipsCard({ tips = [] }: FarmerTipsCardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  console.log("FarmerTipsCard tips:", tips); // Debugging line to check the value of tips

  return (
    <View
      className="rounded-2xl mb-8"
      style={{
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="px-4 pb-4">
        {tips.map((tip, index) => (
          <FarmerTipRow
            key={tip.code}
            tip={tip}
            isOpen={openIndex === index}
            isLast={index === tips.length - 1}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </View>
    </View>
  );
}

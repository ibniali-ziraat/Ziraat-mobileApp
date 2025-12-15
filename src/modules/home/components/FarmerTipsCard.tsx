// components/home/FarmerTipsCard.tsx
import { colors } from "@/src/constants/colors";
import {
    ChevronRight,
    Droplets,
    Leaf,
    ShieldCheck,
    Sun
} from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

// Weather-based warnings
function getWeatherWarning(title: string) {
  if (title.includes("Spray")) return "Avoid spraying during rain or strong winds.";
  if (title.includes("Irrigate")) return " Best done early morning or late evening.";
  return null;
}

const tips = [
  {
    icon: ShieldCheck,
    title: "Always Wear Protective Gear",
    desc: "Use gloves, masks, and eyewear while spraying pesticides.",
  },
  {
    icon: Droplets,
    title: "Irrigate During Early Hours",
    desc: "Reduces evaporation and ensures deeper soil penetration.",
  },
  {
    icon: Leaf,
    title: "Use Organic Fertilizers",
    desc: "Improves soil health naturally and enhances crop quality.",
  },
  {
    icon: Sun,
    title: "Check Weather Before Spraying",
    desc: "Avoid windy or rainy conditions to prevent chemical drift.",
  },
];

export default function FarmerTipsCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const tipOfDayIndex = 0; 

  return (
    <View
      className="rounded-2xl mb-8"
      style={{
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
     

      <View className="px-4 pb-4">
        {tips.map((tip, index) => {
          const IconComponent = tip.icon;
          const isOpen = openIndex === index;
          
          const warning = getWeatherWarning(tip.title);

          // Accordion animations
          const rotate = useSharedValue(isOpen ? 90 : 0);
          const expand = useSharedValue(isOpen ? 1 : 0);

          const arrowStyle = useAnimatedStyle(() => ({
            transform: [{ rotateZ: `${rotate.value}deg` }],
          }));

          const contentStyle = useAnimatedStyle(() => ({
            opacity: expand.value,
            height: expand.value === 0 ? 0 : "auto",
          }));

          const toggle = () => {
            const open = !isOpen;
            setOpenIndex(open ? index : null);

            rotate.value = withTiming(open ? 90 : 0, { duration: 200 });
            expand.value = withTiming(open ? 1 : 0, { duration: 220 });
          };

         

          return (
            <View
              key={index}
              
            >
              

              {/* Header Row */}
              <TouchableOpacity
                onPress={toggle}
                activeOpacity={0.7}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center">
                  {/* Icon bubble */}
                  <View
                    style={{
                      
                      padding: 8,
                      borderRadius: 10,
                    }}
                  >
                    <IconComponent size={22} color={colors.primary} />
                  </View>

                  <Text className="ml-3 font-semibold text-black text-[15px]">
                    {tip.title}
                  </Text>
                </View>

                <Animated.View style={arrowStyle}>
                  <ChevronRight size={22} color="#777" />
                </Animated.View>
              </TouchableOpacity>

              {/* Expanded Content */}
              <Animated.View style={[contentStyle, { overflow: "hidden" }]}>
                <View className="ml-14 mb-4">
                  <Text className="text-sm text-gray-700 leading-5">
                    {tip.desc}
                  </Text>

                  {/* Weather Warning */}
                  {warning && (
                    <Text className="text-xs text-red-600 mt-2">{warning}</Text>
                  )}

                  
                </View>
              </Animated.View>

              {/* Divider */}
              {index !== tips.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "rgba(0,0,0,0.06)",
                    marginVertical: 10,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

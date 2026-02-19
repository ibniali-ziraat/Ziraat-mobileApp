import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  CalendarDays,
  Leaf,
  Ruler,
  User
} from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, View } from "react-native";

interface DetailRowProps {
  label: string;
  value?: string;
  isLast?: boolean;
}

export default function DetailRow({ label, value, isLast }: DetailRowProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const getIcon = () => {
    switch (label) {
      case "Size":
        return <Ruler size={16} color={colors.primary} />;
      case "Established":
        return <CalendarDays size={16} color={colors.primary} />;
      case "Plantation":
        return <Leaf size={16} color={colors.primary} />;
      case "Ownership":
        return <User size={16} color={colors.primary} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>

      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className="py-3  rounded-xl "
      >

        <View className="flex-row justify-between items-center">

          {/* LEFT */}

          <View className="w-[45%] flex-row items-center">

            <View
              className="h-7 w-7 rounded-full items-center justify-center mr-2"
              style={{ backgroundColor: colors.primary + "15" }}
            >
              {getIcon()}
            </View>

            <CsText
              style={[
                typography.Poppins_xs_medium,
                { color: colors.dark }
              ]}
              numberOfLines={1}
            >
              {label}
            </CsText>

          </View>

          {/* RIGHT */}

          <View className="w-[55%] items-end">

            <CsText
              style={[
                typography.Poppins_xs_medium,
                {
                  color: colors.dark,
                
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 6,
                }
              ]}
              className="text-right"
              numberOfLines={2}
            >
              {value || "-"}
            </CsText>

          </View>

        </View>

      </Pressable>

      {!isLast && <View className="h-px mx-2" />}

    </Animated.View>
  );
}

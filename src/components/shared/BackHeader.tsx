import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

interface BackHeaderProps {
  title: string;
  desc?: string;
  onPress?: () => void;

  // Optional right side icon
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export default function BackHeader({
  title,
  desc,
  onPress,
  rightIcon,
  onRightIconPress,
}: BackHeaderProps) {
  const router = useRouter();

  return (
    <ScreenContent>
      <View className="bg-light mb-4">
        <View className="flex-row items-center">
          <Pressable
            onPress={onPress ?? (() => router.dismiss())}
            className="p-2 mr-3 rounded-full pl-0"
          >
            <ArrowLeft size={26} color={colors.dark} />
          </Pressable>

          <View className="flex-1">
            <CsText
              style={[typography.Poppins_m_semibold]}
              className="text-dark"
              numberOfLines={1}
            >
              {title}
            </CsText>

            {desc && (
              <CsText
                style={[typography.Poppins_xs_regular]}
                className="text-neutral mt-0.5"
                numberOfLines={2}
              >
                {desc}
              </CsText>
            )}
          </View>

          {/* Optional Right Icon */}
          {rightIcon && (
            <Pressable
              onPress={onRightIconPress}
              className="p-2 ml-3 rounded-full"
            >
              {rightIcon}
            </Pressable>
          )}
        </View>
      </View>
    </ScreenContent>
  );
}

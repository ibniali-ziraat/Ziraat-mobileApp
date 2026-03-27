import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

interface BackHeaderProps {
  title: string;
  desc?: string;
  onPress?: () => void;
}

export default function BackHeader({ title, desc, onPress }: BackHeaderProps) {
  const router = useRouter();

  return (
    <ScreenContent>
      <View className="bg-light mb-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onPress ?? (() => router.dismiss())}
            className="p-2 mr-3 rounded-full pl-0"
            activeOpacity={0.7}
          >
            <ArrowLeft size={26} color={colors.dark} />
          </TouchableOpacity>

          <View className="flex-1">
            <CsText
              style={[typography.Poppins_m_semibold]}
              className="text-dark "
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
        </View>
      </View>
    </ScreenContent>
  );
}

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import { ArrowLeft, LayoutGrid, List } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

export default function BackHeader({
  title,
  desc,
  onPress,
  showToggle = false,
  isGrid = false,
  onToggle,
}) {
  const router = useRouter();

  return (
    <ScreenContent>
      <View className="bg-light mb-4">
        
        
        <View className="flex-row items-center justify-between">
          
        
          <View className="flex-row items-center flex-1">
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
          </View>

          
          {showToggle && (
            <View style={{ flexDirection: "row", gap: 8 }}>
              
              <TouchableOpacity
                onPress={() => onToggle?.(false)}
                style={{
                  padding: 7,
                  borderRadius: 10,
                  backgroundColor: !isGrid
                    ? colors.primary + "15"
                    : "transparent",
                }}
              >
                <List
                  size={20}
                  color={!isGrid ? colors.primary : colors.neutral}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onToggle?.(true)}
                style={{
                  padding: 7,
                  borderRadius: 10,
                  backgroundColor: isGrid
                    ? colors.primary + "15"
                    : "transparent",
                }}
              >
                <LayoutGrid
                  size={20}
                  color={isGrid ? colors.primary : colors.neutral}
                />
              </TouchableOpacity>

            </View>
          )}

        </View>
      </View>
    </ScreenContent>
  );
}
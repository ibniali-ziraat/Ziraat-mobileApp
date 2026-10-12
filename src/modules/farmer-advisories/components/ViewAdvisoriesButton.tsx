import { Pressable } from "@/src/components/shared/Pressable";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import { BellRing, ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { advisoryRoutes } from "../routes/advisoryRoutes";

type ViewAdvisoriesButtonProps = {
  orchardProfileId?: number;
  orchardName?: string;
};

// Entry point on the orchard details screen
export default function ViewAdvisoriesButton({
  orchardProfileId,
  orchardName,
}: ViewAdvisoriesButtonProps) {
  if (!orchardProfileId) return null;

  return (
    <ScreenContent>
      <Pressable
        onPress={() =>
          router.push(advisoryRoutes.list(orchardProfileId, orchardName))
        }
        style={({ pressed }) => [
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 14,
            marginBottom: 14,
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.hairline,
            backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
          },
          cardShadow,
        ]}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: chartTokens.tint,
          }}
        >
          <BellRing size={20} color={colors.primary} strokeWidth={1.9} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={[typography.Poppins_s_semibold, { color: cardTokens.inkPrimary }]}
          >
            View Advisories
          </Text>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 11, marginTop: 1 },
            ]}
          >
            Spray, fertigation, pruning & harvest advice
          </Text>
        </View>

        <ChevronRight size={18} color={cardTokens.inkMuted} />
      </Pressable>
    </ScreenContent>
  );
}

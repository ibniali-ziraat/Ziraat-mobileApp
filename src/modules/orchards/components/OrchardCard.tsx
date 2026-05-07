import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { shadows } from "@/src/constants/shadows";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import OrchardDetails from "./OrchardDetails";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  const PADDING = 16;

  return (
    <ScreenLayout>
      <ScreenContent>
        <View
          style={[
            {
              marginBottom: 32,
              borderRadius: 20,
              backgroundColor: colors.light,
              padding: PADDING,
              elevation: 0,
            },
            shadows.review_card,
          ]}
        >
          <OrchardDetails orchard={orchard} />

          <View
            style={{
              height: 1,
              backgroundColor: "#eee",
              marginVertical: 12,
            }}
          />
          <Pressable
            onPress={() =>
              router.push({
                pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
                params: { id: orchard.id },
              })
            }
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              View Details
            </Text>

            <ArrowRight size={18} color={colors.primary} />
          </Pressable>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

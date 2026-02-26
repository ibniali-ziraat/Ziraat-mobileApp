import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import OrchardDetails from "./OrchardDetails";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  return (
    <ScreenContent>
      <View
        style={[
          {
            marginBottom: 16,
            borderRadius: 20,
            backgroundColor: colors.light,
            borderWidth: 1,
            padding: 16,
          },
          shadows.review_card,
        ]}
      >
        <OrchardDetails orchard={orchard} />

        <View style={{}} />

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/orchards/orchard-detail",
              params: { id: orchard.id },
            })
          }
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
              fontSize: 14,
              textDecorationLine: "underline",
              marginRight: 4,
            }}
          >
            View Details
          </Text>

          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              lineHeight: 16,
            }}
          >
            →
          </Text>
        </Pressable>
      </View>
    </ScreenContent>
  );
}

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
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
        style={{
          marginBottom: 16,
          borderRadius: 20,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#F1F1F1",
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {/* Orchard Details */}
        <OrchardDetails orchard={orchard} />

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#F2F2F2",
            marginVertical: 2,
          }}
        />

        {/* View Details CTA (Right aligned) */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/orchards/orchard-detail",
              params: { id: orchard.id },
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 6,
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
        </Pressable>
      </View>
    </ScreenContent>
  );
}
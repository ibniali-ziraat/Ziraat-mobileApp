import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import * as Linking from "expo-linking";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { LocationStatus } from "../hooks/useLocationPermission";

// Shown instead of a blank screen while the device location is being fetched
// or when it can't be obtained.
export default function MeasureLocationState({
  status,
  title,
}: {
  status: LocationStatus;
  title: string;
}) {
  const failed = status === "denied" || status === "error";

  return (
    <View style={{ flex: 1, backgroundColor: colors.light, paddingTop: 18 }}>
      <BackHeader title={title} />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          gap: 12,
        }}
      >
        {failed ? (
          <>
            <Text style={{ fontSize: 16, textAlign: "center", color: "#333" }}>
              {status === "denied"
                ? "Location permission is needed to measure your orchard."
                : "Could not get your location. Check that GPS is turned on and try again."}
            </Text>
            <Pressable
              onPress={() => Linking.openSettings()}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.light }}>Open Settings</Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: "#666" }}>Getting your location…</Text>
          </>
        )}
      </View>
    </View>
  );
}

import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { useLocationContext } from "@/src/contexts/LocationContext";
import { enableLocation } from "@/src/utils/permissions";
import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

/**
 * One quiet line under the weather card while location is off: says whose
 * weather is showing and offers live weather. The button shows the OS
 * dialog, or opens Settings / the GPS switch when the OS won't ask; the
 * location watcher re-checks on return and the line disappears.
 */
export default function LocationHint({ placeName }: { placeName?: string }) {
  const { status, recheck } = useLocationContext();
  const [busy, setBusy] = useState(false);

  if (status !== "denied" && status !== "disabled") return null;

  const onPress = async () => {
    setBusy(true);
    try {
      if (await enableLocation()) await recheck();
    } finally {
      setBusy(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        paddingLeft: 12,
        paddingRight: 6,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: cardTokens.mutedSurface,
      }}
    >
      <MapPin size={15} color={colors.primary} strokeWidth={2.2} />
      <Text
        numberOfLines={2}
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkSecondary, flex: 1, marginHorizontal: 8 },
        ]}
      >
        {status === "disabled"
          ? "Your phone's location is off. Turn it on for live weather."
          : `Showing ${placeName ?? "Srinagar"} weather. Turn on location for live weather.`}
      </Text>
      <Pressable
        onPress={onPress}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel="Turn on location"
        style={({ pressed }) => ({
          minWidth: 68,
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 10,
          backgroundColor: colors.primary,
          opacity: pressed || busy ? 0.85 : 1,
        })}
      >
        {busy ? (
          <ActivityIndicator size="small" color={colors.light} />
        ) : (
          <Text
            style={[typography.Poppins_xs_semibold, { color: colors.light }]}
          >
            Turn on
          </Text>
        )}
      </Pressable>
    </View>
  );
}

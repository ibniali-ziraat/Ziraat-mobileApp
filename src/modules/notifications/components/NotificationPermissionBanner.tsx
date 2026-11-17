import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { menuArt } from "@/src/constants/iconArt";
import { useNotificationPermission } from "@/src/hooks/useNotificationPermission";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

/**
 * Shown while notification permission is off. The button shows the OS
 * dialog, or opens Settings if the OS won't ask again; the card hides
 * itself once permission is on.
 */
export default function NotificationPermissionBanner() {
  const { granted, enable } = useNotificationPermission();
  const [busy, setBusy] = useState(false);

  if (granted !== false) return null;

  const onPress = async () => {
    setBusy(true);
    try {
      await enable();
    } finally {
      setBusy(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        marginBottom: 14,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: cardTokens.surface,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8E1",
        }}
      >
        <SvgXml xml={menuArt.notifications} width={26} height={26} />
      </View>

      <View style={{ flex: 1, marginHorizontal: 12 }}>
        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary },
          ]}
        >
          Notifications are off
        </Text>
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, marginTop: 1 },
          ]}
        >
          Get spray reminders, advisories and order updates
        </Text>
      </View>

      <Pressable
        onPress={onPress}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel="Turn on notifications"
        style={({ pressed }) => ({
          minWidth: 76,
          alignItems: "center",
          paddingHorizontal: 14,
          paddingVertical: 9,
          borderRadius: 12,
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

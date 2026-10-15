import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { filterArt, menuArt } from "@/src/constants/iconArt";
import { illustrations } from "@/src/constants/illustrations";
import { useLocationContext } from "@/src/contexts/LocationContext";
import messaging, {
  AuthorizationStatus,
} from "@react-native-firebase/messaging";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

type Need = {
  location: boolean;
  notifications: boolean;
  /** The OS won't show its dialog again; only Settings can grant it. */
  blocked: boolean;
};

const needsAndroidNotificationPermission =
  Platform.OS === "android" && Number(Platform.Version) >= 33;

const hasNotificationPermission = async () => {
  if (Platform.OS === "web") return true;
  if (needsAndroidNotificationPermission) {
    return PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  if (Platform.OS === "ios") {
    const status = await messaging().hasPermission();
    return (
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL
    );
  }
  return true; // Android < 13 grants notifications at install
};

/** Returns false when the user said no or "never ask again". */
const requestNotificationPermission = async () => {
  if (Platform.OS === "web") return true;
  if (needsAndroidNotificationPermission) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }
  if (Platform.OS === "ios") {
    const status = await messaging().requestPermission();
    return (
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL
    );
  }
  return true;
};

const checkNeeds = async (): Promise<Need> => {
  const loc = await Location.getForegroundPermissionsAsync();
  const notificationsOk = await hasNotificationPermission().catch(() => true);
  return {
    location: loc.status !== "granted",
    notifications: !notificationsOk,
    blocked: loc.status !== "granted" && !loc.canAskAgain,
  };
};

/**
 * Shown once per app session after login when location or notification
 * access is missing. The OS dialogs only appear after the user taps
 * "Allow", so they know why they're being asked.
 */
export default function PermissionPrompt() {
  const { recheck } = useLocationContext();
  const [need, setNeed] = useState<Need | null>(null);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    checkNeeds()
      .then((next) => {
        if (cancelled) return;
        setNeed(next);
        setVisible(next.location || next.notifications);
      })
      .catch((err) => console.warn("[PermissionPrompt] check failed:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const close = () => setVisible(false);

  const allow = async () => {
    if (!need) return;
    setBusy(true);
    try {
      if (need.blocked) {
        // Denied for good earlier — the OS dialog can't be shown again.
        await Linking.openSettings();
        close();
        return;
      }
      if (need.location) {
        await Location.requestForegroundPermissionsAsync();
      }
      if (need.notifications) {
        await requestNotificationPermission();
      }
      // Starts the app-wide location watcher, which wakes up anything
      // waiting on GPS (home weather, device registration).
      await recheck();
    } catch (err) {
      console.warn("[PermissionPrompt] request failed:", err);
    } finally {
      setBusy(false);
      close();
    }
  };

  if (!need) return null;

  const items = [
    need.location && {
      key: "location",
      art: filterArt.location,
      tint: "#EAF5E4",
      title: "Location",
      body: "Local weather, rain alerts and advice for your area",
    },
    need.notifications && {
      key: "notifications",
      art: menuArt.notifications,
      tint: "#FFF8E1",
      title: "Notifications",
      body: "Spray reminders, expert advisories and order updates",
    },
  ].filter(Boolean) as {
    key: string;
    art: string;
    tint: string;
    title: string;
    body: string;
  }[];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={close}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <View
          style={{
            backgroundColor: cardTokens.surface,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            overflow: "hidden",
            paddingBottom: 28,
          }}
        >
          <IllustrationBackground
            xml={illustrations.farm}
            style={{ height: 150, justifyContent: "flex-end" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 14,
                marginBottom: -30,
              }}
            >
              {items.map((item) => (
                <View
                  key={item.key}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: cardTokens.surface,
                    borderWidth: 4,
                    borderColor: cardTokens.surface,
                  }}
                >
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: item.tint,
                    }}
                  >
                    <SvgXml xml={item.art} width={34} height={34} />
                  </View>
                </View>
              ))}
            </View>
          </IllustrationBackground>

          <View style={{ paddingHorizontal: 22, paddingTop: 44 }}>
            <Text
              style={[
                typography.Poppins_l_semibold,
                { color: cardTokens.inkPrimary, textAlign: "center" },
              ]}
            >
              Get the most from Ziraat
            </Text>
            <Text
              style={[
                typography.Poppins_s_regular,
                {
                  color: cardTokens.inkSecondary,
                  textAlign: "center",
                  marginTop: 6,
                },
              ]}
            >
              {need.blocked
                ? "Access was turned off earlier. Turn it on in Settings to get:"
                : "Allow access so we can send you:"}
            </Text>

            <View style={{ marginTop: 18, gap: 10 }}>
              {items.map((item) => (
                <View
                  key={item.key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: item.tint,
                    }}
                  >
                    <SvgXml xml={item.art} width={26} height={26} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text
                      style={[
                        typography.Poppins_s_semibold,
                        { color: cardTokens.inkPrimary },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        typography.Poppins_xs_regular,
                        { color: cardTokens.inkSecondary, marginTop: 1 },
                      ]}
                    >
                      {item.body}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Pressable
              onPress={allow}
              disabled={busy}
              accessibilityRole="button"
              style={({ pressed }) => ({
                marginTop: 22,
                paddingVertical: 15,
                borderRadius: 16,
                alignItems: "center",
                backgroundColor: colors.primary,
                opacity: pressed || busy ? 0.85 : 1,
              })}
            >
              {busy ? (
                <ActivityIndicator color={colors.light} />
              ) : (
                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    { color: colors.light },
                  ]}
                >
                  {need.blocked ? "Open Settings" : "Allow access"}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={close}
              disabled={busy}
              accessibilityRole="button"
              hitSlop={8}
              style={{ marginTop: 14, alignItems: "center" }}
            >
              <Text
                style={[
                  typography.Poppins_s_medium,
                  { color: cardTokens.inkMuted },
                ]}
              >
                Not now
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

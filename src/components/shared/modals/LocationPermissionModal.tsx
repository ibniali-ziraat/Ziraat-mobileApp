/**
 * LocationPermissionModal
 *
 * Pure UI gate — it does NOT manage location itself.
 * It receives `status` and `recheck` from useLocationWatcher and
 * renders the right screen based on that status.
 *
 * Lifecycle:
 *  "checking"  → invisible (hook is working)
 *  "granted"   → invisible (all good, app runs normally)
 *  "denied"    → bottom sheet, Phase 1 (ask permission)
 *  "disabled"  → bottom sheet, Phase 2 (device GPS off — tell user)
 *  "error"     → bottom sheet, Phase 3 (generic error)
 *
 * After user taps "Open Settings" and returns, the hook's AppState listener
 * automatically rechecks and calls recheck() — the modal hides itself.
 */

import { colors } from "@/src/constants/colors";
import { LocationStatus } from "@/src/hooks/useLocationWatcher";
import * as Location from "expo-location";
import {
  AlertTriangle,
  MapPin,
  Navigation,
  Shield,
  Wifi,
} from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface LocationPermissionModalProps {
  status: LocationStatus;
  recheck: () => Promise<void>;
}

export default function LocationPermissionModal({
  status,
  recheck,
}: LocationPermissionModalProps) {
  const visible =
    status === "denied" || status === "disabled" || status === "error";

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(600)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Block hardware back — no escape
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => sub.remove();
  }, [visible]);

  // Entrance & idle animations
  useEffect(() => {
    if (!visible) {
      // Reset for next show
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(600);
      return;
    }

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 340,
        useNativeDriver: true,
      }),
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        damping: 16,
        stiffness: 180,
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.11,
          duration: 920,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 920,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const ring = Animated.loop(
      Animated.sequence([
        Animated.timing(ringAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ringAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    ring.start();

    return () => {
      pulse.stop();
      ring.stop();
    };
  }, [visible]);

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 13,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -13,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 9,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -9,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 55,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePrimaryAction = async () => {
    if (status === "denied") {
      // First try requesting in-app
      const { status: perm } =
        await Location.requestForegroundPermissionsAsync();
      if (perm === "granted") {
        // Hook's AppState listener will pick this up; but also call recheck for immediacy
        await recheck();
      } else {
        // Already denied permanently → open Settings
        await Linking.openSettings();
        // AppState change on return will auto-recheck via the hook
      }
    } else {
      // disabled / error — open Settings
      await Linking.openSettings();
    }
  };

  const ringScale = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });
  const ringOpacity = ringAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.36, 0.1, 0],
  });

  // ── Derive UI content from status ──────────────────────────────────────────
  const isDenied = status === "denied";
  const isDisabled = status === "disabled";

  const accentColor = isDenied
    ? colors.primary
    : isDisabled
      ? colors.warning
      : colors.error;

  const badgeText = isDenied
    ? "Mandatory permission"
    : isDisabled
      ? "Device GPS is off"
      : "Location unavailable";

  const title = isDenied
    ? "Location Required"
    : isDisabled
      ? "Enable GPS"
      : "Location Error";

  const subtitle = isDenied
    ? "This app requires your location to show weather, mandi prices, and farm alerts for your area. You cannot proceed without enabling it."
    : isDisabled
      ? "Your device's location / GPS service is turned off. Please enable it in Settings to continue."
      : "We couldn't access your location. Please check your settings and try again.";

  const btnLabel = isDenied ? "Allow Location Access" : "Open Settings";

  const settingsSteps: string[] = isDenied
    ? Platform.OS === "ios"
      ? [
          "Open iPhone Settings",
          "Scroll to this app",
          "Tap Location → While Using App",
        ]
      : [
          "Open Settings → Apps",
          "Find and tap this app",
          "Tap Permissions → Location → Allow",
        ]
    : Platform.OS === "ios"
      ? [
          "Open iPhone Settings",
          "Tap Privacy & Security → Location Services",
          "Toggle Location Services ON",
        ]
      : ["Open Settings", "Tap Location", "Toggle Location ON"];

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => {
        /* intentionally blocked */
      }}
    >
      {/* Backdrop tap → shake */}
      <Pressable style={StyleSheet.absoluteFill} onPress={shake}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
        />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [
              { translateY: sheetTranslateY },
              { translateX: shakeAnim },
            ],
          },
        ]}
        onStartShouldSetResponder={() => true}
      >
        <View style={styles.handle} />

        {/* Status badge */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: accentColor + "18",
              borderColor: accentColor + "40",
            },
          ]}
        >
          <AlertTriangle size={11} color={accentColor} />
          <Text style={[styles.badgeText, { color: accentColor }]}>
            {badgeText}
          </Text>
        </View>

        {/* Animated icon */}
        <View style={styles.iconWrap}>
          <Animated.View
            style={[
              styles.ring,
              {
                backgroundColor: accentColor,
                transform: [{ scale: ringScale }],
                opacity: ringOpacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.iconCircle,
              { backgroundColor: accentColor, shadowColor: accentColor },
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            {isDisabled ? (
              <Wifi size={36} color="#fff" strokeWidth={1.8} />
            ) : (
              <MapPin size={36} color="#fff" strokeWidth={1.8} />
            )}
          </Animated.View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Feature highlights (denied only — first impression) */}
        {isDenied && (
          <View style={styles.features}>
            {[
              {
                icon: <Navigation size={15} color={colors.primary} />,
                label: "Hyper-local weather forecasts",
              },
              {
                icon: <Shield size={15} color={colors.primary} />,
                label: "Your data stays private & secure",
              },
              {
                icon: <MapPin size={15} color={colors.primary} />,
                label: "Nearest mandi prices & alerts",
              },
            ].map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <View
                  style={[
                    styles.featureIconWrap,
                    { backgroundColor: colors.primary + "18" },
                  ]}
                >
                  {f.icon}
                </View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Step-by-step Settings guide */}
        {!isDenied && (
          <View
            style={[
              styles.stepsBox,
              {
                borderColor: accentColor + "30",
                backgroundColor: accentColor + "08",
              },
            ]}
          >
            <Text style={styles.stepsHeading}>HOW TO FIX</Text>
            {settingsSteps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View
                  style={[styles.stepBubble, { backgroundColor: accentColor }]}
                >
                  <Text style={styles.stepNum}>{i + 1}</Text>
                </View>
                <Text style={styles.stepLabel}>{step}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Primary CTA */}
        <Pressable
          onPress={handlePrimaryAction}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: accentColor, shadowColor: accentColor },
            pressed && { opacity: 0.82 },
          ]}
        >
          <Navigation size={18} color="#fff" />
          <Text style={styles.btnText}>{btnLabel}</Text>
        </Pressable>

        <Text style={styles.lockNote}>
          🔒 Location access is mandatory — this screen cannot be skipped
        </Text>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.76)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 26,
    paddingBottom: 46,
    paddingTop: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 28,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E5E5",
    marginBottom: 18,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 22,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  iconWrap: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  ring: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  iconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 18,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13.5,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  features: {
    width: "100%",
    backgroundColor: "#F5FBF3",
    borderRadius: 16,
    padding: 14,
    gap: 11,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#DBF0D4",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  featureIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  featureLabel: {
    fontSize: 13.5,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  stepsBox: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 22,
    borderWidth: 1,
  },
  stepsHeading: {
    fontSize: 11,
    fontWeight: "800",
    color: "#AAAAAA",
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  stepBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
  stepLabel: {
    fontSize: 13.5,
    color: "#444",
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
  btn: {
    borderRadius: 16,
    paddingVertical: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.36,
    shadowRadius: 14,
    elevation: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.2,
  },
  lockNote: {
    marginTop: 14,
    fontSize: 12,
    color: "#C0C0C0",
    fontWeight: "500",
    textAlign: "center",
  },
});

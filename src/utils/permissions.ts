import messaging, {
  AuthorizationStatus,
} from "@react-native-firebase/messaging";
import * as Location from "expo-location";
import { Linking, PermissionsAndroid, Platform } from "react-native";

/**
 * OS permission helpers shared by the login-time request, the Home weather
 * card and the Notifications screen.
 */

const needsAndroidNotificationPermission =
  Platform.OS === "android" && Number(Platform.Version) >= 33;

const isAuthorized = (status: number) =>
  status === AuthorizationStatus.AUTHORIZED ||
  status === AuthorizationStatus.PROVISIONAL;

export const hasNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === "web") return true;
  if (needsAndroidNotificationPermission) {
    return PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  if (Platform.OS === "ios")
    return isAuthorized(await messaging().hasPermission());
  return true; // Android < 13 grants notifications at install
};

/**
 * Shows the OS notification dialog. Returns "blocked" when the OS refuses to
 * show it again (denied for good) — only Settings can turn it on then.
 */
export const requestNotificationPermission = async (): Promise<
  "granted" | "denied" | "blocked"
> => {
  if (Platform.OS === "web") return "granted";
  if (needsAndroidNotificationPermission) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) return "granted";
    return result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ? "blocked"
      : "denied";
  }
  if (Platform.OS === "ios") {
    const before = await messaging().hasPermission();
    // iOS asks only once; after a "Don't Allow" the dialog never reappears.
    if (before === AuthorizationStatus.DENIED) return "blocked";
    return isAuthorized(await messaging().requestPermission())
      ? "granted"
      : "denied";
  }
  return "granted";
};

/** Asks for notifications, or opens Settings when the OS won't ask again. */
export const enableNotifications = async (): Promise<boolean> => {
  const result = await requestNotificationPermission();
  if (result === "blocked") await Linking.openSettings();
  return result === "granted";
};

/**
 * Asks for location, or sends the user where they can turn it on: app
 * Settings when permission is denied for good, the device's location
 * settings when GPS itself is off.
 */
export const enableLocation = async (): Promise<boolean> => {
  const current = await Location.getForegroundPermissionsAsync();
  let status = current.status;

  if (status !== "granted") {
    if (!current.canAskAgain) {
      await Linking.openSettings();
      return false;
    }
    status = (await Location.requestForegroundPermissionsAsync()).status;
    if (status !== "granted") return false;
  }

  if (!(await Location.hasServicesEnabledAsync())) {
    if (Platform.OS === "android") {
      await Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
    } else {
      await Linking.openSettings();
    }
    return false;
  }
  return true;
};

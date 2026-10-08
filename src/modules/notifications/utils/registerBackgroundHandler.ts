import messaging from "@react-native-firebase/messaging";
import { saveRemoteMessageToStorage } from "./notificationStorage";

/**
 * Registers Firebase's headless background message handler.
 *
 * ⚠️  MUST be called at the very top of index.js — before any React or
 *     Expo Router code runs. Firebase requires this to be registered outside
 *     of the React tree so it works when the app is fully quit.
 */
export function registerBackgroundHandler() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // the OS shows the system notification itself; we only save it so it's in
    // the in-app list and badge count when the app is opened
    try {
      await saveRemoteMessageToStorage(remoteMessage);
    } catch (err) {
      console.warn("[registerBackgroundHandler] could not save message:", err);
    }
  });
}

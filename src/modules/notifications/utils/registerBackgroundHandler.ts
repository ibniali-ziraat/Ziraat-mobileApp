import messaging from "@react-native-firebase/messaging";

/**
 * Registers Firebase's headless background message handler.
 *
 * ⚠️  MUST be called at the very top of index.js — before any React or
 *     Expo Router code runs. Firebase requires this to be registered outside
 *     of the React tree so it works when the app is fully quit.
 */
export function registerBackgroundHandler() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("🔔 Background message received:", remoteMessage);
    // Safe to do lightweight work here (e.g. AsyncStorage writes, badge updates).
    // Do NOT update React state — the component tree is not mounted.
  });
}

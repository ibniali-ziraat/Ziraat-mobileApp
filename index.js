// Must run before any React/Expo Router code so the FCM background handler
// is registered even when the app is fully quit.
import { registerBackgroundHandler } from "./src/modules/notifications/utils/registerBackgroundHandler";

registerBackgroundHandler();

import "expo-router/entry";

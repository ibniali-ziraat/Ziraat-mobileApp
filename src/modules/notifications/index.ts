// ⚠️ Must be the very first thing — before Expo Router bootstraps React
import "expo-router/entry";
import { registerBackgroundHandler } from "./utils/registerBackgroundHandler";

registerBackgroundHandler();

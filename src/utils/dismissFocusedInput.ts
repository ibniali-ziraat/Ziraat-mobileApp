import { Keyboard, TextInput } from "react-native";

/**
 * Drops focus from whichever text input currently has it. Call before opening
 * a select / date picker so that, when it closes, the OS doesn't hand focus
 * (and the keyboard) back to the last text field the user typed in.
 */
export const dismissFocusedInput = () => {
  try {
    const state = TextInput.State as any;
    const focused = state.currentlyFocusedInput?.();
    // blurTextInput is the same call on iOS and Android
    if (focused) state.blurTextInput(focused);
  } catch {}
  Keyboard.dismiss();
};

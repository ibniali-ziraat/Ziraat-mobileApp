import { useState } from "react";
import {
  Pressable as RNPressable,
  type GestureResponderEvent,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type PressableStyle =
  | StyleProp<ViewStyle>
  | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);

export type PressableProps = Omit<RNPressableProps, "style"> & {
  style?: PressableStyle;
};

/**
 * Drop-in replacement for react-native's Pressable. Always import Pressable
 * from here, never from "react-native".
 *
 * NativeWind (react-native-css-interop) replaces every RN Pressable with an
 * interop wrapper that treats the `style` prop as an inline rule set. It only
 * understands objects and arrays: a *function* style is spread with
 * `{...style}`, which yields `{}` for a function, and that empty object is then
 * assigned over the real style. The whole style silently disappears — layout
 * included — so `flexDirection: "row"` rows collapse into columns and cards
 * lose their background, border and padding.
 *
 * See react-native-css-interop 0.2.3 `applyRules` /
 * `collectInlineRules` in dist/runtime/native/native-interop.js.
 *
 * We resolve the function ourselves and hand the interop a plain object, which
 * it handles correctly. Pressed state is tracked here instead of relying on
 * Pressable's own, so `({ pressed }) => ...` styles keep working as written.
 */
export function Pressable({
  style,
  onPressIn,
  onPressOut,
  disabled,
  ...rest
}: PressableProps) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = (event: GestureResponderEvent) => {
    setPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setPressed(false);
    onPressOut?.(event);
  };

  const resolved =
    typeof style === "function" ? style({ pressed: pressed && !disabled }) : style;

  return (
    <RNPressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={resolved}
    />
  );
}

export default Pressable;

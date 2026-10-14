import type { ReactNode } from "react";
import {
  Image,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  /** SVG markup from `@/src/constants/illustrations`. */
  xml: string;
  /** A real photo, when there is one — drawn instead of the illustration. */
  uri?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * ImageBackground for vector art: fills its box with the illustration and
 * lays children on top.
 */
export default function IllustrationBackground({
  xml,
  uri,
  style,
  children,
}: Props) {
  return (
    <View style={[{ overflow: "hidden" }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <SvgXml
          xml={xml}
          width="100%"
          height="100%"
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}

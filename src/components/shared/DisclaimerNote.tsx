import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { pageArt } from "@/src/constants/iconArt";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@/src/components/shared/Pressable";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/** Lines shown before the note is folded. */
const COLLAPSED_LINES = 2;

const styles = StyleSheet.create({
  body: {
    color: cardTokens.inkMuted,
    fontSize: 13,
    lineHeight: 21,
    textAlign: "center",
  },
});

const defaultDisclaimer =
  "ZIRAAT is a technology platform. Sale and supply of fertilizers and pesticides is carried out by licensed vendors in compliance with the Insecticides Act, 1968 and Fertilizer Control Order, 1985. Use pesticides strictly as per label instructions and expert advice.";

type DisclaimerNoteProps = {
  text?: string;
  /**
   * When false the full text is always shown with no truncation and no
   * toggle — use on screens where the disclaimer has to be read in full.
   */
  collapsible?: boolean;
};

/**
 * Quiet footer note rather than a boxed warning — the disclaimer is legal
 * boilerplate, so it sits at the bottom in muted ink.
 */
export default function DisclaimerNote({
  text,
  collapsible = true,
}: DisclaimerNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const [lineCount, setLineCount] = useState<number | null>(null);
  const body = text || defaultDisclaimer;

  // "Read more" on text that already fits does nothing when tapped. Measure
  // the untruncated copy first and only offer the toggle if there is more to
  // show.
  const overflows = (lineCount ?? 0) > COLLAPSED_LINES;
  const canToggle = collapsible && overflows;
  // Stay folded for the frame before the measurement lands, otherwise the note
  // renders full-height and then snaps shut.
  const showingAll = !collapsible
    ? true
    : lineCount === null
      ? false
      : !overflows || expanded;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((value) => !value);
  };

  return (
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <View
        style={{
          height: 1,
          alignSelf: "stretch",
          backgroundColor: chartTokens.grid,
          marginBottom: 16,
        }}
      />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <SvgXml xml={pageArt.privacy} width={16} height={16} />
        <Text
          style={[
            typography.Poppins_xs_medium,
            { color: cardTokens.inkMuted, fontSize: 13.5, marginLeft: 5 },
          ]}
        >
          Legal disclaimer
        </Text>
      </View>

      <Text
        numberOfLines={showingAll ? undefined : COLLAPSED_LINES}
        style={[typography.Poppins_xs_regular, styles.body]}
      >
        {body}
      </Text>

      {/* Off-screen copy at the same width, purely to count the real lines. */}
      {collapsible && lineCount === null ? (
        <Text
          pointerEvents="none"
          onTextLayout={(event) =>
            setLineCount(event.nativeEvent.lines.length)
          }
          style={[
            typography.Poppins_xs_regular,
            styles.body,
            { position: "absolute", left: 0, right: 0, opacity: 0 },
          ]}
        >
          {body}
        </Text>
      ) : null}

      {canToggle ? (
        <Pressable
          onPress={toggle}
          hitSlop={10}
          style={({ pressed }) => ({ marginTop: 8, opacity: pressed ? 0.6 : 1 })}
        >
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: chartTokens.current, fontSize: 13.5 },
            ]}
          >
            {expanded ? "Show less" : "Read more"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

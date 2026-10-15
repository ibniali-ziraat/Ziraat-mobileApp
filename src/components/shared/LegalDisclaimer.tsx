import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { pageArt } from "@/src/constants/iconArt";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type LegalDisclaimerProps = {
  text?: string;
};

const defaultDisclaimer =
  "ZIRAAT is a technology platform. Sale and supply of fertilizers and pesticides is carried out by licensed vendors in compliance with the Insecticides Act, 1968 and Fertilizer Control Order, 1985. Use pesticides strictly as per label instructions and expert advice.";

export default function LegalDisclaimer({ text }: LegalDisclaimerProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        // Quiet grey panel: legal boilerplate, not a warning.
        backgroundColor: cardTokens.mutedSurface,
        borderRadius: 14,
        // marginHorizontal: 16,
        marginBottom: 6,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Pressable
        activeOpacity={0.8}
        onPress={toggle}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 14,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SvgXml
            xml={pageArt.privacy}
            width={18}
            height={18}
            style={{ marginRight: 8 }}
          />

          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: cardTokens.inkSecondary,
            }}
          >
            Legal Disclaimer
          </Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.neutral}
        />
      </Pressable>

      {/* Divider */}
      {expanded && (
        <View
          style={{
            height: 1,
            backgroundColor: cardTokens.hairline,
            marginHorizontal: 14,
          }}
        />
      )}

      {/* Content */}
      {expanded && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          <Text
            style={{
              fontSize: 14.5,
              lineHeight: 24,
              color: colors.neutral,
            }}
          >
            {text || defaultDisclaimer}
          </Text>
        </View>
      )}
    </View>
  );
}

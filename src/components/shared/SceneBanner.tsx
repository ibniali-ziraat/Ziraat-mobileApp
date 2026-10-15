import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { typography } from "@/src/constants/fonts/typography";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type SceneBannerProps = {
  /** Scene from `@/src/constants/illustrations`. */
  xml: string;
  title: string;
  subtitle?: string;
  /** Full-colour icons shown as white badges above the title. */
  badges?: string[];
  /** Rendered at the right of the title row — a button, usually. */
  action?: ReactNode;
  minHeight?: number;
};

/**
 * Illustrated header card: scene behind, dark gradient along the foot, white
 * title on top. The gradient is what keeps the text legible on bright art.
 */
export default function SceneBanner({
  xml,
  title,
  subtitle,
  badges = [],
  action,
  minHeight = 140,
}: SceneBannerProps) {
  return (
    <IllustrationBackground xml={xml} style={{ minHeight, borderRadius: 22 }}>
      <LinearGradient
        colors={["rgba(12,42,6,0)", "rgba(12,42,6,0.38)", "rgba(12,42,6,0.9)"]}
        locations={[0, 0.42, 1]}
        style={{ flex: 1, minHeight, padding: 14, justifyContent: "flex-end" }}
      >
        {badges.length ? (
          <View style={{ flexDirection: "row", gap: 6, marginBottom: 8 }}>
            {badges.map((art, index) => (
              <View
                key={index}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.94)",
                }}
              >
                <SvgXml xml={art} width={21} height={21} />
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 1, paddingRight: action ? 10 : 0 }}>
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_m_semibold,
                { color: "#FFFFFF", fontSize: 18 },
              ]}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  {
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                    marginTop: 1,
                  },
                ]}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
          {action}
        </View>
      </LinearGradient>
    </IllustrationBackground>
  );
}

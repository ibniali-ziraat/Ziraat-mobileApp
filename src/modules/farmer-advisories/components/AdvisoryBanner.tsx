import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { typography } from "@/src/constants/fonts/typography";
import { getOrchardScene } from "@/src/constants/illustrations";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type AdvisoryBannerProps = {
  /** Picks the same valley scene the orchard shows everywhere else. */
  orchardProfileId?: number;
  title: string;
  subtitle?: string;
  /** Full-colour icons shown as white badges above the title. */
  badges: string[];
  badgeSize?: number;
};

export default function AdvisoryBanner({
  orchardProfileId,
  title,
  subtitle,
  badges,
  badgeSize = 34,
}: AdvisoryBannerProps) {
  return (
    <IllustrationBackground
      xml={getOrchardScene({ orchardProfileId })}
      style={{ minHeight: 132, borderRadius: 20, marginBottom: 14 }}
    >
      <LinearGradient
        colors={["rgba(12,42,6,0)", "rgba(12,42,6,0.4)", "rgba(12,42,6,0.9)"]}
        locations={[0, 0.4, 1]}
        style={{
          flex: 1,
          minHeight: 132,
          padding: 14,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 8 }}>
          {badges.map((art, index) => (
            <View
              key={index}
              style={{
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.94)",
              }}
            >
              <SvgXml
                xml={art}
                width={badgeSize * 0.66}
                height={badgeSize * 0.66}
              />
            </View>
          ))}
        </View>

        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_m_semibold,
            { color: "#FFFFFF", fontSize: 18 },
          ]}
        >
          {title}
        </Text>
        {!!subtitle && (
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_regular,
              { color: "rgba(255,255,255,0.82)", fontSize: 14, marginTop: 1 },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </LinearGradient>
    </IllustrationBackground>
  );
}

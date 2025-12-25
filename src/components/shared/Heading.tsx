// src/components/shared/Heading.tsx
import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import CsText from "./CsText";

interface HeadingProps {
  title: string;
  subtitle?: string;
  titleSize?: number; // optional, default 32
  subtitleSize?: number; // optional, default 16
}

export default function Heading({
  title,
  subtitle,
  titleSize = 26,
  subtitleSize = 15,
}: HeadingProps) {
  return (
    <View style={{
      marginBottom: 6,

    }}>
      <CsText
        style={{
          fontSize: titleSize,
          color: colors.primary,
          fontWeight: "semibold",


        }}
      >
        {title}
      </CsText>

      {subtitle ? (
        <CsText
          style={{
            fontSize: subtitleSize,
            color: colors.darkHover,
            marginTop: 7,


          }}
        >
          {subtitle}

        </CsText>

      ) : null}
      {/* Primary Divider */}
      <View
        style={{
          width: 63,
          height: 3,
          borderRadius: 2,
          backgroundColor: colors.primary,
          marginTop: 9,

        }}
      />
    </View>

  );
}

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
  titleSize = 28,
  subtitleSize = 14,
}: HeadingProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <CsText
        style={{
          fontSize: titleSize,
          color: colors.dark,
          fontWeight: "medium",
        }}
      >
        {title}
     </CsText>

      {subtitle ? (
        <CsText
          style={{
            fontSize: subtitleSize,
            color: colors.dark,
            marginTop: 4,
          }}
        >
          {subtitle}
       </CsText>
      ) : null}
    </View>
  );
}

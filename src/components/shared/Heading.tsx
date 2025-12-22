// src/components/shared/Heading.tsx
import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

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
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: titleSize,
          color: colors.dark,
          fontWeight: "semibold",
          alignContent:"center",
          textAlign:"center",
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            fontSize: subtitleSize,
            color: colors.darkHover,
            marginTop: 10,
             textAlign:"center",
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import CsText from "./CsText";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  image?: ImageSourcePropType;
}

export default function FormHeader({
  title,
  icon,
  description,
  image,
}: SectionHeaderProps) {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      {/* Optional Top Image/Illustration */}
      {image && (
        <View style={{ width: '100%', height: 170, marginBottom: 10 }}>
          <Image 
            source={image} 
            style={{ width: '100%', height: '100%' }} 
            resizeMode="cover" 
          />
        </View>
      )}

      {/* Container for Icon and Heading */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: description ? 6 : 0 }}>
        {/* Icon */}
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}

        {/* Heading */}
        <CsText style={[typography.Poppins_s_semibold]}>
          {title}
        </CsText>
      </View>

      {/* Description */}
      {description && (
        <CsText
          style={[
            typography.Poppins_xs_regular,
            {
              color: colors.neutral,
              lineHeight: 22,
              maxWidth: "95%",
            }
          ]}
        >
          {description}
        </CsText>
      )}
    </View>
  );
}
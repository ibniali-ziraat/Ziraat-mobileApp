// src/components/shared/Heading.tsx
import { colors } from "@/src/constants/colors";
<<<<<<< HEAD
import { View } from "react-native";
import CsText from "./CsText";
=======
import { Text, View } from "react-native";
>>>>>>> 5387be7ce70d78ec470e3176db8333f9750e8204

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
<<<<<<< HEAD
    <View style={{ marginBottom: 16 }}>
      <CsText
=======
    <View style={{ marginBottom: 6,
      
     }}>
      <Text
>>>>>>> 5387be7ce70d78ec470e3176db8333f9750e8204
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
<<<<<<< HEAD
       </CsText>
=======
          
        </Text>
        
>>>>>>> 5387be7ce70d78ec470e3176db8333f9750e8204
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

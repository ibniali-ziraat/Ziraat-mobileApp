import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function FormHeader({
 
  icon,
  description,
}: SectionHeaderProps) {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 24,
        
      }}
    >
      {/* Icon */}
      {icon && <View style={{ marginBottom: 8 }}>{icon}</View>}

     

      {/* Description */}
      {description && (
        <Text
          style={{
            fontSize: 13,
            color: colors.neutral,
            textAlign: "center",
            lineHeight: 18,
            maxWidth: "85%",
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}

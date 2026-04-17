import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ListHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  onSeeMore?: () => void;
  rightComponent?: React.ReactNode;
}

export default function ListHeader({
  title,
  icon,
  onSeeMore,
  rightComponent,
}: ListHeaderProps) {
  if (!title && !onSeeMore && !rightComponent) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon ? <View style={{ marginRight: 6 }}>{icon}</View> : null}

        {title ? (
          <Text style={[typography.Poppins_m_semibold, { fontSize: 16 }]}>
            {title}
          </Text>
        ) : null}
      </View>

      {rightComponent ? (
        rightComponent
      ) : onSeeMore ? (
        <Pressable
          onPress={onSeeMore}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: colors.secondary,
              marginRight: 2,
            }}
          >
            See all
          </Text>

          <ChevronRight size={16} color={colors.secondary} />
        </Pressable>
      ) : (
        <View style={{ padding: 6 }}>
          <ChevronRight size={18} color={colors.dark} />
        </View>
      )}
    </View>
  );
}

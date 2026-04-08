import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { LAYOUT } from "../constants/constants";

interface ListHeaderProps {
  title?: string;
  onSeeMore?: () => void;
}

export default function ListHeader({ title, onSeeMore }: ListHeaderProps) {
  if (!title && !onSeeMore) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: LAYOUT.PADDING,
        marginBottom: 10,
      }}
    >
      {title && (
        <Text style={[typography.Poppins_m_semibold, { fontSize: 16 }]}>
          {title}
        </Text>
      )}

      {onSeeMore && (
        <Pressable
          onPress={onSeeMore}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{ fontSize: 13, color: colors.secondary, marginRight: 2 }}
          >
            See all
          </Text>
          <ChevronRight size={16} color={colors.secondary} />
        </Pressable>
      )}
    </View>
  );
}

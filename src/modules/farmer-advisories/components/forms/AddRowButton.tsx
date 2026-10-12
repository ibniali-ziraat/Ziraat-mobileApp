import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Plus } from "lucide-react-native";
import { Text } from "react-native";

type AddRowButtonProps = {
  label: string;
  onPress: () => void;
};

export default function AddRowButton({ label, onPress }: AddRowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 11,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.primary + "66",
        backgroundColor: pressed ? chartTokens.tint : "transparent",
      })}
    >
      <Plus size={16} color={colors.primary} />
      <Text
        style={[
          typography.Poppins_s_medium,
          { color: colors.primary, marginLeft: 6 },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

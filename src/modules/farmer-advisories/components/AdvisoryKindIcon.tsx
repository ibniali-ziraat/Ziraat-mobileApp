import { colors } from "@/src/constants/colors";
import { chartTokens } from "@/src/constants/dashboardTheme";
import { Leaf } from "lucide-react-native";
import { View } from "react-native";
import { isSupportedKind, KIND_META } from "../constants/advisoryOptions";

type AdvisoryKindIconProps = {
  kind: string;
  size?: number;
};

export default function AdvisoryKindIcon({ kind, size = 44 }: AdvisoryKindIconProps) {
  const Icon = isSupportedKind(kind) ? KIND_META[kind].icon : Leaf;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        borderCurve: "continuous",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: chartTokens.tint,
      }}
    >
      <Icon size={size * 0.48} color={colors.primary} strokeWidth={1.9} />
    </View>
  );
}

import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";
import { STATUS_META, type AdvisoryStatusKey } from "../utils/advisoryStatus";

type AdvisoryStatusBadgeProps = {
  status: AdvisoryStatusKey;
};

export default function AdvisoryStatusBadge({ status }: AdvisoryStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: meta.background,
      }}
    >
      <Text
        style={[typography.Poppins_xs_semibold, { color: meta.color, fontSize: 13.5 }]}
      >
        {meta.label}
      </Text>
    </View>
  );
}

import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

export default function SectionTitle({ title, icon }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        paddingHorizontal: 4,
        marginTop: 16,
      }}
    >
      {/* ICON */}
      {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}

      {/* TITLE */}
      <CsText style={[typography.Poppins_m_semibold]} className="text-xl">
        {title}
      </CsText>
    </View>
  );
}

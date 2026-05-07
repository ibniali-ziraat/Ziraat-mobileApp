import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

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
      {icon ? <Text style={{ marginRight: 8 }}>{icon}</Text> : null}
      <Text style={[typography.Poppins_m_semibold]} className="text-xl">
        {title}
      </Text>
    </View>
  );
}

import React from "react";
import { Text, View } from "react-native";

type Props = {
  icon: React.ReactNode;
  label: string;
  color: string;
};

export default function TabIcon({ icon, label, color }: Props) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {icon}
      <Text style={{ color, fontSize: 12, marginTop: 4 }}>{label}</Text>
    </View>
  );
}

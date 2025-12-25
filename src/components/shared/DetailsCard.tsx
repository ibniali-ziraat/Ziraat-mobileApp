import { View } from "react-native";
import CsText from "./CsText";

export default function DetailCard({ title, value }) {
  return (
    <View className="bg-white p-3 rounded-lg">
      <CsText className="text-sm text-gray-500">{title}</CsText>
      <CsText className="text-base font-semibold text-gray-800">
        {value || "N/A"}
     </CsText>
    </View>
  );
}

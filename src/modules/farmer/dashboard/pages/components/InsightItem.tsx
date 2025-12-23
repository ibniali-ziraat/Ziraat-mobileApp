import CsText from "@/src/components/shared/CsText";
import { View } from "react-native";

type InsightItemProps = {
  item: {
    id: string | number;
    type: string;
    status: "Improved" | "Positive" | "Negative";
  };
};

export default function InsightItem({ item }: InsightItemProps) {
  return (
    <View className="flex-row items-center justify-between mb-2">
      {/* ID */}
      <CsText className="font-bold text-[14px] text-black w-[25%]">
        {item.id}
     </CsText>

      {/* TYPE */}
      <CsText className="text-dark w-[50%] text-center">
        {item.type}
     </CsText>

      {/* STATUS */}
      <CsText
        className={`w-[25%] text-right font-medium ${
          item.status === "Improved"
            ? "text-primary"
            : item.status === "Positive"
            ? "text-secondary"
            : "text-error"
        }`}
      >
        {item.status}
     </CsText>
    </View>
  );
}

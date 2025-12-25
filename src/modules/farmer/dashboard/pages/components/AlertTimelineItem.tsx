import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { View } from "react-native";

export default function AlertTimelineItem({
  icon,
  message,
  time,
  delay = 0,
}: any) {
  return (
    <View className="w-[48%] h-60 mb-2">
      <ZiraatCard
        width="100%"
        paddingHorizontal={2}
        paddingVertical={2}
      >
        {/* Make container take full height and space items evenly */}
        <View className="h-full items-center justify-between">
          {/* ICON */}
          <View>{icon}</View>

          {/* MESSAGE */}
          <CsText className="text-[16px] font-semibold text-dark text-center">
            {message}
         </CsText>

          {/* TIME */}
          <CsText className="text-sm text-dark text-center">
            {time}
         </CsText>
        </View>
      </ZiraatCard>
    </View>
  );
}

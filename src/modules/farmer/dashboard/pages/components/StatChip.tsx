import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

export default function StatChip({
  Icon,
  title,
  value,
 
}: any) {
  return (
    <ZiraatCard
      width="49%"
      height={160}
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={1}
    >
      <View className="flex-1 items-center justify-center ">
        {/* ICON */}
        {Icon && (
          <Icon
            size={38}
            color={colors.secondary}
            style={{ marginBottom: 9 }}
            strokeWidth={1.3}
          />
        )}

        {/* TITLE */}
        <Text
          className="text-[14px]  text-center"
          style={{ color: colors.dark }}
        >
          {title}
        </Text>

        {/* VALUE */}
        <Text
          className={"text-[18px] font-extrabold text-center mt-2"}
        >
          {value}
        </Text>
      </View>
    </ZiraatCard>
  );
}

import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

export default function StatChip({
  Icon,
  title,
  value,
  small = false,
}: any) {
  return (
    <ZiraatCard
      width="49%"
      height={90}
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={1}
    >
      <View className="flex-1 items-center justify-center">
        {/* ICON */}
        {Icon && (
          <Icon
            size={30}
            color={colors.secondary}
            style={{ marginBottom: 4 }}
          />
        )}

        {/* TITLE */}
        <Text
          className="text-[16px] font-bold text-center"
          style={{ color: colors.dark }}
        >
          {title}
        </Text>

        {/* VALUE */}
        <Text
          className={`${
            small ? "text-[10px]" : "text-[14px]"
          } font-medium text-center mt-1`}
          style={{ color: colors.dark }}
        >
          {value}
        </Text>
      </View>
    </ZiraatCard>
  );
}

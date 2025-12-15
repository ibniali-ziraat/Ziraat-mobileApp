import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";

export default function StatChip({ Icon, title, value, small }: any) {
  return (
    <View
      className="
        w-[47.5%] mb-3 rounded-2xl 
        px-[14px] py-[12px]
        bg-white border border-dark
      "
    //   style={{
    //     shadowColor: colors.secondary,
    //     shadowOpacity: 0.04,
    //     shadowRadius: 6,
    //     elevation: 2,
    //   }}
    >
      <Text
        className="text-[14px] font-bold"
        style={{ color: colors.dark }}
      >
        {title}
      </Text>

      <View className="flex-row items-center mt-[6px]">
        {Icon ? (
          <Icon
            size={22}
            color={colors.secondary}
            style={{ marginRight: 8 }}
          />
        ) : null}

        <Text
          className={`${small ? "text-[10px]" : "text-[14px]"} font-medium`}
          style={{ color: colors.dark }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

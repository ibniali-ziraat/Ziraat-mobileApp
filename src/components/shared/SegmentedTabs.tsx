import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Pressable, Text, View } from "react-native";

export type SegmentedTabOption = {
  key: string;
  label: string;
};

type SegmentedTabsProps = {
  options: SegmentedTabOption[];
  value: string;
  onChange: (key: string) => void;
};

export default function SegmentedTabs({
  options,
  value,
  onChange,
}: SegmentedTabsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.primary + "0D",
        borderRadius: 999,
        padding: 4,
      }}
    >
      {options.map((option) => {
        const active = option.key === value;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            style={{
              flex: 1,
              paddingVertical: 9,
              alignItems: "center",
              backgroundColor: active ? colors.primary : "transparent",
              borderRadius: 999,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_medium,
                { color: active ? colors.light : colors.primary },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

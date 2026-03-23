import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

const Badge = ({ count }: { count: number }) =>
  count > 0 ? (
    <View className="absolute -top-1 -right-1 bg-primary h-5 w-5 rounded-full items-center justify-center">
      <Text style={[typography.Poppins_xs_medium, { color: colors.light }]}>
        {count}
      </Text>
    </View>
  ) : null;

export default Badge;

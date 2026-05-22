import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { useNotifications } from "@/src/modules/notifications/hooks/useNotifications";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const HomeContent = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);
  const { count } = useNotifications();
  // const count = 100;

  const title = data?.fullName ?? "Ziraat";

  return (
    <View
      className="w-full flex-row items-center justify-between pt-4"
      style={{ borderBottomColor: colors.neutral }}
    >
      <View
        style={{
          flex: 1,
          marginRight: 10,
          paddingRight: 5,
        }}
      >
        <Text className="text-md" style={typography.Poppins_m_semibold}>
          Welcome
        </Text>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            {
              color: colors.dark,
              lineHeight: 20,
            },
            typography.Poppins_m_regular,
          ]}
        >
          {title.toUpperCase()}
        </Text>
      </View>
      <View className="flex-row items-center">
        {/* <Pressable
          className="p-2 mr-3 rounded-full border"
          style={({ pressed }) => ({
            borderColor: colors.neutral,
            opacity: pressed ? 0.6 : 1,
          })}
          onPress={() => router.push({ pathname: ROUTES.DASHBOARD.MAIN })}
        >
          <BarChart2 size={20} color={colors.secondary} />
        </Pressable> */}

        <Pressable
          className="p-2 mr-3 rounded-full border"
          style={({ pressed }) => ({
            borderColor: colors.neutral,
            opacity: pressed ? 0.6 : 1,
          })}
          onPress={() => router.push(ROUTES.NOTIFICATIONS)}
        >
          <View>
            <Bell size={24} color={colors.secondary} />

            {count > 0 && (
              <View
                className="absolute -top-3 -right-4 min-w-[18px] h-[18px] px-1 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.error }}
              >
                <Text className="text-white text-[12px]">
                  {count > 99 ? "99" : count}
                </Text>
              </View>
            )}
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push(ROUTES.ACCOUNT.PROFILE)}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center bg-secondary">
            <Text className="text-white font-bold uppercase text-lg">
              {data?.fullName ? data.fullName.charAt(0) : "U"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeContent;

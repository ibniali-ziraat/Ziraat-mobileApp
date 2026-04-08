import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNotifications } from "@/src/contexts/NotificationContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { router } from "expo-router";
import { BarChart2, Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const HomeContent = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);
  const { notifications } = useNotifications();

  const title = data?.fullName ?? "Ziraat";
  const count = notifications.length;
  const label = count > 99 ? "99+" : String(count);

  return (
    <View
      className="w-full flex-row items-center justify-between pt-4"
      style={{ borderBottomColor: colors.neutral }}
    >
      <View>
        <Text className="text-md" style={[typography.Poppins_m_semibold]}>
          Welcome
        </Text>
        <Text style={[{ color: colors.dark }, typography.Poppins_m_regular]}>
          {title.toUpperCase()}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Pressable
          className="p-2 mr-3 rounded-full border"
          style={({ pressed }) => ({
            borderColor: colors.neutral,
            opacity: pressed ? 0.6 : 1,
          })}
          onPress={() => router.push({ pathname: ROUTES.DASHBOARD.MAIN })}
        >
          <BarChart2 size={20} color={colors.secondary} />
        </Pressable>


        <Pressable
          className="p-2 mr-3 rounded-full border"
          style={({ pressed }) => ({
            borderColor: colors.neutral,
            opacity: pressed ? 0.6 : 1,
          })}
          onPress={() => router.push(ROUTES.NOTIFICATIONS)}
        >
          <Bell size={24} color={colors.secondary} />

          {count > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: colors.error,
                borderRadius: 999,
                minWidth: 16,
                height: 16,
                paddingHorizontal: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.light,
                  fontSize: 9,
                  fontWeight: "700",
                  lineHeight: 12,
                }}
              >
                {label}
              </Text>
            </View>
          )}
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
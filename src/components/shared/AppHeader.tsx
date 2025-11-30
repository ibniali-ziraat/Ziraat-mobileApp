import { colors } from "@/src/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function AppHeader({ username = "User" }) {
  const navigation = useNavigation();

  return (
    <View className="w-full bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      {/* LEFT: Menu + Greeting */}
      <View className="flex-row items-center">
        {/* <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="p-2 mr-3"
        >
          <Menu size={26} color={"#c7611f"} />
        </TouchableOpacity> */}

        <View>
          <Text className="text-xs text-gray-500">Welcome</Text>
          <Text className="text-lg font-semibold text-black">{username}</Text>
        </View>
      </View>

      {/* RIGHT: Become Supplier + Notifications + Avatar */}
      <View className="flex-row items-center">
        {/* Become a Supplier */}
        <TouchableOpacity
          onPress={() => router.push("/auth/vendor")}
          className="mr-4"
        >
          <Text className="text-sm font-medium text-primary">
            Become a Supplier
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="p-2 mr-3"
        >
          <Bell size={24} color={colors.secondary} />
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          onPress={() => router.push("/user-profile")}
          className="p-1"
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=2" }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

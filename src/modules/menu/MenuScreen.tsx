import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { roleMenuGroups } from "@/src/navigation/menuGroups"; // <-- use roleMenuGroups
import { router } from "expo-router";
import { Repeat } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MenuScreen() {
  const { roleMode, updateRoleMode } = useGlobalData();

  const toggleRole = () => {
    const newRole = roleMode === "farmer" ? "supplier" : "farmer";
    updateRoleMode(newRole);
  };

  // Show menu based on role only
  const menuGroupsToShow =
    roleMode === "farmer" ? roleMenuGroups.farmer : roleMenuGroups.supplier;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {menuGroupsToShow.map((group) => (
          <View key={group.title} className="">
            {group.routes.map((route) => (
              <MenuItem
                key={route.screen}
                label={route.label}
                onPress={() => router.push(`/${route.screen}`)}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={toggleRole}
        className="absolute bottom-6 right-6 bg-dark w-10 h-10 rounded-full flex items-center justify-center"
      >
        <Repeat size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function MenuItem({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 border-b border-gray-200"
    >
      <Text className="text-base text-gray-900">{label}</Text>
    </TouchableOpacity>
  );
}

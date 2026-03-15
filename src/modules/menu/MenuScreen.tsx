import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import MenuItem from "@/src/components/shared/MenuItem";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useAuth } from "@/src/contexts/AuthContext";
import { MenuLinks } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { View } from "react-native";

export default function MenuScreen() {
  const { roleMode, setRoleMode } = useAuth();

  const toggleRole = () => {
    const newRole = roleMode === "farmer" ? "supplier" : "farmer";
    setRoleMode(newRole);
  };

  return (
    <ScreenLayout>
      <AnimatedTabContent>
        <View className="flex-1 bg-light">
          <ScreenContent>
            {MenuLinks.farmer.map((group) => (
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
          </ScreenContent>

          {/* <Pressable
            onPress={toggleRole}
            className="absolute bottom-6 right-6 bg-dark rounded-full flex-row items-center px-4 py-2"
          >
            <Repeat size={20} color={colors.light} />
            <CsText className="text-light font-medium ml-2">
              {roleMode === "farmer"
                ? "Switch to Supplier"
                : "Switch to Farmer"}
            </CsText>
          </Pressable> */}
        </View>
      </AnimatedTabContent>
    </ScreenLayout>
  );
}
